---
layout: post
title:  "How to host your own NTP server"
date:   2016-09-19 13:37:00 -0600
---

Ahhh time, that concept that you will ether have too much or too little of depending on your mood. But how do computers know what time it is as it can't just lookup at the sky and guess. No most devices use NTP ( Network Time Protocol ) to get and stay up to date with the current time. NTP is a very simple, light protocol as each packet is only 64 Bits in size this allows you to have your own local NTP server in your house even with a terrible connection! So with all this being said why should you host your own local NTP server? A few reasons. One if you broadcast its existence to your clients using DHCP it can help keep all your devices in perfect time sync so you don't have to keep setting the clocks manually on devices! Two it helps ever so slightly reduce network traffic, as if you have 8 clients all syncing to the outside world while it still most likely won't be noticeable to you but it does help ease the load on the larger public NTP servers. Finally it's fun.

Now that we have all that out of the way lets get started setting up the server!

* We need to install the package ```openntpd``` How you do this varies from Distro to Distro. An example command to install this however would be ```apt-get install openntpd``` if you're running Debian.

* Once OpenNTPd is installed we have to edit the ntpd config file located at ```/etc/ntpd.conf``` Note here be sure to backup ```cp /etc/ntpd.conf /etc/ntpd.conf.bak``` The ntpd file before continuing from here! Now that you've backed up your old config open the original config file and delete everything inside. With the now empty file add the following lines then save and exit the text editor
```
listen on *

servers 0.pool.ntp.org
servers 1.pool.ntp.org
servers 2.pool.ntp.org
servers 3.pool.ntp.org
```
* That's it you can now start OpenNTPd and start it with ```systemctl start openntpd``` or if you, like me like to watch it work you can open a new screen and run the command ```openntpd -d``` You will then see it start to listen on all interfaces and try to sync to all the public NTP servers!

That wasn't too hard was it? now the next steps are to go around and point all your devices at your shiny new NTP server or if you just want it to work on everything by default you will want to look into how to tell clients about it via DHCP.

Thanks for reading! if you have any issues, questions or anything else please feel free to contact me via [Email](mailto:blog@boops.me) or [Twitter](https://twitter.com/Sir_Boops)!
