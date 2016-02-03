---
title: How to Download a RTMP Video
layout: post
redirect_from: "/blog/how-download-rtmp-video/"
---

[RTMP or Real Time Messaging
Protocol](http://en.wikipedia.org/wiki/Real_Time_Messaging_Protocol) is a
protocol developed by Adobe to stream Flash videos. It's currently in use by
sites like the New York Times, ABC, NBC, Hulu, and so on. Since the video is
streamed to the user's Flash player (in their browser) bit-by-bit, the full
video file is never given to the user for them to keep. This is desirable to a
lot of media companies because then they can force you to watch through ads to
see their content and can charge you to download the full video.

However, [RTMPDump](http://rtmpdump.mplayerhq.hu/), an open-source tool
designed to intercept RTMP streams, can download the full video. 

Despite  numerous “How to use RTMPDump” tutorials and forum posts coming up
with a brief Google search, I've found a large portion of them are either
completely incorrect or are far too complicated since they are not using the
full toolkit that RTMPDump provides. Since it took me so long to find a decent
procedure for downloading a RTMP video, I thought it would be worth sharing
here.

Since this is questionably legal, make sure you understand any Terms of
Services you accepted or laws in your locality regarding this before you follow
the steps below ;).

###Have Linux###

Most of these instructions will assume you have Ubuntu, but
most distributions will work.

While RTMPDump works on a variety of operating systems, I've only researched
how to do this on Linux. Feel free to comment if you know how to do this in
Windows or OSX.

###Install RTMPDump###

This open source goodness can be found at
[http://rtmpdump.mplayerhq.hu/](http://rtmpdump.mplayerhq.hu/) or you can just
intall it using your Linux distro's package manager. For Ubuntu, that would be
typing the following into your terminal:

~~~ bash
sudo apt-get install rtmpdump
~~~

###Redirect ALL the RTMP!###

Now we need to configure your firewall to redirect
all RTMP traffic to a local port on your computer (Note: this will screw up any
RTMP streaming video you try to watch on your computer, so make sure you run
the undo command in one of the later steps to return things to normal). Type
the following into your terminal, there should be no output from the command:

~~~ bash
sudo iptables -t nat -A OUTPUT -p tcp --dport 1935 -j REDIRECT
~~~

###Run rtmpsrv###

When you install `rtmpdump`, a program called `rtmpsrv`
should have been bundled with it and installed as well. We will want to run
this now by entering the following command in a terminal:

    rtmpsrv

This should output something that looks like this:

    RTMP Server v2.4 (c) 2010 Andrej Stepanchuk, Howard Chu; license: GPL

    Streaming on rtmp://0.0.0.0:1935

###Feed rtmpsrv the Precious Video###

Now go to your browser and open/refresh
the page with the desired video. Try playing the video. If nothing happens and
it just continues to give you a black screen, then you're on the right track:
rtmpsrv has intercepted the video. 

If you look back at the terminal that's running rtmpsrv you should see that
some text was outputted. There is one line in this printout that we need; it
should be a command that starts with `rtmpdump`. Copy that entire command, we
will need it later. 

You can CTRL+C out of rtmpsrv now that we have what we need.

###Undo the Redirection###

You must undo the iptables redirection command we
performed earlier before you can do anything else, so run this in your
terminal:

~~~ bash
sudo iptables -t nat -D OUTPUT -p tcp --dport 1935 -j REDIRECT
~~~

###Finally, Download the Precious Video###

Now paste that command you copied
from the rtmpsrv output in the step before last into your terminal prompt and
hit enter. You should now see a torrent of `INFO` printout along with a
percentage as the video is being downloaded.

###Feast Eyes on Precious Video###

Once downloaded, the video file, which has a
`flv` extension and was named by the `-o` parameter in the command you copied
and pasted, should be in your current directory (`ls | grep flv` can find it as
well). Any video player should be able to play it, but vlc is a nice video
player for Ubuntu.

You're welcome.
