---
layout: post
title:  "My Attempts At Installing Gentoo"
date:   2016-05-18 09:26:00 -0600
---

Having Recently gotten a stable Arch setup and feeling confident in myself i tried to install gentoo. My first attempt went pretty wrong and i found my poor VM completely unbootable the reason for this? i didn't i didn't flag the boot partition as bootable on my drive.

OK now i know. So on my second attempt went quite a bit better and i was able to chroot into the new install so back to the wiki on what todo so i download and install portage then i started to install/compile my profile everything seemed to be going good until about 2/3~ of the way through the live USB i had the minimal install on got bumped and unpluged..That caused that attempt to freeze up and caused my to give up for the day.

Now on my third attempt as i write this i'm recompiling the kernel on my laptop with genkernel in fact it just finished but on this install i was able to setup the disks chroot into gentoo, setup portage and select but my memory failed me at this point so i jumped back to the wiki was able to compile plasma on gentoo 13 and compile the kernel i reboot excitedly to see if it works and nope kernel panic unable to mount root and this is where i'm stuck..i guess i'll try again in a VM so i can have a cleaner environment to work with.

I'll Update This With My Next Attempt When i try again

**UPDATE**

![screnfetch](https://cdn.frgl.pw/blog/5/1.png)

I was right it is just an issue with the laptop i was trying on so now that i know i'm going on the right track with installing gentoo so now to have some fun trying to find out what is causing the boot to fail on the laptop! 

So back to trying to figure this out i'll update you huys again when i have anything new! <3
