thallada.github.io
==================

This is the latest version of my personal website. It is a static website built
with [Jekyll](http://jekyllrb.com/).

See it at [http://www.hallada.net/](http://www.hallada.net/).

## Magic

Most of the development work of this website went into creating what I like to
call "magic", or the dynamic background to my homepage. A few seconds after
loading the page, a branching web of colored tendrils will grow in a random
position on the page, followed soon after by other "spells" sprouting in random
locations across the background. Clicking on the background will also initiate a
starting point for a new spell to appear.

It is meant to represent the imaginative and infinite wonders of programming as
described eloquently by Fred Brooks in one of my favorite quotes from him in
his book *The Mythical Man-Month*, which is featured on the page.

A canvas element spans the entire background and [my script](js/magic.js)
leverages [AnimationFrame](https://github.com/kof/animationFrame) to animate
the construction of procedurally generated trees of
[B-splines](http://en.wikipedia.org/wiki/B-spline) for a random range of time.
I adapted a large portion of the code from Maissian's [tutorial on simulating
vines](http://www.maissan.net/articles/simulating-vines), making it more
random, colorful, and more CPU efficient.

It was really fun to tweak various variables in the script and see how the
animation reacted. It didn't take much tweaking to get the lines to appear like
lightning flashing in the distant background, or like cracks splitting the
screen, or like growing forest of sprouting trees.

You can play around with these variables yourself on the [/magic
page](http://www.hallada.net/magic) which has sliders for tweaking the
animations in realtime.

## Layout & CSS

I use a [grid system devised by Adam Kaplan](http://www.adamkaplan.me/grid/) and
with some pieces from [Jorden Lev](http://jordanlev.github.io/grid/). It is
set-up by scratch in my `main.css`. I decided on this so that I would not have
to load a huge framework like Bootstrap since I would only be using the grid
system out of it.

As an introduction to this system:

Wrap everything in a div element with the `container` class.

```html
<div class="container"></div>
```

To create rows add div elements with the `row` and `clearfix` classes.

```html
<div class="container">
    <div class="row clearfix"></div>
</div>
```

To create columns add div elements with the `column` class. Then add a class
to describe the width of the column with respect to the container. The possible
widths are:

CSS class name  | width percentage
--------------- | ----------------
`full`          | 100%
`two-thirds`    | 66.7%
`half`          | 50%
`third`         | 33.3%
`fourth`        | 25%
`three-fourths` | 75%

These are purely for convienence. A more precise width can be specified in the
CSS if desired with the `width` attribute.

```html
<div class="container">
    <div class="row clearfix">
        <div class="column full"></div>
    </div>
</div>
```

Columns stack up right to left. To force a column out of order all the way to
the right use the `flow-opposite` class on the column (but remain first on
smaller screens).

```html
<div class="container">
    <div class="row clearfix">
        <div class="column half"></div>
        <div class="column half flow-opposite"></div>
    </div>
</div>
```

To hide an element on mobile phones add the class `hide-mobile`. To hide on
desktop, use `hide-desktop` instead.

```html
<div class="container">
    <div class="row clearfix">
        <div class="column half hide-mobile"></div>
        <div class="column half hide-desktop"></div>
    </div>
</div>
```

I had an issue with displaying elements on desktop that had the class
"hide-mobile", so you can add the following classes to make sure they redisplay
in the right display type correctly:

* `hide-mobile-block`
* `hide-mobile-inline-block`
* `hide-mobile-inline`
* `hide-deskop-block`
* `hide-desktop-inline-block`
* `hide-desktop-inline`

I could add more for each `display` property, but I'm trying to find a better
way of fixing this without adding these second classes.

Another note: I use [box-sizing (as suggested by Paul
Irish)](http://www.paulirish.com/2012/box-sizing-border-box-ftw/), which I think
makes dealing with sizing elements a lot more sane.

## Attributions

[Book](http://thenounproject.com/term/book/23611/) designed by [Nherwin
Ardoña](http://thenounproject.com/nherwinma) from the Noun Project.

[Profile](http://thenounproject.com/term/profile/20733/) designed by [Ryan
Beck](http://thenounproject.com/RyanBeck) from the Noun Project.

[Photos](http://thenounproject.com/term/photos/29898/) designed by [Ryan
Beck](http://thenounproject.com/RyanBeck) from the Noun Project.
