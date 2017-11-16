---
title: "Isso Comments"
layout: post
---

I've been meaning to add a commenting system to this blog for a while, but I
couldn't think of a good way to do it. I implemented my own commenting system on
my [old Django personal site](https://github.com/thallada/personalsite). While I
enjoyed working on it at the time, it was a lot of work, especially to fight the
spam. Now that my blog is hosted statically on Github's servers, I have no way
to host something dynamic like comments.

[Disqus](http://disqus.com/) seems to be the popular solution to this problem
for other people that host static blogs. The way it works is that you serve a
javascript client script on the static site you own. The script will make AJAX
requests to a separate server that Disqus owns to retrieve comments and post new
ones.

The price you pay for using Disqus, however, is that [they get to sell all of
the data that you and your commenters give
them](https://replyable.com/2017/03/disqus-is-your-data-worth-trading-for-convenience/).
That reason, plus the fact that I wanted something more DIY, meant this blog has
gone without comments for a few years.

Then I discovered [Isso](https://github.com/posativ/isso). Isso calls itself a
lightweight alternative to [Disqus](http://disqus.com/). Isso allows you to
install the server code on your own server so that the comment data never goes
to a third party. Also, it does not require logging into some social media
account just to comment. Today, I installed it on my personal AWS EC2 instance
and added the Isso javascript client script on this blog. So far, my experience
with it has been great and it performs exactly the way I expect.

I hit a few snags while installing it, however.

## Debian Package

There is a very handy [Debian package](https://github.com/jgraichen/debian-isso)
that someone has made for Isso. Since my server runs Ubuntu 16.04, and Ubuntu is
based off of Debian, this is a package I can install with my normal ubuntu
package manager utilities. There is no PPA to install since the package is in
the [main Ubuntu package archive](https://packages.ubuntu.com/xenial/isso). Just
run `sudo apt-get install isso`.

I got a bit confused after that point, though. There seems to be no
documentation I could find about how to actually configure and start the server
once you have installed it. This is what I did:

```bash
sudo cp /etc/default/isso /etc/isso.d/available/isso.cfg
sudo ln -s /etc/isso.d/available/isso.cfg /etc/isso.d/enabled/isso.cfg
```

Then you can edit `/etc/isso.d/available/isso.cfg` with your editor of choice to
[configure the Isso server for your
needs](https://posativ.org/isso/docs/configuration/server/). Make sure to set
the `host` variable to the URL for your static site.

Once you're done, you can run `sudo service isso restart` to reload the server
with the new configuration. `sudo service isso status` should report `Active
(running)`.

Right now, there should be a [gunicorn](http://gunicorn.org/) process running
the isso server. You can check that with `top` or running `ps aux | grep
gunicorn`, which should return something about "isso".

## Nginx Reverse Proxy

In order to map the URL "comments.hallada.net" to this new gunicorn server, I
need an [nginx reverse
proxy](https://www.nginx.com/resources/admin-guide/reverse-proxy/).

To do that, I made a new server block: `sudo vim
/etc/nginx/sites-available/isso` which I added:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name comments.hallada.net;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Script-Name /isso;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://localhost:8000;
    }
}
```

Then I enabled this new server block with:

```bash
sudo ln -s /etc/nginx/sites-available/isso /etc/nginx/sites-enabled/isso
sudo systemctl restart nginx
```

## DNS Configuration

I added a new A record for "comments.hallada.net" that pointed to my server's IP
address to the DNS configuration for my domain (which I recently switched to
[Amazon Route 53](https://aws.amazon.com/route53/)).

After the DNS caches had time to refresh, visiting `http://comments.hallada.net`
would hit the new `isso` nginx server block, which would then pass the request
on to the gunicorn process.

You can verify if nginx is getting the request by looking at
`/var/log/nginx/access.log`.

## Adding the Isso Script to my Jekyll Site

I created a file called `_includes/comments.html` with the contents that [the
Isso documentation](https://posativ.org/isso/docs/quickstart/#integration)
provides. Then, in my post template, I simply included that on the page where I
wanted the comments to go:

```html
{% include comments.html %}
```

Another thing that was not immediately obvious to me is that the value of the
`name` variable in the Isso server configuration is the URL path that you will
need to point the Isso JavaScript client to. For example, I chose `name = blog`,
so the `data-isso` attribute on the script tag needed to be
`http://comments.hallada.net/blog/`.

## The Uncaught ReferenceError

There's [an issue](https://github.com/posativ/isso/issues/318) with that Debian
package that causes a JavaScript error in the console when trying to load the
Isso script in the browser. I solved this by uploading the latest version of the
Isso `embeded.min.js` file to my server, which I put at
`/var/www/html/isso/embeded.min.js`. Then I modified the nginx server block to
serve that file when the path matches `/isso`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name comments.hallada.net;
    root /var/www/html;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Script-Name /isso;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://localhost:8000;
    }

    location /isso {
        try_files $uri $uri/ $uri.php?$args =404;
    }
}
```

Now requesting `http://comments.hallada.net/isso/embeded.min.js` would return
the newer script without the bug.

## Sending Emails Through Amazon Simple Email Service

I already set up [Amazon's SES](https://aws.amazon.com/ses/) in my [last
blog
post](http://www.hallada.net/2017/08/30/making-mailing-list-jekyll-blog-using-sendy.html).
To get Isso to use SES to send notifications about new comments, create a new
credential in the SES UI, and then set the `user` and `password` fields in the
`isso.cfg` to what get's generated for the IAM user. The SES page also has
information for what `host` and `port` to use. I used `security = starttls` and
`port = 587`. Make sure whatever email you use for `from` is a verified email in
SES. Also, don't forget to add your email as the `to` value.

## Enabling HTTPS with Let's Encrypt

[Let's Encrypt](https://letsencrypt.org/) allows you to get SSL certificates for
free! I had already installed the certbot/letsencrypt client before, so I just
ran this to generate a new certificate for my new sub-domain
"comments.hallada.net":

```bash
sudo letsencrypt certonly --nginx -d comments.hallada.net
```

Once that successfully completed, I added a new nginx server block for the https
version at `/etc/nginx/sites-available/isso-https`:

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name comments.hallada.net;
    root /var/www/html;

    ssl_certificate /etc/letsencrypt/live/comments.hallada.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/comments.hallada.net/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/comments.hallada.net/fullchain.pem;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Script-Name /isso;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://localhost:8000;
    }

    location /isso {
        try_files $uri $uri/ $uri.php?$args =404;
    }
}
```

And, I changed the old http server block so that it just permanently redirects
to the https version:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name comments.hallada.net;
    root /var/www/html;

    location / {
        return 301 https://comments.hallada.net$request_uri;
    }
}
```

Then I enabled the https version:

```bash
sudo ln -s /etc/nginx/sites-available/isso-https /etc/nginx/sites-enabled/isso-https
sudo systemctl restart nginx
```

I checked that I didn't get any errors visiting `https://comments.hallada.net/`,
and then changed my Jekyll include snippet so that it pointed at the `https`
site instead of `http`.

Now you can securely leave a comment if you want to yell at me for writing the
wrong thing!
