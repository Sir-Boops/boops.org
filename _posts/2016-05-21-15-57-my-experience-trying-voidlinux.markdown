---
layout: post
title:  "My Experience Trying VoidLinux"
date:   2016-05-21 15:57:00 -0600
---

The first thing i noticed when i went to download void is it's really small iso sizes small as in 600<= MB. Yes i know that sounds pretty large but that iso also holds a full desktop environment as in comparison the arch iso is 750~ MB and has no desktop environment! 

Another interesting bit i noticed on the download page is the RPI isos i don't know how good the performance is as i don't have a spare RPI2 laying around but when i do this is defiantly one of the distros i am going to try on it.

**The Install**

Installing void is as simple as Ubuntu you just type sudo void-install and it presents you with a list that as long as you know your keyboard type and where you are you will mostly be fine as you still have to partition the drives yourself and format them. While it does try to help you with a notice as open into those options i could still see this confusing a few people still kinda new to Linux or if they are jumping from a more hand holding distro to void.

**Post-Install**

Since i am trying void in a virtualbox VM the fist thing i went to do is install virtualbox guest addons this lead me to my first interaction the the package management system in void [XBPS](https://wiki.voidlinux.eu/XBPS) You'll need that link it's to the wiki. Not to say that XBPS is hard but is is different yet similar to pacman for example to install a package you type xbps-install -S <package name> and removing xbps-remove -R <package name> See? as i said not hard but it will throw you for a bit.

Keeping with the topic of Void's package repo XBPS is pretty cool from the fact that it uses [github](https://github.com/voidlinux/void-packages) to allow users to easily add packages to the XBPS repo. Now thats all cool but for a distro to be handy and plesent to use to want alot of packages availbal so you don't have to build much. Now there is no easy way to judge is but i usually base it off how hard it is to install Steam, Wine, Atom, Java, Virtualbox and some others xbps in this regard steam was a trip to the wiki and enabling some non free 32 bit libs atom was just an install but only wine 32 bit no 64 bit sadly so overall it seems pretty good.

**Final Thoughts**

Void Linux while i do need to use it some more and try it on the RPI it seems like a really good middle ground distro. Middle ground meaning you're a newer user that's only been using Ubuntu and arch Linux is to big of a jump but still want a little more of a challenge during the install. Void also has the upside of being a rolling release so no worry about updating to a new release and having to reinstall. The last few upsides about void are that it's not a fork of any other distro and no systemd that last one might be pretty subjective but it's still a solid plus one from me.

If you have any questions, comments or anything feel free to [email me](mailto:admin@boops.me)
