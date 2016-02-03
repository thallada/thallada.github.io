---
title: Midnight Desktop
layout: post
---

I tend to use Linux (Ubuntu) on my desktop late at night in a dark room. To
protect my eyes from the blinding light of my monitors I've tooled my desktop
environment over the course of a few months to be as dark as possible. It has
gotten complex enough that I thought it would be worth sharing now.

### dotfiles

Before I begin, I want to note that all the configuration for the setup I'm
describing is stored in a [dotfiles repo on my github
profile](https://github.com/thallada/dotfiles). If you would like to replicate
any of this setup, I would go there. Just note that I will probably be updating
the master branch fairly often, but the
[midnight](https://github.com/thallada/dotfiles/tree/midnight) branch will
always contain the setup described here.

### bspwm

Inspired by [/r/unixporn](http://www.reddit.com/r/unixporn), I decided to switch
from gnome to bspwm, a minimal tiling window manager that positions windows like
leaves on a binary tree.

I don't really use the tiling features that often, though. I often do most of my
work in the terminal and [tmux](http://tmux.sourceforge.net/) does the terminal
pane management. But, when I do open another application, it's nice that bspwm
forces it to use the maximum available space.

I also like how hackable the whole manager is. There is a terminal command
`bspc` that controls the entire desktop environment and a separate program
`sxhkd` (probably the hardest program name ever to remember) handles all of the
hotkeys for the environment. All of them are stored in a
[`sxhkdrc`](https://github.com/thallada/dotfiles/blob/master/sxhkd/.config/sxhkd/sxhkdrc)
under the home directory and it's super easy to add my own. The hotkeys make
this superior to gnome for me because I never have to touch my mouse to move
around the desktop.

### gnome and gtk

I still love some of the features from gnome. Especially the text hinting, which
is why I still run `gnome-settings-daemon` in my [bspwm startup
script](https://github.com/thallada/dotfiles/blob/master/bspwm/bin/bspwm-session).

To make gtk applications universally dark (and also to tune text hinting)
install the `gnome-tweak-tool`. There should be a "Global Dark Theme" setting
under the "Appearance" tab that can be enabled. I use the
[Numix](https://numixproject.org/) gtk theme which seems to behave fine with
this setting.

### Gnome Terminal

I've tried using a few other lighter-weight terminals like xterm, but I still
like the features of gnome-terminal more. I created a "bspwm" profile and set
the background to be transparent with opacity at about half-way on the slider.
My background, set in the [bspwm startup
script](https://github.com/thallada/dotfiles/blob/master/bspwm/bin/bspwm-session)
is a subtle [dark tiling pattern](http://subtlepatterns.com/dark-mosaic/) so
this effectively makes the background of the terminal dark.

In my
[sxhkdrc](https://github.com/thallada/dotfiles/blob/master/sxhkd/.config/sxhkd/sxhkdrc)
I can then map my hotkeys for starting a new terminal to the command
`gnome-terminal --window-with-profile=bspwm`.

### vim

Making vim dark is pretty easy. Just put this in the
[`.vimrc`](https://github.com/thallada/dotfiles/blob/master/vim/.vimrc):

~~~ vim
set background=dark
~~~

I use the colorscheme
[distinguished](https://github.com/Lokaltog/vim-distinguished) which is
installed by putting the `distinguished.vim` file under
[`~/.vim/colors/`](https://github.com/thallada/dotfiles/tree/master/vim/.vim/colors)
and adding this to the `.vimrc`:

~~~ vim
colorscheme distinguished
~~~

### tmux/byobu

I like the abstraction that [byobu](http://byobu.co/) puts ontop of tmux, so
that's what I use in the terminal. Colors can be configured by editing the
[`~/.byobu/color.tmux`](https://github.com/thallada/dotfiles/blob/master/byobu/.byobu/color.tmux)
file. This is what I have in mine:

    BYOBU_DARK="\#333333"
    BYOBU_LIGHT="\#EEEEEE"
    BYOBU_ACCENT="\#4D2100"
    BYOBU_HIGHLIGHT="\#303030"
    MONOCHROME=0

### evince

I tell my browser, firefox, to open pdfs in evince (aka. Document Viewer)
because evince can darken pdfs.

Select View > Invert Colors and then Edit > Save Current Settings as Default and
now most pdfs will be displayed as white text on black background.

### gimp

Gimp allows you to change themes easily. [Gimp GTK2 Photoshop CS6
Theme](http://gnome-look.org/content/show.php?content=160952) is my favorite
dark theme. Put that in `~/.gimp-2.8/themes/` (or whichever gimp version is
installed) and, in Gimp, change the theme at Edit > Preferences > Theme.

### Firefox

I had to hack firefox a lot to get it to be universally dark since the web
(unfortunately!) doesn't have a night mode switch. I'm using firefox instead of
chrome because firefox has better customization for doing something this
extreme.

#### Userstyles

Firefox has a really neat addon called
[Stylish](https://addons.mozilla.org/en-us/firefox/addon/stylish/) that allows
you to install and edit user CSS files to change the style of any website you
visit. A lot of popular websites have dark themes on
[userstyles.org](https://userstyles.org/), but the rest of the internet still
mostly has a white background by default.

Luckily there's a few global dark themes. [Midnight Surfing
Alternative](https://userstyles.org/styles/47391/midnight-surfing-alternative)
seemed to work the best for me.

However, since the theme is global, it overwrites the custom tailored dark
themes that I had installed for specific popular sites (listed below) making the
sites ugly. The Midnight Surfing Alternative theme can be edited through the
Stylish extension to exclude the websites that I already have dark themes for.
[This superuser question explains what to
edit](http://superuser.com/questions/463153/disable-stylish-on-certain-sites-in-firefox).
Now, whenever I add a new dark theme to Stylish, I edit the regex to add the
domains it covers to the parenthesized list that is delimited by pipes.

~~~ css
@-moz-document regexp("(https?|liberator|file)://(?!([^.]+\\.)?(maps\\.google\\.com|...other domains....)[/:]).*"){
~~~

Here is the list of dark themes I'm currently using with Stylish in addition to
Midnight Surfing Alternative:

* [Amazon Dark -
    VisualPlastik](https://userstyles.org/styles/52294/amazon-dark-visualplastik)
* [Dark Feedly
    (Hauschild's)](https://userstyles.org/styles/89622/dark-feedly-hauschild-s)
* [Dark Gmail mod by
    Karsonito](https://userstyles.org/styles/107544/dark-gmail-mod-by-karsonito)
    (this one is a bit buggy right now, though)
* [Dark Netflix
    [GRiMiNTENT]](https://userstyles.org/styles/102627/dark-netflix-grimintent)
* [dark-facebook 2 [a dark facebook
    theme]](https://userstyles.org/styles/95359/facebook-dark-facebook-2-a-dark-facebook-theme)
* [Forecast.io - hide
    map](https://userstyles.org/styles/104812/forecast-io-hide-map)
* [GitHub Dark](https://userstyles.org/styles/37035/github-dark) (this one is
    really well done, I love it)
* [Google Play (Music) Dark \*Updated
    5-15\*](https://userstyles.org/styles/107643/google-play-music-dark-updated-5-15)
* [Messenger.com Dark](https://userstyles.org/styles/112722/messenger-com-dark)
* [Telegram web dark / custom
    color](https://userstyles.org/styles/109612/telegram-web-dark-custom-color)
* [Youtube - Lights Out - A Dark Youtube
    Theme](https://userstyles.org/styles/92164/youtube-lights-out-a-dark-youtube-theme)

#### UI Themes

Most of my firefox UI is styled dark with the [FT
DeepDark](https://addons.mozilla.org/en-US/firefox/addon/ft-deepdark/) theme.

The firefox developer tools can be [themed dark in its
settings](http://soledadpenades.com/2014/11/20/using-the-firefox-developer-edition-dark-theme-with-nightly/).

#### Addons

For reddit, I use the [RES](http://redditenhancementsuite.com/) addon which has
a night mode option.

I also use [Custom New
Tab](https://addons.mozilla.org/en-US/firefox/addon/custom-new-tab/) combined
with [homepage.py](https://github.com/ok100/homepage.py) to display a list of my
favorite websites when I start a new tab.

[Vimperator](https://addons.mozilla.org/en-US/firefox/addon/vimperator/) allows
me to control firefox completely with my keyboard which is really useful when I
am switching back and forth between firefox and vim. By default, the vimperator
window has a white background, so I had to [set it to a dark
theme](https://github.com/vimpr/vimperator-colors). Also, in order to make all
of the vimperator help pages dark, I had to add the protocol `liberator://` to
the regex for Midnight Surfing Alternative (exact syntax for that above).

### Redshift

At night, it's also useful to filter out blue light to help with sleep.
[Redshift](http://jonls.dk/redshift/) is a utility that does this automatically
while running in the background.

![Midnight in action with redshift](/assets/midnight_screenshot_redshift.png)

### Invert it all!

I noticed that with the dark colors and my monitor brightness turned low, it was
hard to see the screen during the day because of glares. An easy solution to
this is to simply invert the colors on the output of the monitor into an instant
day theme.

I would have used the command `xcalib -a -i` but that would only work on one
monitor and I have two. Luckily, someone made a utility that would invert colors
on more than one monitor called
[xrandr-invert-colors](https://github.com/zoltanp/xrandr-invert-colors).

The only problem was that this utility seemed to interfere with redshift, so I
made [a script that would disable redshift before
inverting](https://github.com/thallada/dotfiles/blob/master/invert/bin/invert).

~~~ bash
#!/bin/bash
inverted=$(xcalib -a -p | head -c 1)
if [ "$inverted" == "W" ]
  then
    if [ -z "$(pgrep redshift)" ]
      then
        xrandr-invert-colors
        redshift &
    fi
  else
    if [ -z "$(pgrep redshift)" ]
      then
        xrandr-invert-colors
      else
        killall redshift
        sleep 3
        xrandr-invert-colors
    fi
fi
~~~


And, now I have [a
shortcut](https://github.com/thallada/dotfiles/commit/e5153a90fa7c89a0e2ca16e5943f0fa20d4a9512)
to invert the screen.

However, images and videos look pretty ugly inverted. VLC has a setting under
Tools > Effects and Filters > Video Effects > Colors called Negate colors that
can fix that.

For firefox, I made a global userstyle to invert images and videos.

~~~ css
@-moz-document regexp("(https?|liberator|file)://(?!([^.]+\\.)?[/:]).*"){
  img, video, div.html5-video-container, div.player-api, span.emoji, i.emoji, span.emoticon, object[type="application/x-shockwave-flash"], embed[type="application/x-shockwave-flash"] {
      filter: invert(100%);
    }
}
~~~

Whenever I invert the colors, I enable that global theme on firefox.

![Midnight inverted into a day theme](/assets/midnight_screenshot_inverted.png)
