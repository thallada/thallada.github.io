thallada.github.io
==================

##Layout & CSS##
I use a [grid system devised by Adam Kaplan](http://www.adamkaplan.me/grid/) and
with some pieces from [Jorden Lev](http://jordanlev.github.io/grid/). It is
set-up by scratch in my `main.css`. I decided on this so that I would not have
to load a huge framework like Bootstrap since I would only be using the grid
system out of it.

As an introduction to this system:

1. Wrap everything in a div element with the `container` class.

'''html
<div class="container"></div>
'''

2. To create rows add div elements with the `row` and `clearfix` classes.

'''html
<div class="container">
    <div class="row clearfix"></div>
</div>
'''

2. To create columns add div elements with the `column` class. Then add a class
to describe the width of the column with respect to the container. The possible
widths are:

* full: 100% width
* two-thirds: 66.7% width
* half: 50% width
* third: 33.3% width
* fourth: 25% width
* three-fourths: 75% width

These are purely for convienence. A more precise width can be specified in the
CSS if desired with the `width` attribute.

'''html
<div class="container">
    <div class="row clearfix">
        <div class="column full"></div>
    </div>
</div>
'''

3. Columns stack up right to left. To force a column out of order all the way to
the right use the `flow-opposite` class on the column.

'''html
<div class="container">
    <div class="row clearfix">
        <div class="column half"></div>
        <div class="column half flow-opposite"></div>
    </div>
</div>
'''

4. To hide an element on mobile phones add the class `hide-mobile`. To hide on
desktop, use `hide-desktop` instead.

'''html
<div class="container">
    <div class="row clearfix">
        <div class="column half hide-mobile"></div>
        <div class="column half hide-desktop"></div>
    </div>
</div>
'''

5. Another note: I use [box-sizing (as suggested by Paul
Irish)](http://www.paulirish.com/2012/box-sizing-border-box-ftw/), which I think
makes dealing with sizing elements a lot more sane.
