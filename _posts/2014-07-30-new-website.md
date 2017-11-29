---
title: New Website
layout: post
---

[My old website](https://github.com/thallada/personalsite) was a nice
demonstration of my knowledge of Django, but I decided recently that my web
development knowledge had exceeded what it was showing off. The main thing that
annoyed me about my last website was that I was hosting what essentially was a
static website on a web framework meant for dynamic websites. It was time for a
update.

I decided to go with [Jekyll](http://jekyllrb.com/) which had everything I
wanted:

1. Write posts in markdown and have them auto-magically show up on the website
as HTML.
2. Really easy to host on [Github](http://github.com), I just push new posts to
my [repo](https://github.com/thallada/thallada.github.io) and I'm done.
3. It's a static website, so it loads waaay faster than my old Django blog that
has to generate each page from a template on every request.
4. It's developer friendly. There are a ton of plugins and it's really easy to
write my own if I ever need to.

I traditionally have used [Twitter Bootstrap](http://getbootstrap.com/) for
styling pretty much every site I've made, but in the spirit of minimalism I
wanted to roll my own so I wouldn't have to import all the extraneous stuff
Bootstrap provides that I don't need. The only thing I really wanted was a grid
system, and [it's actually not that set-up on your
own](http://www.adamkaplan.me/grid/). You can read about the details of my full
implementation in [the README for this website's github
repo](https://github.com/thallada/thallada.github.io/blob/master/README.md).

The hardest part of this project though, was the
[magic](https://github.com/thallada/thallada.github.io/blob/master/js/magic.js)
on the front page. I found [a wonderful article by
Maissan](http://www.maissan.net/articles/simulating-vines) about how to simulate
vines growing in Javascript and adapted it to display multi-colored tendrils
that grew randomly on the background of my homepage. I was inspired by the Fred
Brooks quote, now displayed on my front page, to code something that would
express the sort of "exertion of imagination" that makes programming such a joy.

I'm quite happy with the result. It's probably the most complicated canvas
drawing application I've made to date. Initially, it was really CPU intensive,
but I managed to optimize the code and fine-tune it so that it ran consistently
under 20% (on my machine), which was actually better than a few chrome
extensions I was running anyways.

Hopefully this new blog will also inspire me to write more posts as [my last
post](/2013/10/03/publishing-draft-docs-to-my-blog.html)
was almost a year ago now.
