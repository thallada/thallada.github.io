---
title: "Proximity Structures: Playing around with PixiJS"
layout: post
image: /img/blog/proximity-structures.png
---

I've been messing around with a library called [PixiJS](http://www.pixijs.com/)
which allows you to create WebGL animations which will fall back to HTML5 canvas
if WebGL is not available in the browser. I mostly like it because the API is
similar to HTML5 canvas which [I was already familiar
with](https://github.com/thallada/thallada.github.io/blob/master/js/magic.js). I
can't say that I like the PixiJS API and documentation that much, though. For
this project, I mostly just used a small portion of it to create [WebGL (GPU
accelerated) primitive
shapes](http://www.goodboydigital.com/pixi-webgl-primitives/) (lines and
circles).

**Play with it here**: [http://proximity.hallada.net](http://proximity.hallada.net)

**Read/clone the code here**: [https://github.com/thallada/proximity-structures](https://github.com/thallada/proximity-structures)

![The animation in action](/img/blog/proximity-structures.gif)

The idea was inspired by
[all](https://thumb9.shutterstock.com/display_pic_with_logo/3217643/418838422/stock-vector-abstract-technology-futuristic-network-418838422.jpg)
[those](https://ak5.picdn.net/shutterstock/videos/27007555/thumb/10.jpg)
[countless](https://ak9.picdn.net/shutterstock/videos/10477484/thumb/1.jpg)
[node](https://ak3.picdn.net/shutterstock/videos/25825727/thumb/1.jpg)
[network](https://t4.ftcdn.net/jpg/00/93/24/21/500_F_93242102_mqtDljufY7CNY0wMxunSbyDi23yNs1DU.jpg)
[graphics](https://ak6.picdn.net/shutterstock/videos/12997085/thumb/1.jpg) that
I see all the time as stock graphics on generic tech articles.

This was really fun to program. I didn't care much about perfect code, I just
kept hacking one thing onto another while watching the instantaneous feedback of
the points and lines responding to my changes until I had something worth
sharing.

### Details

The majority of the animation you see is based on
[tweening](https://en.wikipedia.org/wiki/Inbetweening). Each point has an origin
and destination stored in memory. Every clock tick (orchestrated by the almighty
[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)),
the main loop calculates where each point should be in the path between its
origin and destination based on how long until it completes its "cycle".  There
is a global `cycleDuration`, defaulted to 60. Every frame increments the cycle
counter by 1 until it reaches 60, at which point it folds over back to 0. Every
point is assigned a number between 1 and 60. This is its start cycle. When the
global cycle counter equals a point's start cycle number, the point has reached
its destination and a new target destination is randomly chosen.

Each point is also randomly assigned a color. When a point is within
`connectionDistance` of another point in the canvas, a line is drawn between the
two points, their colors are averaged, and the points' colors become the average
color weighted by the distance between the points. You can see clusters of
points converging on a color in the animation.

Click interaction is implemented by modifying point target destinations within a
radius around the click. Initially, a mouse hover will push points away.
Clicking and holding will draw points in, progressively growing the effect
radius in the process to capture more and more points.

I thought it was really neat that without integrating any physics engine
whatsoever, I ended up with something that looked sort of physics based thanks
to the tweening functions. Changing the tweening functions that the points use
seems to change the physical properties and interactions of the points. The
elastic tweening function makes the connections between the points snap like
rubber bands. And, while I am not drawing any explicit polygons, just points and
lines based on proximity, it sometimes looks like the points are coalescing into
some three-dimensional structure.

I'll probably make another procedural animation like this in the future since it
was so fun. Next time, I'll probably start from the get-go in ES2015 (or ES7,
or ES8??) and proper data structures.
