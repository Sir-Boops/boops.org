---
layout: post
title:  "Certbot/Letsencrypt Setup on a non-supported OS"
date:   2016-12-06 07:30:00 -0600
---
If your like me and prefer to use a different distro other then Ubuntu or CentOS for servers you might have also had this problem of ```Unable to bootstrap or your OS``` And the link that it spits out doesn't have much information at all. Now bootstrapping certbot is really quite easy and for this tutorial i'm going to be using Void but the process will be the same on any other unsupported distro.

* The first thing you need is the dependencies. For certbot this mostly means Python witch makes this super easy as on Void the command to install all the system dependencies is ```xbps-install -S git python python-virtualenv python-pip gcc gcc-c++ python-devel libressl-devel libffi-devel``` If you're using a different distro simple install the equivalent packages on your system and you're good to go!

* Certbot creates itself a virtual environment using the ```python-virtualenv``` package this helps make bootstrapping super easy as from here just clone the certbot repo ```git clone https://github.com/certbot/certbot``` Then ```cd``` into the newly cloned certbot directory and run the command ```./tools/venv.sh``` This will run a script that creates the virtual environment for certbot to run in and may take a while so i would suggest going to grab some more tea!

* Now that the virtualenv is has been created we can enter it with the command ```source venv/bin/activate``` You will now see a ```(venv)``` appear if you do congrats! You have just successfully bootstrapped certbot on a non supported OS!

* Using certbot from here is super simple as instead of running ```./certbot-auto``` like normal you only have to run ```certbot``` ! And finally to quit the virtualenv just type ```deactivate``` and it will drop you back into your normal terminal.

Thanks for reading! if you have any issues, questions or anything else please feel free to contact me via [Email](mailto:blog@boops.me) If you wish with my GPG key [Here](https://frgl.pw/keys/Sir_Boops.txt) or [Twitter](https://twitter.com/Sir_Boops)!
