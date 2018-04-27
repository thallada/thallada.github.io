---
title: Publishing Draft Docs to my Blog
layout: post
redirect_from: "/blog/publishing-draft-docs-to-my-blog/"
---

I like to think that if only I find The Perfect Text Editor I will somehow
write better and more often. Obviously this is only a tactic I use to delay
actually writing anything, but I did come across something that might actually
help. [Draft](https://draftin.com) is a writing app being developed by one guy,
[Nate Kontny](https://twitter.com/natekontny), that has a ton of nifty
features, one of its best being a version control system that allows you to
send a draft to other people and accept or reject any changes they suggest. It
also has a minamilistic iA Writer type interface, which focuses on the actual
writing and nothing more.
<!--excerpt-->

One of my most favorite features that I have just discovered, though, is that
it allows publishing any Draft document to any arbitrary
[WebHook](http://en.wikipedia.org/wiki/Webhook). Which basically means I can
click a button in the interface and that will send a POST request to a URL I
specify with all of the data for my Draft document in JSON format. I can just
write a bit of code to parse that data and then I instantly have a better
editor for my blog.

It was really easy to do too. For this Django website, all it took [was adding
a view that parsed a JSON object and made a blog entry out of
it](https://github.com/thallada/personalsite/commit/c4694a6669dbc7b79a5bff3fb818a682ecacffbb).
You can read the
[documentation](https://draftin.com/documents/69898?token=5fjKKlZ0-AeBzqj_RAftAGdzRzl9VBfBHj5wpSWm_gU)
for more info on how to make a WebHook for Draft.

Nate has also made a lot of other neat features, like a [Chrome extension that
turns any textarea on the web into a Draft
document](https://chrome.google.com/webstore/detail/draft/amlbbbgcijmiooecobhkjblcdkjldmdk).
Read about some of the other features in the [Lifehacker
article](http://lifehacker.com/5993339/draft-is-a-writing-app-with-serious-version-and-draft-control).
The app is still in development and new features are being added constantly.

I think the take-away here is that the Big Guys, with apps like Google Drive or
Evernote, don't always have the best solutions. I tried hacking Google Drive
into a more immersive writing experience with templates and so on, but nothing
came close to the experience of Draft, which was exactly what I wanted to begin
with. It's a wonder that more people don't know about Draft, but I guess that's
part of the magic. There's a real person, an innovative and driven hacker,
behind the product who might actually listen to what I have to say.

Now excuse me while I go waste more time scouring the web for more obscure but
brilliant apps.
