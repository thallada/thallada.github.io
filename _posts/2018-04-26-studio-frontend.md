---
title: "Studio-Frontend: Developing Frontend Separate from edX Platform"
layout: post
---

*This is a blog post that I originally wrote for the [edX engineering 
blog](https://engineering.edx.org/).*

At the core of edX is the [edx-platform](https://github.com/edx/edx-platform), a
monolithic Django code-base 2.7 times the size of Django itself.
<!--excerpt-->

```
edx-platform (master)> tokei
-------------------------------------------------------------------------------
 Language            Files        Lines         Code     Comments       Blanks
-------------------------------------------------------------------------------
 ActionScript            1          118           74           23           21
 CoffeeScript           25         2296         1492          545          259
 CSS                    55        17106        14636         1104         1366
 HTML                  667        72608        36892        30307         5409
 JavaScript           1471       458791       349670        54805        54316
 JSON                   91        14421        14421            0            0
 JSX                    28         2104         1792           45          267
 LESS                    1          949          606          232          111
 Makefile                1           34           21            8            5
 Markdown               24          331          331            0            0
 Mustache                1            1            1            0            0
 Python               3246       553766       438165        29089        86512
 ReStructuredText       48         4258         4258            0            0
 Sass                  423        75509        55536         4548        15425
 Shell                  13          830          453          251          126
 SQL                     4         6158         4971         1171           16
 Plain Text            151         2982         2982            0            0
 TypeScript             20        88506        76800        11381          325
 XML                   364         5283         4757          231          295
 YAML                   36         1643         1370          122          151
-------------------------------------------------------------------------------
 Total                6670      1307694      1009228       133862       164604
-------------------------------------------------------------------------------
```

35% of the edx-platform is JavaScript. While it has served edX well since its
inception in 2012, reaching over 11 million learners in thousands of courses on
[edX.org](https://www.edx.org/) and many more millions on all of the [Open edX
instances across the
world](https://openedx.atlassian.net/wiki/spaces/COMM/pages/162245773/Sites+powered+by+Open+edX),
it is starting to show its age. Most of it comes in the form of [Backbone.js
apps](http://backbonejs.org/) loaded by [RequireJS](http://requirejs.org/) in
Django [Mako templates](http://www.makotemplates.org/), with
[jQuery](https://jquery.com/) peppered throughout (and — yes — some 2296 lines
of [CoffeeScript](http://coffeescript.org/)).

Many valiant efforts are underway to modernize the frontend of edx-platform
including replacing RequireJS with Webpack, Backbone.js with
[React](https://reactjs.org/), and ES5 JavaScript and CoffeeScript with ES6
JavaScript. Many of these efforts [were covered in detail at the last Open edX
conference](https://www.youtube.com/watch?v=xicBnbDX4AY) and in [Open edX
Proposal 11: Front End Technology
Standards](https://open-edx-proposals.readthedocs.io/en/latest/oep-0011-bp-FED-technology.html).
However, the size and complexity of the edx-platform means that these kind of
efforts are hard to prioritize, and, in the meantime, frontend developers are
forced to [wait over 10
minutes](https://openedx.atlassian.net/wiki/spaces/FEDX/pages/264700138/Asset+Compilation+Audit+2017-11-01)
for our home-grown asset pipeline to build before they can view changes.

There have also been efforts to incrementally modularize and extract parts of
the edx-platform into separate python packages that could be installed as
[Django apps](https://docs.djangoproject.com/en/2.0/ref/applications/), or even
as separately deployed
[microservices](https://en.wikipedia.org/wiki/Microservices). This allows
developers to work independently from the rest of the organization inside of a
repository that they own, manage, and is small enough that they could feasibly
understand it entirely.

When my team was tasked with improving the user experience of pages in
[Studio](https://studio.edx.org/), the tool that course authors use to create
course content, we opted to take a similar architectural approach with the
frontend and create a new repository where we could develop new pages in
isolation and then integrate them back into the edx-platform as a plugin. We
named this new independent repository
[studio-frontend](https://github.com/edx/studio-frontend). With this approach,
our team owns the entire studio-frontend code-base and can make the best
architectural changes required for its features without having to consult with
and contend with all of the other teams at edX that contribute to the
edx-platform. Developers of studio-frontend can also avoid the platform’s slow
asset pipeline by doing all development within the studio-frontend repository
and then later integrating the changes into platform.

## React and Paragon

When edX recently started to conform our platform to the [Web Content
Accessibility Guidelines 2.0 AA (WCAG 2.0
AA)](https://www.w3.org/WAI/intro/wcag), we faced many challenges in
retrofitting our existing frontend code to be accessible.  Rebuilding Studio
pages from scratch in studio-frontend allows us to not only follow the latest
industry standards for building robust and performant frontend applications, but
to also build with accessibility in mind from the beginning.

The Javascript community has made great strides recently to [address
accessibility issues in modern web
apps](https://reactjs.org/docs/accessibility.html). However, we had trouble
finding an open-source React component library that fully conformed to WCAG 2.0
AA and met all of edX’s needs, so we decided to build our own:
[Paragon](https://github.com/edx/paragon).

Paragon is a library of building-block components like buttons, inputs, icons,
and tables which were built from scratch in React to be accessible. The
components are styled using the [Open edX theme of Bootstrap
v4](https://github.com/edx/edx-bootstrap) (edX’s decision to adopt Bootstrap is
covered in
[OEP-16](https://open-edx-proposals.readthedocs.io/en/latest/oep-0016-bp-adopt-bootstrap.html)).
Users of Paragon may also choose to use the
[themeable](https://github.com/edx/paragon#export-targets) unstyled target and
provide their own Bootstrap theme.


![Paragon's modal component displayed in
Storybook](/img/blog/paragon-modal-storybook.jpg)

Studio-frontend composes together Paragon components into higher-level
components like [an accessibility
form](https://github.com/edx/studio-frontend/blob/master/src/accessibilityIndex.jsx)
or [a table for course assets with searching, filtering, sorting, pagination,
and upload](https://github.com/edx/studio-frontend/blob/master/src/index.jsx).
While we developed these components in studio-frontend, we were able to improve
the base Paragon components. Other teams at edX using the same components were
able to receive the same improvements with a single package update.

![Screenshot of the studio-frontend assets table inside of
Studio](/img/blog/studio-frontend-assets-table.jpg)

## Integration with Studio

We were able to follow the typical best practices for developing a React/Redux
application inside studio-frontend, but at the end of the day, we still had to
somehow get our components inside of existing Studio pages and this is where
most of the challenges arose.

## Webpack

The aforementioned move from RequireJS to Webpack in the edx-platform made it
possible for us to build our studio-frontend components from source with Webpack
within edx-platform. However, this approach tied us to the edx-platform’s slow
asset pipeline. If we wanted rapid development, we had to duplicate the
necessary Webpack config between both studio-frontend and edx-platform.

Instead, studio-frontend handles building the development and production Webpack
builds itself. In development mode, the incremental rebuild that happens
automatically when a file is changed takes under a second. The production
JavaScript and CSS bundles, which take about 25 seconds to build, are published
with every new release to
[NPM](https://www.npmjs.com/package/@edx%2Fstudio-frontend). The edx-platform
`npm install`s studio-frontend and then copies the built production files from
`node_modules` into its Django static files directory where the rest of the
asset pipeline will pick it up.

To actually use the built JavaScript and CSS, edx-platform still needs to
include it in its Mako templates. We made a [Mako template
tag](https://github.com/edx/edx-platform/blob/master/common/djangoapps/pipeline_mako/templates/static_content.html#L93-L122)
that takes a Webpack entry point name in studio-frontend and generates script
tags that include the necessary files from the studio-frontend package. It also
dumps all of the initial context that studio-frontend needs from the
edx-platform Django app into [a JSON
object](https://github.com/edx/edx-platform/blob/master/cms/templates/asset_index.html#L36-L56)
in a script tag on the page that studio-frontend components can access via a
shared id. This is how studio-frontend components get initial data from Studio,
like which course it’s embedded in.

For performance, modules that are shared across all studio-frontend components
are extracted into `common.min.js` and `common.min.css` files that are included
on every Studio template that has a studio-frontend component. User's browsers
should cache these files so that they do not have to re-download libraries like
React and Redux every time they visit a new page that contains a studio-frontend
component.

## CSS Isolation

Since the move to Bootstrap had not yet reached the Studio part of the
edx-platform, most of the styling clashed with the Bootstrap CSS that
studio-frontend components introduced. And, the Bootstrap styles were also
leaking outside of the studio-frontend embedded component `div` and affecting
the rest of the Studio page around it.

![Diagram of a studio-frontend component embedded inside of
Studio](/img/blog/studio-frontend-style-isolation.jpg)

We were able to prevent styles leaking outside of the studio-frontend component
by scoping all CSS to only the `div` that wraps the component. Thanks to the
Webpack [postcss-loader](https://github.com/postcss/postcss-loader) and the
[postcss-prepend-selector](https://github.com/ledniy/postcss-prepend-selector)
we were able to automatically scope all of our CSS selectors to that `div` in
our build process.

Preventing the Studio styles from affecting our studio-frontend component was a
much harder problem because it means avoiding the inherently cascading nature of
CSS. A common solution to this issue is to place the 3rd-party component inside
of an
[`iframe`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
element, which essentially creates a completely separate sub-page where both CSS
and JavaScript are isolated from the containing page. Because `iframe`s
introduce many other performance and styling issues, we wanted to find a
different solution to isolating CSS.

The CSS style [`all:
initial`](https://developer.mozilla.org/en-US/docs/Web/CSS/all) allows
resetting all properties on an element to their initial values as defined in the
CSS spec. Placing this style under a wildcard selector in studio-frontend
allowed us to reset all inherited props from the legacy Studio styles without
having to enumerate them all by hand.

```css
* {
  all: initial;
}
```

While this CSS property doesn’t have broad browser support yet, we were able to
polyfill it thanks to postcss with the
[postcss-initial](https://github.com/maximkoretskiy/postcss-initial) plugin.

However, this resets the styles to *nothing*. For example, all `div`s are
displayed inline. To return the styles back to to some sane browser default we
had to re-apply a browser default stylesheet. You can read more about this
technique at
[default-stylesheet](https://github.com/thallada/default-stylesheet).

From there, Bootstrap’s
[reboot](https://getbootstrap.com/docs/4.0/content/reboot/) normalizes the
browser-specific styling to a common baseline and then applies the Bootstrap
styles conflict-free from the surrounding CSS cascade.

There's a candidate recommendation in CSS for a [`contains`
property](https://www.w3.org/TR/css-contain-1/), which will "allow strong,
predictable isolation of a subtree from the rest of the page". I hope that it
will provide a much more elegant solution to this problem once browsers support
it.

## Internationalization

Another major challenge with separating out the frontend from edx-platform was
that most of our internationalization tooling was instrumented inside the
edx-platform. So, in order to display text in studio-frontend components in the
correct language we either had to pass already-translated strings from the
edx-platform into studio-frontend, or set-up translations inside
studio-frontend.

We opted for the latter because it kept the content close to the code that used
it. Every display string in a component is stored in a
[displayMessages.jsx](https://github.com/edx/studio-frontend/blob/master/src/components/AssetsTable/displayMessages.jsx)
file and then imported and referenced by an id within the component. A periodic
job extracts these strings from the project, pushes them up to our translations
service [Transifex](https://www.transifex.com/), and pulls any new translations
to store them in our NPM package.

Because Transifex’s `KEYVALUEJSON` file format does not allow for including
comments in the strings for translation, [Eric](https://github.com/efischer19)
created a library called [reactifex](https://github.com/efischer19/reactifex)
that will send the comments in separate API calls.

Studio includes the user’s language in the context that it sends a
studio-frontend component for initialization. Using this, the component can
display the message for that language if it exists. If it does not, then it will
display the original message in English and [wrap it in a `span` with `lang="en"`
as an
attribute](https://github.com/edx/studio-frontend/blob/master/src/utils/i18n/formattedMessageWrapper.jsx)
so that screen-readers know to read it in English even if their default is some
other language.

Read more about studio-frontend’s internationalization process in [the
documentation that Eric
wrote](https://github.com/edx/studio-frontend/blob/master/src/data/i18n/README.md).

## Developing with Docker

To normalize the development environment across the whole studio-frontend team,
development is done in a Docker container. This is a minimal Ubuntu 16.04
container with specific version of Node 8 installed and its only purpose is to
run Webpack. This follows the pattern established in [OEP-5: Pre-built
Development
Environments](https://open-edx-proposals.readthedocs.io/en/latest/oep-0005-arch-containerize-devstack.html)
for running a single Docker container per process that developers can easily
start without installing dependencies.

Similar to edX’s [devstack](https://github.com/edx/devstack) there is a Makefile
with commands to start and stop the docker container. The docker container then
immediately runs [`npm run
start`](https://github.com/edx/studio-frontend/blob/master/package.json#L12),
which runs Webpack with the
[webpack-dev-server](https://github.com/webpack/webpack-dev-server). The
webpack-dev-server is a node server that serves assets built by Webpack.
[Studio-frontend's Webpack
config](https://github.com/edx/studio-frontend/blob/master/config/webpack.dev.config.js#L94)
makes this server available to the developer's host machine
at `http://localhost:18011`.

With [hot-reload](https://webpack.js.org/concepts/hot-module-replacement/)
enabled, developers can now visit that URL in their browser, edit source files
in studio-frontend, and then see changes reflected instantly in their browser
once Webpack finishes its incremental rebuild.

However, many studio-frontend components need to be able to talk to the
edx-platform Studio backend Django server. Using [docker’s network connect
feature](https://docs.docker.com/compose/networking/#use-a-pre-existing-network)
the studio-frontend container can join the developer’s existing docker devstack
network so that the studio-frontend container can make requests to the docker
devstack Studio container at `http://edx.devstack.studio:18010/` and Studio can
access studio-frontend at `http://dahlia.studio-fronend:18011/`.

The webpack-dev-server can now [proxy all
requests](https://github.com/edx/studio-frontend/blob/master/config/webpack.dev.config.js#L101)
to Studio API endpoints (like `http://localhost:18011/assets`)
to `http://edx.devstack.studio:18010/`.

## Developing within Docker Devstack Studio

Since studio-frontend components will be embedded inside of an existing Studio
page shell, it’s often useful to develop on studio-frontend containers inside of
this set-up. [This can be
done](https://github.com/edx/studio-frontend#development-inside-devstack-studio)
by setting a variable in the devstack's `cms/envs/private.py`:

```python
STUDIO_FRONTEND_CONTAINER_URL = 'http://localhost:18011'
```

This setting is checked in the Studio Mako templates wherever studio-frontend
components are embedded. If it is set to a value other than `None`, then the
templates will request assets from that URL instead of the Studio's own static
assets directory. When a developer loads a Studio page with an embedded
studio-frontend component, their studio-frontend webpack-dev-server will be
requested at that URL. Similarly to developing on studio-frontend in isolation,
edits to source files will trigger a Webpack compilation and the Studio page
will be hot-reloaded or reloaded to reflect the changes automatically.

Since the studio-frontend JS loaded on `localhost:18010` is now requesting the
webpack-dev-server on `localhost:18011`,
an [`Access-Control-Allow-Origin` header](https://github.com/edx/studio-frontend/blob/master/config/webpack.dev.config.js#L98)
has to be configured on the webpack-dev-server to get around CORS violations.

![Diagram of studio-frontend's docker container communicating to Studio inside
of the devstack_default docker 
network](/img/blog/studio-frontend-docker-devstack.jpg)

## Deploying to Production

[Each release of
studio-frontend](https://github.com/edx/studio-frontend#releases) will upload
the `/dist` files built by Webpack in production mode to
[NPM](https://www.npmjs.com/package/@edx/studio-frontend). edx-platform
requires a particular version of studio-frontend in its
[`package.json`](https://github.com/edx/edx-platform/blob/master/package.json#L7).
When a new release of edx-platform is made, `paver update_assets` will run
which will copy all of the files in the
`node_modules/@edx/studio-frontend/dist/` to the Studio static folder.
Because `STUDIO_FRONTEND_CONTAINER_URL` will be `None` in production, it will be
ignored, and Studio pages will request studio-frontend assets from that static
folder.

## Future

Instead of “bringing the new into the old”, we’d eventually like to move to a
model where we “work in the new and bring in the old if necessary”. We could
host studio-frontend statically on a completely separate server which talks to
Studio via a REST (or [GraphQL](https://graphql.org/)) API. This approach would
eliminate the complexity around CSS isolation and bring big performance wins for
our users, but it would require us to rewrite more of Studio.
