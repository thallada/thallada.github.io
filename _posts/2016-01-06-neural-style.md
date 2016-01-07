---
title: Generating Realistic Satellite Imagery with Deep Neural Networks
layout: post
---

I've been doing a lot of experimenting with [neural-style](https://github.com/jcjohnson/neural-style)
the last month. I think I've discovered a few exciting applications of the
technique that I haven't seen anyone else do yet. The true power of this
algorithm really shines when you can see concrete examples.

Skip to the **Applications** part of this post to see the outputs from my
experimentation if you are already familiar with DeepDream, Deep Style, and all
the other latest happenings in generating images with deep neural networks.

###Background and History###

On [May 18, 2015 at 2 a.m., Alexander
Mordvintsev](https://medium.com/backchannel/inside-deep-dreams-how-google-made-its-computers-go-crazy-83b9d24e66df#.g4t69y8wy),
an engineer at Google, did something with deep neural networks that no one had
done before. He took a net designed for *recognizing* objects in images and used
it to *generate* objects in images. In a sense, he was telling these systems
that mimic the human visual cortex to hallucinate things that weren't really
there. The [results](https://i.imgur.com/6ocuQsZ.jpg) looked remarkably like LSD
trips or what a [schizophrenic person sees on a blank
wall](https://www.reddit.com/r/deepdream/comments/3cewgn/an_artist_suffering_from_schizophrenia_was_told/).

Mordvintsev's discovery quickly gathered attention at Google once he posted
images from his experimentation on the company's internal network. On June 17,
2015, [Google posted a blog post about the
technique](http://googleresearch.blogspot.com/2015/06/inceptionism-going-deeper-into-neural.html)
(dubbed "Inceptionism") and how it was useful for opening up the notoriously
black-boxed neural networks using visualizations that researchers could examine.
These machine hallucinations were key for identifying the features of objects
that neural networks used to tell one object from another (like a dog from a
cat). But the post also revealed the [beautiful
results](https://goo.gl/photos/fFcivHZ2CDhqCkZdA) of applying the algorithm
iteratively on it's own outputs and zooming out at each step.

The internet exploded in response to this post. And once [Google posted the code
for performing the
technique](http://googleresearch.blogspot.com/2015/07/deepdream-code-example-for-visualizing.html?m=1),
people began experimenting and sharing [their fantastic and creepy
images](https://www.reddit.com/r/deepdream) with the world.

Then, on August, 26, 2015, a paper titled ["A Neural Algorithm of Artistic
Style"](http://arxiv.org/abs/1508.06576) was published. It showed how one could
identify which layers of deep neural networks recognized stylistic information
of an image (and not the content) and then use this stylistic information in
Google's Inceptionism technique to paint other images in the style of any
artist. A [few](https://github.com/jcjohnson/neural-style)
[implementations](https://github.com/kaishengtai/neuralart) of the paper were
put up on Github. This exploded the internet again in a frenzy. This time, the
images produced were less like psychedelic-induced nightmares but more like the
next generation of Instagram filters ([reddit
how-to](https://www.reddit.com/r/deepdream/comments/3jwl76/how_anyone_can_create_deep_style_images/)). 

People began to wonder [what all of this
meant](http://www.hopesandfears.com/hopes/culture/is-this-art/215039-deep-dream-google-art)
to [the future of
art](http://kajsotala.fi/2015/07/deepdream-today-psychedelic-images-tomorrow-unemployed-artists/).
Some of the results produced where [indistinguishable from the style of dead
artists'
works](https://raw.githubusercontent.com/jcjohnson/neural-style/master/examples/outputs/tubingen_starry.png).
Was this a demonstration of creativity in computers or just a neat trick?

On November, 19, 2015, [another paper](http://arxiv.org/abs/1511.06434) was
released that demonstrated a technique for generating scenes from convolutional
neural nets ([implementation on Github](https://github.com/Newmu/dcgan_code)).
The program could generate random (and very realistic) [bedroom
images](https://github.com/Newmu/dcgan_code/raw/master/images/lsun_bedrooms_five_epoch_samples.png)
from a neural net trained on bedroom images. Amazingly, it could also generate
[the same bedroom from any
angle](https://github.com/Newmu/dcgan_code/blob/master/images/lsun_bedrooms_five_epochs_interps.png).
It could also [produce images of the same procedurally generated face from any
angle](https://github.com/Newmu/dcgan_code/blob/master/images/turn_vector.png).
Theoretically, we could use this technology to create *procedurally generated
game art*.

The main thing holding this technology back from revolutionizing procedurally
generated video games is that it is not real-time. Using
[neural-style](https://github.com/jcjohnson/neural-style) to apply artistic
style to a 512 by 512 pixel content image could take minutes even on the
top-of-the-line GTX Titan X graphics card. Still, I believe this technology has
a lot of potential for generating game art even if it can't act as a real-time
filter.

###Applications: Generating Satellite Images for Procedural World Maps###

I personally know very little machine learning, but I have been able to produce
a lot of interesting results by using the tool provided by
[neural-style](https://github.com/jcjohnson/neural-style).

Inspired by [Kaelan's procedurally generated world
maps](http://blog.kaelan.org/randomly-generated-world-map/), I wanted to extend
the idea by generating realistic satellite images of the terrain maps. The
procedure is simple: take a [generated terrain map](/assets/kaelan_terrain1.png)
and apply the style of a [real-world satellite image](/assets/uk_satellite.jpg)
on it using neural-style.

![Output of generated map plus real-world satellite
imagery](/assets/satellite_terrain1_process.png)

The generated output takes on whatever terrain is in the satellite image. Here
is an output processing one of Kaelan's maps with a [arctic satellite
image](/assets/svalbard_satellite.jpg):

![Kaelan's terrain map](/assets/kaelan_terrain2.jpg)
![Output of terrain map plus arctic satellite imagery](/assets/satellite_terrain2.png)

And again, with one of Kaelan's desert maps and a [satellite image of a
desert](/assets/desert_satellite.jpg):

![Kaelan's desert terrain map](/assets/kaelan_terrain3.jpg)
![Output of terrain map plus desert satellite imagery](/assets/satellite_terrain3.png)

It even works with [Kaelan's generated hexagon
maps](http://blog.kaelan.org/hexagon-world-map-generation/). Here's an island
hexagon map plus a [satellite image of a volcanic
island](/assets/volcano_satellite.jpg):

![Kaelan's island hexagon map](/assets/kaelan_hex_terrain.jpg)
![Output of hexagon map plus island satellite
imagery](/assets/satellite_hex_terrain.png)

This image even produced an interesting three-dimensional effect because of the
volcano in the satellite image.

By the way, this also works with minecraft maps. Here's a minecraft map I found
on the internet plus a [satellite image from Google
Earth](/assets/river_satellite.png):

![Minecraft map](/assets/minecraft_map.jpg)
![Output of minecraft map plus river satellite
imagery](/assets/satellite_minecraft_map.png)

No fancy texture packs or 3-D rendering needed :).

Here is the Fallout 4 grayscale map plus a
[satellite image of Boston](/assets/boston_aerial.jpg):

![Fallout 4 grayscale map](/assets/fallout4_map.png)
![Output of Fallout 4 map plus Boston satellite
imagery](/assets/satellite_fallout4_map.png)

Unfortunately, it puts the built-up dense part of the city in the wrong part of
the geographic area. But, this is understandable since we gave the algorithm no
information on where that is on the map.

We can also make the generated terrain maps look like old hand-drawn maps using
neural-style. With Kaelan's terrain map as the
content and [the in-game Elder Scrolls IV Oblivion map of
Cyrodiil](/assets/cyrodiil_ingame.jpg) as the style we get this:

![Kaelan's terrain map](/assets/kaelan_terrain1.png)
![Output of terrain map plus map of Cyrodiil](/assets/cyrodiil_terrain1.png)

It looks cool, but the water isn't conveyed very clearly (e.g. makes deep water
look like land). Neural-style seems to work better when there is lots of color
in both images.

Here is the output of the hex terrain plus satellite map above and the Cyrodiil
map which looks a little cleaner:

![Satellite-like hex terrain map](/assets/satellite_hex_terrain.png)
![Output of hex terrain plus satellite and map of
Cyrodiil](/assets/cyrodiil_satellite_hex_terrain.png)

I was interested to see what neural-style could generate from random noise, so I
rendered some clouds in GIMP and ran it with a satellite image of [Mexico City
from Google Earth](/assets/mexico_city.jpg) (by the way, I've been getting high
quality Google Earth shots from
[earthview.withgoogle.com](https://earthview.withgoogle.com)).

![Random clouds](/assets/blurry_clouds.png)
![Output of random clouds and Mexico City](/assets/random_mexico_city.png)

Not bad for a neural net without a degree in urban planning.

I also tried generating on random noise with a satellite image of [a water
treatment plant in Peru](/assets/treatment_plant.jpg)

![Random clouds](/assets/blurry_clouds2.png)
![Output of random clouds and water treatment
plant](/assets/random_treatment_plant.png)

###Applications: More Fun###

For fun, here are some other outputs that I liked.

[My photo of Boston's skyline as the content](/assets/boston_skyline.jpg) and
[Vincent van Gogh's The Starry Night as the style](/assets/starry_night.jpg):

![Output of Boston skyline and starry night](/assets/starry_boston.png)

[A photo of me](/assets/standing_forest.jpg) (by Aidan Bevacqua) and [Forrest in
the end of Autumn by Caspar David Friedrich](/assets/forrest_autumn.jpg):

![Output of me and Forrest in the end of
Autumn](/assets/dead_forest_standing.png)

[Another photo of me by Aidan](/assets/sitting_forest.jpg) in the same style:

![Output of me and Forrest in the end of Autumn](/assets/dead_forest_sitting.png)

[A photo of me on a mountain](/assets/mountain_view.jpg) (by Aidan Bevacqua) and
[pixel art by Paul Robertson](/assets/pixels.png)

![Output of me on a mountain and pixel art](/assets/mountain_view_pixels.png)

[A photo of a park in Copenhagen I took](/assets/copenhagen_park.jpg) and a
painting similar in composition, [Avenue of Poplars at Sunset by Vincent van
Gogh](/assets/avenue_poplars.jpg):

![Output of park in Copenhagen and Avenue of Poplars at
Sunset](/assets/poplars.png)

[My photo of the Shenandoah National Park](/assets/shenandoah_mountains.jpg) and
[this halo graphic from GMUNK](/assets/halo_ring_mountains.jpg)
([GMUNK](http://www.gmunk.com/filter/Interactive/ORA-Summoners-HALO)):

![Output of Shenandoah mountains and halo ring
mountains](/assets/halo_shenandoah.png)

[A photo of me by Aidan](/assets/me.png) and a [stained glass
fractal](/assets/stained_glass.jpg):

![Output of me and a stained glass fractal](/assets/stained_glass_portrait.png)

Same photo of me and some [psychedelic art by GMUNK](/assets/pockets.jpg)

![Output of me and psychedelic art](/assets/pockets_portrait.png)

[New York City](/assets/nyc.jpg) and [a rainforest](/assets/rainforest.jpg):

![Output of New York City and a rainforest](/assets/jungle_nyc.png)

[Kowloon Walled City](/assets/kowloon.jpg) and [a National Geographic
Map](/assets/ngs_map.jpg):

![Output of Kowloon and NGS map](/assets/kowloon_ngs.png)

[A photo of me by Aidan](/assets/side_portrait.jpg) and [Head of Lioness by
Theodore Gericault](/assets/head_lioness.jpg):

![Output of photo of me and ](/assets/lion_portrait.png)

[Photo I took of a Norwegian forest](/assets/forest_hill.jpg) and [The Mountain
Brook by Albert Bierstadt](/assets/mountain_brook.jpg):

![Output of Norwegian forest and The Mountain
Brook](/assets/mountain_brook_hill.png)

###Limitations###

I don't have infinite money for a GTX Titan X, so I'm stuck with using OpenCL on
my more-than-a-few-generations-old AMD card. It takes about a half-hour to
generate one 512x512 px image in my set-up (which makes the feedback loop for
correcting mistakes *very* long). And sometimes the neural-style refuses to run
on my GPU (I suspect it runs out of VRAM), so I have to run it on my CPU which
takes even longer...

I am unable to generate bigger images (though
[the author has been able to generate up to 1920x1010
px](https://github.com/jcjohnson/neural-style/issues/36#issuecomment-142994812)).
As the size of the output increases the amount of memory and time to generate
also increases. And, it's not practical to just generate thumbnails to test
parameters, because increasing the image size will probably generate a very
different image since all the other parameters stay the same even though they
are dependent on the image size.

Some people have had success running these neural nets on GPU spot instances in
AWS. It would be certainly cheaper than buying a new GPU in the short-term.

So, I have a few more ideas for what to run, but it will take me quite a while
to get through the queue.
