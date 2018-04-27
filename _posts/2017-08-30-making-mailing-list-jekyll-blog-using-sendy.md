---
title: "Making a Mailing List for a Jekyll Blog Using Sendy"
layout: post
---

When my beloved [Google Reader](https://en.wikipedia.org/wiki/Google_Reader) was
discontinued in 2013, I stopped regularly checking RSS feeds. Apparently, [I am
not alone](https://trends.google.com/trends/explore?date=all&q=rss). It seems
like there's a new article every month arguing either that [RSS is dead or RSS
is not dead
yet](https://hn.algolia.com/?q=&query=rss%20dead&sort=byPopularity&prefix&page=0&dateRange=all&type=story).
Maybe RSS will stick around to serve as a cross-site communication backbone, but
I don't think anyone will refute that RSS feeds are declining in consumer use.
Facebook, Twitter, and other aggregators are where people really go. However, I
noticed that I still follow some small infrequent blogs through mailing lists
that they offer. I'm really happy to see an email sign up on blogs I like,
because it means I'll know when they post new content in the future. I check my
email regularly unlike my RSS feeds.
<!--excerpt-->

Even though I'm sure my blog is still too uninteresting and unheard of to get
many signups, I still wanted to know what it took to make a blog mailing list.
RSS is super simple for website owners, because all they need to do is dump all
of their content into a specially formatted XML file, host it, and let RSS
readers deal with all the complexity. In my blog, [I didn't even need a
Jekyll
plugin](https://github.com/thallada/thallada.github.io/blob/master/feed.xml).
Email is significantly more difficult. With email, the website owner owns more
of the complexity. And, spam filters make it unfeasible to roll your own email
server. A couple people can mark you as spam, and BAM: now you are blacklisted
and you have to move to a new IP address. This is why most people turn to a
hosted service like [Mailchimp](https://mailchimp.com/). Though, I was
dissatisfied with that because of the [high costs and measly free
tier](https://mailchimp.com/pricing/).

[Amazon Simple Email Service (SES)](https://aws.amazon.com/ses/) deals with all
the complexity of email for you and is also
[cheap](https://aws.amazon.com/ses/pricing/). In fact, it's free unless you have
more than 62,000 subscribers or post way more than around once a month, and even
after that it's a dime for every 1,000 emails sent. Frankly, no one can really
compete with what Amazon is offering here.

Okay, so that covers sending the emails, but what about collecting and storing
subscriptions? SES doesn't handle any of that. I searched around a long time for
something simple and free that wouldn't require me setting up a server [^1]. I
eventually ended up going with [Sendy](https://sendy.co/) because it looked like
a well-designed product exactly for this use case that also handled drafting
emails, email templates, confirmation emails, and analytics. It costs a one-time
fee of $59 and I was willing to fork that over for quality software. Especially
since most other email newsletter services require some sort of monthly
subscription that scales with the number of emails you are sending.

Unfortunately, since Sendy is self-hosted, I had to add a dynamic server to my
otherwise completely static Jekyll website hosted for free on [Github
Pages](https://pages.github.com/). You can put Sendy on pretty much anything
that runs PHP and MySQL including the cheap [t2.micro Amazon EC2 instance
type](https://aws.amazon.com/ec2/instance-types/). If you are clever, you might
find a cheaper way. I already had a t2.medium for general development,
tinkering, and hosting, so I just used that.

There are many guides out there for setting up MySQL and Apache, so I won't go
over that. But, I do want to mention how I got Sendy to integrate with
[nginx](https://nginx.org/en/) which is the server engine I was already using. I
like to put separate services I'm running under different subdomains of
my domain hallada.net even though they are running on the same server and IP
address. For Sendy, I chose [list.hallada.net](http://list.hallada.net) [^2].
Setting up another subdomain in nginx requires [creating a new server
block](https://askubuntu.com/a/766369). There's [a great Gist of a config for
powering Sendy using nginx and
FastCGI](https://gist.github.com/refringe/6545132), but I ran into so many
issues with the subdomain that I decided to use nginx as a proxy to the Apache
mod_php site running Sendy. I'll just post my config here:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name list.hallada.net;

    root /var/www/html/sendy;
    index index.php;

    location /l/ {
        rewrite ^/l/([a-zA-Z0-9/]+)$ /l.php?i=$1 last;
    }

    location /t/ {
        rewrite ^/t/([a-zA-Z0-9/]+)$ /t.php?i=$1 last;
    }

    location /w/ {
        rewrite ^/w/([a-zA-Z0-9/]+)$ /w.php?i=$1 last;
    }

    location /unsubscribe/ {
        rewrite ^/unsubscribe/(.*)$ /unsubscribe.php?i=$1 last;
    }

    location /subscribe/ {
        rewrite ^/subscribe/(.*)$ /subscribe.php?i=$1 last;
    }

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:8080/sendy/;
    }
}
```

Basically, this proxies all of the requests through to Apache which I configured
to run on port 8080 by changing the `Listen` directive in
`/etc/apache2/ports.conf`.

I also had to add `RewriteBase /sendy` to the end of the `.htcaccess` file in
the sendy directory (which, for me, was in `/var/www/html/sendy`). This
basically forces Sendy to use urls that start with `http://list.hallada.net`
instead of `http://list.hallada.net/sendy` which I thought was redundant since I
am dedicating the whole subdomain to sendy.

A perplexing issue I ran into was that Gmail accounts were completely dropping
(not even bouncing!) any emails I sent to them if I used my personal email
`tyler@hallada.net` as the from address. I switched to `tyhallada@gmail.com` for
the from address and emails went through fine after that [^4]. [The issue seems
unresolved](https://forums.aws.amazon.com/thread.jspa?messageID=802461&#802461)
as of this post.

Lastly, I needed to create a form on my website for readers to sign up for the
mailing list. Sendy provides the HTML in the UI to create the form, which I
[tweaked a
little](https://github.com/thallada/thallada.github.io/blob/master/_includes/mail-form.html)
and placed in a [Jekyll includes template
partial](https://jekyllrb.com/docs/includes/) that I could include on both the
post layout and the blog index template. I refuse to pollute the internet with
yet another annoying email newsletter form that pops up while you are trying to
read the article, so you can find my current version at the bottom of this
article where it belongs [^5].

All in all, setting up a mailing list this way wasn't too bad except for the part
where I spent way too much time fiddling with nginx configs. But, I always do
that, so I guess that's expected.

As for the content of the newsletter, I haven't figured out how to post the
entirety of a blog post into the HTML format of an email as soon as I commit a
new post yet. So, I think for now I will just manually create a new email
campaign in Sendy (from an email template) that will have a link to the new
post, and send that.

---

[^1]:
    It would be interesting to look into creating a [Google
    Form](https://www.google.com/forms/about/) that submits rows to a [Google
    Sheet](https://www.google.com/sheets/about/) and then triggering a [AWS
    Lambda](https://aws.amazon.com/lambda/) service that iterates over the rows
    using something like [the Google Sheets Python
    API](https://developers.google.com/sheets/api/quickstart/python) and sending
    an email for every user using the [Amazon SES
    API](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-api.html)
    ([python-amazon-ses-api](https://github.com/pankratiev/python-amazon-ses-api)
    might also be useful there).

[^2]:
    I ran into a hiccup [verifying this domain for Amazon
    SES](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domain-procedure.html)
    using the [Namecheap](https://www.namecheap.com/) advanced DNS settings
    because it only allowed me to set up one MX record, but I already had one
    for my root hallada.net domain that I needed. So, I moved to [Amazon's Route
    53](https://aws.amazon.com/route53/) instead [^3] which made setting up the
    [DKIM
    verification](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/easy-dkim.html)
    really easy since Amazon SES gave a button to create the necessary DNS
    records directly in my Route 53 account.

[^3]:
    As [Amazon continues its plan for world
    domination](https://www.washingtonpost.com/business/is-amazon-getting-too-big/2017/07/28/ff38b9ca-722e-11e7-9eac-d56bd5568db8_story.html)
    it appears I'm moving more and more of my personal infrastructure over to
    Amazon as well...

[^4]: Obviously a conspiracy by Google to force domination of Gmail.

[^5]: Yes, I really hate those pop-ups.
