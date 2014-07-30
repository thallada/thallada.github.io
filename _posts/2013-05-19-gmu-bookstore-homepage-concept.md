---
title: GMU Bookstore Homepage Concept and Staw Dispensers
layout: post
redirect_from: "/blog/gmu-bookstore-homepage-concept/"
---

I have finally finished my second year of college. Now that finals are over, I
can post about some of the things I have been working on. First, a front-end I
made with a group in my [*SWE 205 : Software Usability Analysis and
Design*](http://www.cs.gmu.edu/~offutt/classes/205/) class. The assignment was
to create a homepage for the University's bookstore website, applying all of the
usability principles we had learned over the semester. I ended up working on it
when I wanted to procrastinate on assignments in my other classes, so I put
quite a bit of effort into it.

See it here: [swe205.hallada.net](http://swe205.hallada.net)
<div style="text-align: center">
    <a href="http://swe205.hallada.net" alt="See it in action">
        <img src="/img/blog/gmu_bookstore_preview.jpg">
    </a>
</div>
<br>

You can see all the code for it [up on my
GitHub](https://github.com/thallada/gmu-bookstore-concept).

Our group researched other university bookstore websites to get some ideas and
we liked the layout of [Virginia Tech's](http://www.bookstore.vt.edu/) (but
hated the colors). We liked how everything needed was presented immediately
upfront in a Windows 8 metro-esque grid.

Since the main feature of the site was a grid and I was already familiar with it
I used [Twitter Bootstrap](http://twitter.github.io/bootstrap/) to help with the
CSS. Bootstrap also helped make the design responsive and look nice on mobile
phones (try resizing your window to see it in action). I also used the
[Bootstrap modal](http://twitter.github.io/bootstrap/javascript.html#modals) for
the "Contact Us" form which is activated by the link in the footer of the page.
However, I had to modify it quite a bit to make sure it was fully usable and
would prompt the user before they closed out of the modal with text entered.

Overall, this was a fun project to end off a very fun and interesting course. I
highly recommend any one at GMU to take this course with Prof. Offutt even if
they don't plan on being web designers. I have come away from the class with not
only the principles for making usable web interfaces but also a habit of
analyzing nearly any interface in the real-world.

For example, I noticed the other day while getting food in the [Johnson
Center](http://jcweb.gmu.edu/) that they had installed a [new paper-less straw
dispenser](http://i.imgur.com/s9olzcg.jpg). When I first encountered it, I
didn't know how to operate it (and at the time there was no sign to tell me
how). Since there seemed to be a chute at the bottom of the contraption, I
figured there must be a way to get a straw to drop down into it, but the
dispenser didn't give any hints to how to do that. The knobs on the side had
looked purely decorative to me. Giving up, I opened the top of the dispenser and
grabed a straw from the pile of them, cursing the whole thing for it's bad
usability.

The next day I came by for food again, and I noticed that it now had a sign
instructing everyone to not do exactly what I had done the other day: "Do Not
Open. Just turn knob". More people than just I must have been perplexed by this
dispenser.  As Offutt had said countless times in class before: if a interface
requires a manual then it has failed.

It's the little things, like the straw dispensers that no one knows how to use,
that you begin to notice after taking SWE 205. It's both a blessing and curse.
Bad interfaces drive me insane, and to my frustration I notice them everywhere
now. But, at least know the most basic things to avoid in the interfaces I
design now.
