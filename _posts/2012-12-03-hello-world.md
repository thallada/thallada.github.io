---
title: Hello, World!
layout: post
redirect_from: "/blog/hello-world/"
---

This past summer, I decided that the basic HTML site that I had at hallada.net
wasn't going to cut it anymore. I needed a blog.

At that point, I had already come a long way with [Python](http://python.org/)
and was pretty familiar with it and I was beginning to get familiar with
[Django](https://www.djangoproject.com/), a web framework for Python. Django
was what I was working with at [Valti](https://www.valti.com), and I was really
liking making websites with it. It took what made Python awesome and applied
that to web development.
<!--excerpt-->

I started from a blank Django project and built it up from there. Django's
Object-Relational Mapper (ORM) can be boiled down to this: python classes
(called models) in a Django-specific module named `models.py` represent a table
in a database, where the attributes of the classes are columns in the table and
instances of the classes are rows. This was something that was very intuitive
for me, since I came from a Python and object-oriented programming background.

The first step was to create Entry models which would hold text, title, and
other related data pertaining to a blog post. I then created a view that would
display these Entry objects in some order. A "view" in Django is just a Python
function that accepts an HTTP request as a parameter and returns an HTTP
response that the server will then hand off to the clients browser.

From there, the project took off. It became the project where I would take all
of the refined knowledge I was gaining at Valti about Django, and apply it in a
very controlled and perfected environment. 

I built other features such as Project models that hold data about a specific
project I have done, Tag models to hold a word that would categorize Entries
and Projects, an archive view that would chronologically list all of the
entries I've ever posted, and many other small things I could never list out in
one blog post.

Django itself provided many useful features for my blog. After all, it was
built for this type of use.
[Comments](https://docs.djangoproject.com/en/dev/ref/contrib/comments) were a
big feature out of the Django contrib package that I used. However, I heavily
modified the way comments work on my blog to make it more streamlined. For
example, I used [jQuery](http://jquery.com/) and
[Ajax](http://en.wikipedia.org/wiki/Ajax_(programming)) to grab another
commenter's post in pre-rendered markdown syntax and inserted it into the
comment text box when you click reply on someone's comment.

I pulled in a few third-party packages, like
[South](http://south.aeracode.org/) and
[django-markdown-deux](https://github.com/trentm/django-markdown-deux) as well
to make my life easier, but I tried to constrain them to things that would more
aid me than do all the work on the blog for me. Because the fun in creating a
blog in Django instead of using some pre-manufactured
[Wordpress](http://wordpress.org/) template is that I get to design, implement,
and maintain the site all on my own. This allows me to really truly understand
what is going on under the hood.

Surprisingly, the most difficult part of the whole project was the design of
the site. It was actually what stalled me from completing the blog until months
after I had started creating it. I absolutely despise CSS.

Luckily, I found [Bootstrap](http://twitter.github.com/bootstrap/). It's
sensible grid-system actually made sense to me. And I was able to make a decent
looking layout very quickly using it. But of course, I still stalled forever in
trying to perfect the design to get it *just* right. A couple weeks ago I
finally decided enough was enough and I was going with the current layout so I
could start blogging.

My old site was hosted on a friend's server, but this time I decided that I
would host it on my own server so I could get a better understanding of the
inner workings of web servers. I ended up hosting it on my [personal virtual
machine](http://alpaca.mit.edu) provided by [MIT's SIPB](http://sipb.mit.edu/)
[XVM project](http://xvm.mit.edu/). I had previously hosted many Django
websites through the cloud server provider [Heroku](http://www.heroku.com/),
which worked fantastically. But, I had never tried to host on my own server.

I decided on using [Apache](http://www.apache.org/) to host my website since it
was the most common throughout the web and I would be bound to encounter it
again in web development anyways. I tested the whole configuration on the
desktop computer in my dorm room before I deployed it to Alpaca (my MIT virtual
machine). There was much frustration before I got the VirtualHost configuration
in Apache set up correctly to allow access to the static files for my blog, but
it all could be chalked up to me just being generally unfamiliar with Apache.

So that is the majority of the work that went into making this blog a reality.
Again, this is something I've created that I haven't had the chance to test
extensively on a large scale, so there may be bugs here and there that you
might notice. Do me a big favor and report them to me so I can make sure my
blog is running as smoothly as possible.

Also, I welcome constructive criticism, so comment if you have any thoughts or
suggestions about my writing or the site in general. Also, I just want people
using the commenting feature so I can make sure it's really working :P

I hope you all enjoyed the first post ever on my blog.

EDIT: View the code for this project at
[GitHub](https://github.com/thallada/personalsite).

EDIT: I have since moved the site from SIPB's XVM service to SIPB's (hopefully
more reliable) [scripts service](http://scripts.mit.edu). <a
href="http://scripts.mit.edu/"><img alt="powered by scripts.mit.edu"
src="http://scripts.mit.edu/media/powered_by.gif" /></a>

EDIT: This post is now referring to an old version of my website. I have since
re-wrote my website and moved away from Django.
