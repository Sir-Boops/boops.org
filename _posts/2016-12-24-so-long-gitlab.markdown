---
layout: post
title:  "So long Gitlab!"
date:   2016-12-24 07:57:00 -0600
---
Ah Gitlab, You're so pretty but have many, many faults. Top three being: Backups are very flaky, The application itself it very resource hungry and takes quite a long time to start, Finally a self hosted 11 repo limit? Jumping into a more detailed look of each of the reasons, For backups I've tried them twice the first time was using an older Gitlab version and trying to restore on a newer version. This can be semi-excused as version jumps can be hard to restore from. The second time though it was wasn't changing versions and this one managed to destroy the install so perfectly that that install never worked again, Only spitting out 50X HTTP errors no matter what was done to it. Gitlab once it is started is not to resource hungry but starting Gitlab or updating Gitlab would take minutes to start to several minutes to update and 2.5~GB of RAM to do so. This final reason might have been an issue with my install as i can't seem to find any specific info about it anywhere but after creating eleven projects Gitlab notified me that i have reached my project limit and would be unable to create any more. At first i thought it was going to be something as simple as raising the project limit for admins but after searching for roughly an hour and unable to find any documentation on that specific issue i finally caved and turned to GOGS.

By contrast GOGS seems to have a dead simple backup system DB dump plus taring a folder being all that is needed, It is amazingly light starting it only a few seconds and updating as fast as you are able to clone the repo. And no project limits you cannot change! Now my option may change after using GOGS for a while as it does with almost any peice of software but so far the only downside i can see is this switch is i find Gitlab looks slightly better then GOGS!

Links:

* [Gitlab](https://about.gitlab.com/)
* [GOGS](https://gogs.io/)

Thanks for reading! if you have any issues, questions or anything else please feel free to contact me via [Email](mailto:admin@boops.me) Using [GNUPG](https://frgl.pw/keys/Sir_Boops.txt) if you wish. Or via [Twitter](https://twitter.com/Sir_Boops), [Mastodon](https://mastodon.social/users/Sir_Boops)!
