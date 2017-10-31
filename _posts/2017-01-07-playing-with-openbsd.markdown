---
layout: post
title:  "Playing with OpenBSD"
date:   2017-01-07 10:13:00 -0600
---
I first heard of *BSD several months ago in an off hand comment about FreeNAS and since then I've tried FreeBSD, DragonFlyBSD and now OpenBSD and the first biggest lesson I've learned, As dumb as it sounds *BSD is not Linux. Duh right? Well saying it aloud makes it sound dumb but you have to remember that i initially thought that the only difference would be the kernel meaning i was thinking it would be along the lines of GNU/BSD. Yes i know now how dumb this all sounds but i write this in hopes of anyone else who wants to try *BSD knows that *BSD uses the BSD userland not the GNU userland and if you're unsure what i mean by userland give [this](https://en.wikipedia.org/wiki/User_space#Overview) a quick read and it should make some more sense.

Now my thoughts on OpenBSD after using it for only ~a week on two of my VMs. I like it. The default install is quite simple and speedy, Upgrades from version to version are nice the default included apps are quite useful to get yourself setup quickly. The man pages are very very helpful along with the website itself having everything you'll need to not only get setup but learn how to patch your systems kernel and teach you quite a bit more about how the system itself works! This all along with how well polished the whole system feels overall, This is a bit harder to explain so i urge you to try it out for yourself!

Now the downsides, Truthfully I've not come across many so far but the one slightly annoying was (and this could and most likely is me still not fully understanding OpenBSD) is the lack of EXT4 support as all the drives that i use for storage have where formatted using EXT4 so i ended up having to reformat them to use FFS. Beyond that my only other complaint is the lack of the ability to install java using `pkg_add`. Yes i know i can install it from ports but it would still be a nice touch to be able to install via pkg instead of compiling!

Links!
* [OpenBSD](http://www.openbsd.org/)

Thanks for reading! if you have any issues, questions or anything else please feel free to contact me via [Email](mailto:admin@boops.me) Using [GNUPG](https://frgl.pw/keys/Sir_Boops.txt) if you wish. Or via [Twitter](https://twitter.com/Sir_Boops), [Mastodon](https://mastodon.social/users/Sir_Boops)!
