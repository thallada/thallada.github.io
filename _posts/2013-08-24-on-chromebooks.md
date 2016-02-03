---
title: On Chromebooks
layout: post
redirect_from: "/blog/on-chromebooks/"
---

Like a lot of people, I didn’t see a clear use-case for Chromebooks. They’re
just glorified browsers, right? What if I wanted to do anything outside of the
browser?  Why would you spend [$1299 or $1449 for a
computer](https://www.google.com/intl/en/chrome/devices/chromebooks.html#pixel)
that can only run a browser?

While I know a lot of people who buy expensive MacBooks only to just use a web
browser and iTunes, I’m a bit more of a power user and I need things like
[Eclipse](http://www.eclipse.org/) (popular programming IDE) and
[Inkscape](http://inkscape.org/) (open source vector graphics editor). I
figured that if I’d ever get a Chromebook, I would quickly ditch its crippled
ChromeOS for [Ubuntu](http://www.ubuntu.com/) instead, so I could use my
favorite operating system on the quality Chromebook hardware. It turns out, a
lot of people do this. So many that there are a couple of Ubuntu forks that
have been developed that allow you to run both ChromeOS and Ubuntu on the same
Chromebook: [ChrUbuntu](http://chromeos-cr48.blogspot.fr/) and
[Crouton](https://github.com/dnschneid/crouton).

However, when I recently acquired a [Samsung
Chromebook](https://www.google.com/intl/en-US/chrome/devices/samsung-chromebook.html#ss-cb):
Google’s ARM processor Chromebook, I discovered what makes Chromebooks, and
even ChromeOS, so amazing. **I realized there is no need for anything more than
Chrome**. Even for a power user like me.

<a href="/img/blog/full_chromebook.jpg"><img
src="/img/blog/full_chromebook_thumb.jpg" alt="Samsung Chromebook open on a
porch"></a>

Before long, I had completely abandoned my old heavy [2011 Dell
Inspiron](http://www.cnet.com/laptops/dell-inspiron-n5110-15/4505-3121_7-35127205.html)
in favor of my Samsung Chromebook. While the Dell laptop clearly has more
computing power, I preferred the Chromebook for a few reasons:

* **Lightweight**: it’s only 2.4 pounds. That feels like nothing compared to
the 5.5 pound monstrosity that used to weigh down my backpack.
* **Battery life**: officially it’s 6.5 hours, but I’ve seen up to 9 hours
before. It’s very freeing to not need to plug in my laptop everywhere I go.
* **Size**: the screen is just 11.6” and it’s 0.7” thin. I honestly didn’t
think I’d prefer a smaller laptop, but the experience has been a lot better in
general.
* **Screen Resolution**: even though the screen is smaller, it’s still 1366x768
-- the same as my Dell laptop. Resolution is very important to me: higher
resolution means I can fit more information on the screen, and my young eyes
can handle the smaller text. Going back to my Dell feels like looking through a
magnifying glass now.
* **Trackpad**: I use an [Apple Magic
Trackpad](http://www.apple.com/magictrackpad/?) at work, which is heralded as
the best trackpad out there, and in my opinion the Samsung Chromebook has a
trackpad that’s just as nice. Don’t even get me started with how horrible the
Dell trackpad is; I had to disable it and use keyboard shortcuts for everything
instead.
* **Keyboard**: the Chromebook has a keyboard that closely resembles an Apple
keyboard, and it’s hard to describe exactly why, but the feedback just makes it
feel *nicer* to type on than the one on my Dell laptop. Also, the search key
that replaces the Caps Lock key is really useful.
* **Price**: all of this great hardware for just $249 seems unreal. I’m sure
this is what converts many people, and it’s good to know I can do everything I
need to on a laptop that’s under $300.
* **Perks**: as an aside, Google also gives you 100GB free Google Drive space
for 2 years and 12 free Gogo passes with the Chromebook, which definitely comes
in handy.

<a href="/img/blog/chromebook_keyboard.jpg"><img
src="/img/blog/chromebook_keyboard_thumb.jpg" alt="Samsung Chromebook
keyboard up close" class="half-left"></a> <a
href="/img/blog/chromebook_trackpad.jpg"><img
src="/img/blog/chromebook_trackpad_thumb.jpg" alt="Samsung Chromebook
trackpad up close" class="half-right"></a>

While that all of that is nice, the Chromebook still only has 16GB internal
storage, no DVD drive, no ethernet port, and hardly any processing power. And I
still need to be able to code and write on my laptop and access specific
programs that only run on Linux or Windows machines. ChromeOS has a lot of
things built in to get around these limitations, but some things require a bit
of tweaking. If anyone has read my past posts, they know that I am obsessed
with configuring things. Here is what I came up with for everything I would
ever need to do on my Chromebook:

### Writing

I spent a lot of time downloading
[various](https://chrome.google.com/webstore/detail/write-space/aimodnlfiikjjnmdchihablmkdeobhad)
[writing](https://chrome.google.com/webstore/detail/writer/pnengefjfhgcceajaepbjhanoojifmog)
[applications](https://chrome.google.com/webstore/detail/writebox/bbehjmjchoiaglkeboicbgkpfafcmhij)
from the Chrome Web Store, but nothing seemed to work as well and seemless as
the stock Google Drive documents application. You can’t beat automatic saving
to the cloud with the ability to collaborate simultaneously with other people.

In order to make the experience more immersive put Chrome into fullscreen and
hide the controls by clicking the “View” menu and then selecting “Full Screen”.
I’m currently in the Beta channel of ChromeOS, so you may need to switch to
that channel and enable “Immersive Mode” in `chrome://flags` to get it looking
like I have in the screenshot ([more
info](http://gigaom.com/2013/08/22/chrome-os-users-gain-immersive-mode-and-more-in-stable-channel-update/))

<a href="/img/blog/fullscreen_gdocs.png"><img
src="/img/blog/fullscreen_gdocs_thumb.png" alt="Demonstrating Google Docs in
fullscreen immersive mode"></a>

Another little-known feature of Google Docs is creating a new document based
off of a template. I made a couple templates that expand the page out to almost
100% and resemble the colors of the OSX IA Writer app: one in [Gentium
Basic](https://drive.google.com/previewtemplate?id=1N7kZhXsYJoVJpt4rE5q7Xhp92M4DPB_-u2dOSkEAeRY&mode=public)
and one in [Open
Sans](https://drive.google.com/previewtemplate?id=1aX8UcUXpbiZD1HuTIofb8ookw6TYykWi50k47BTX6yk&mode=public).
To create a new document based off of a template: have a document already open,
go to the “File” menu, “New…”, and select “From Template…”. It’s kind of a
hassle though, so I often just stick to the default style. It’s a sign that I
am procrastinating if I’m trying to look for the “perfect template” to write in
anyways.

### Programming

I’ve gotten so used to [vim](http://www.vim.org/) in a Linux
terminal that I don’t think I could ever use any other editor. There are a few
local offline code editors for Chrome like
[Text](https://chrome.google.com/webstore/detail/text/mmfbcljfglbokpmkimbfghdkjmjhdgbg)
and
[ShiftEdit](https://chrome.google.com/webstore/detail/shiftedit/lcgmndephhjcabhhjfcmncnhbmgbkpij)
which are nice if I’m working on a Chrome extension and want to keep the files
locally so I can test them on my Chromebook. However, I still do most of my
coding remotely on a Linux machine.

ChromeOS provides a way, out of the box, to ssh into any computer through it’s
terminal called “crosh”. Access crosh by typing Ctrl+Alt+T. But, I actually
prefer
[SecureShell](https://chrome.google.com/webstore/detail/secure-shell/pnhechapfaindjhompbnflcldabbghjo)
as an ssh client since it has more customization and can be opened up in a
separate window.

Don’t have a Linux computer to ssh into? [Digital
Ocean](https://www.digitalocean.com/) has servers starting at $5/month.
Cheapest and easiest offer I’ve seen yet (no that's not a referral link, I’m
being genuine about that).

For using Eclipse or any of those other Windows/Linux specific GUI programs
there’s [Chrome Remote
Desktop](https://chrome.google.com/webstore/detail/chrome-remote-desktop/gbchcmhmhahfdphkhkmpfmihenigjmpp)
which is installed by default on Chromebooks. I haven’t had the need to try it
out yet, but it’s nice to have around for when I do.

The best thing about coding on a Linux box through a Chromebook is that I still
have all of the great chrome apps and extensions right at my fingertips.
Especially when some apps can be opened up in small panels in the corner of the
screen temporarily.

### Panels

Chrome recently released a new concept for opening new windows
called “Panels”, and once I discovered them I couldn’t get enough of them. The
new feature allows apps and extensions to open up small chrome windows in the
bottom right corner of the screen and then draw the user’s attention when they
have a new notification.

They are absolutely perfect for long-running applications that need to stick
around but not be in your way, like chat programs and music programs. When I’m
fullscreen in some other chrome window, I can quickly click the panel’s icon
and the window will pop open above all of the other windows. I can then
interact with it and minimize it back into the dock out of my way.

<a href="/img/blog/chrome_panel.png"><img
src="/img/blog/chrome_panel_thumb.png" alt="Demonstrating chrome panels with
Panel View for Play Music open"></a>

In order to enable them I had to be on the Beta channel of the ChromeOS and
enable “Panels” in `chrome://flags` ([more
info](http://www.chromium.org/developers/design-documents/extensions/proposed-changes/apis-under-development/panels)).

Since panels is such a recent feature, it’s hard to find apps that are
utilizing panels. Here are some that I have found useful and are working for
me:

* [Panel View for Play
Music](https://chrome.google.com/webstore/detail/panel-view-for-play-music/dimpomefjdddhjmkjgjdokhidjkcmhhn)
* [Hangouts](https://chrome.google.com/webstore/detail/hangouts/nckgahadagoaajjgafhacjanaoiihapd)
* [Panel View for Google
Keep](https://chrome.google.com/webstore/detail/panel-view-for-keep/jccocffecajimkdjgfpjhlpiimcnadhb)
* [Google Tasks
Panel](https://chrome.google.com/webstore/detail/improved-google-tasks-pan/kgnappcencbgllhghhhgjnfjanfijdpn/)

I’m still lacking Facebook Messenger and Google Voice panel view apps, so I
might try my hand at creating one myself soon.

### Web Browsing

And, of course, being a laptop dedicated to chrome, it
obviously has a great web browsing experience. 

Pin certain websites or apps to the dash at the bottom of the screen for easy
access to favorite content. Once pinned, open them by pressing Alt+NUM, where
NUM is the icon’s position on the dash from the left.

The search key on the keyboard opens a panel from the bottom of the screen to
enter in a search. The results give preference towards apps in the Chrome Web
Store as well, so it’s sometimes more useful than the Omnibar Chrome users are
used to.

Tangentially, I have found [Gmail
Offline](https://chrome.google.com/webstore/detail/gmail-offline/ejidjjhkpiempkbhmpbfngldlkglhimk)
very useful for email. It has an uncluttered UI inspired by the Gmail mobile
app, and runs very smoothly.

Let me know if you have anything else to add, or even if you would like to
argue against why Chromebooks are the best laptops :).
