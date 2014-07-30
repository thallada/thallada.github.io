---
title: "Quick Command-line Search: search-pane"
layout: post
redirect_from: "/blog/search-pane/"
---

It's been a while since I last wrote, but I've still been busy. I began my
research position at the [MIT Media Lab](http://media.mit.edu) working with
[Fluid Interfaces](http://fluid.media.mit.edu). It feels like I'm designing the
future; I really couldn't ask for a better job right now. But, more on that
later.

I've still been continuously refining my workspace, and how I use my laptop. As
I mentioned in my [last blog post](/blog/w3m-reddit), I've been moving more and more towards the
command-line for day-to-day operations because of it's unparalleled level of
customizability and compatibility with other programs. There's nothing more
powerful than being able to whip up a small python or bash script that interacts
with a couple of other programs to achieve something instantly that optimizes my
work flow.

I use the [Awesome](http://awesome.naquadah.org/) window manager, which works
great for tiling up terminal windows right up next to browser windows. However,
I also use [Byobu](http://byobu.co/) (which uses
[tmux](http://tmux.sourceforge.net) as a backend), practically a tiling window
manager for terminals. While working with a whole bunch of terminals, I've found
that I actually prefer using byobu panes over separate terminal windows under
awesome.

I'm pretty sure I clock in somewhere at three to five Google searches a minute
when really focused on a programming task, especially when I'm working with
something I'm unfamiliar with. Historically, I've done this by switching tags in
awesome to my web browser and then searching in the Google Chrome omni-bar. It
required me to leave the context of my code and then flip back and forth between
code and browser if I needed to reference anything.

My new-found love of w3m's compact nature led me to design the perfect search
program for my setup. I dubbed it the generic name: search-pane, and it does the
following:

* Very light-weight interface for inputing a search query that is fed directly
  to w3m in a Google search.
* Byobu/Tmux key bindings to open a new window for search that closes on quit.
* Byobu/Tmux bindings to open in a quick one-off vertical or horizontal pane.
* Search history. Just like the bash shell, press up to cycle through past
  searches.
* Global history. When a search is performed on one computer using search-pane,
  the search is added not only to that computer's history, but the history of
  any computer listed in the other-hosts config file. I'm often sshed into many
  different machines, so this feature was a big plus for me.
* Vim keybindings to open up the search for even quicker access.

This is how I got it setup (on any Ubuntu machine with sudo privileges):

Save the following python file in `/usr/bin/` as `search-pane` (no extension):

```python
#!/usr/bin/python
from subprocess import call, check_output
from threading import Thread
import os
import sys
import readline

home = os.path.expanduser("~")
histfile = os.path.join(home, ".search-pane/history")

# load history
readline.read_history_file(histfile)

os.system('cls' if os.name=='nt' else 'clear') # clear the terminal

url = ''
query = ''
if len(sys.argv) > 1:
    url = "http://google.com/search?q=" + '+'.join(sys.argv[1:]) # google url
    query = ' '.join(sys.argv[1:])
    readline.add_history(query) # add query to history buffer
else:
    try:
        query = raw_input('Search: ') # get user's search
        url = "http://google.com/search?q=" + '+'.join(query.split()) # google
    except KeyboardInterrupt:
        sys.exit(0)

readline.write_history_file(histfile) # write search to history file

def write_other_hosts():
    # write to history files on other registered hosts
    with open(os.devnull, 'w') as FNULL:
        with open(os.path.join(home, ".search-pane/other-hosts"), "r") as f:
            for line in f:
                line = line.strip().split()
                host = line[0]
                path = line[1]
                # make sure we don't write to local file again
                client_names = check_output(['hostname', '-A']).split()
                if (host.split('@')[-1] not in client_names):
                    call(['ssh', host, 'echo', '"' + query + '"', '>>', path],
                        stderr=FNULL)

# Spin off another thread for sshing so user doesn't have to wait for
# connection to complete before viewing w3m.
try:
    Thread(target=write_other_hosts).start()
except Exception, errtxt:
    print errtxt

call(['w3m', url]) # pass url off to w3m
```

Make the directory and file for search history:

```bash
mkdir ~/.search-pane
touch ~/.search-pane/history
```

Allow anyone to execute the python script (make it into a program):

```bash
chmod a+x /usr/bin/search-pane
```

To get quick access to the program from the command-line edit `~/.bashrc` to
add:

```bash
alias s='search-pane'
```

To add byobu key bindings edit `~/.byobu/keybindings.tmux` (or `/usr/share/byobu/keybindings/f-keys.tmux`):

    # thallada's keybindings:
    bind-key Enter new-window -n "search" "search-pane"
    bind-key - split-window -v -p 20 "search-pane"
    bind-key = split-window -h -p 30 "search-pane"

To add vim key bindings edit ~/.vimrc

    "Open google search in a tmux split beneath vim
    map <leader>g :silent !tmux split-window -v -p 20 "search-pane"<CR>

If you wish to add the functionality to other machines then follow the steps
above and, on every machine, add the other hosts and the paths to the
search-pane history files on each to the other-hosts file:

    vi ~/.search-pane/other-hosts

The syntax is:

    user@host /path/to/history

Host separated by path by a space.

So far it's been really useful, and since it doesn't screw up my focus as much
I'm searching more.

Also, wow python is a lot easier than bash for these sorts of things...
