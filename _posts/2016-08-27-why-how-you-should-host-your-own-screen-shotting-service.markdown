---
layout: post
title:  "Why & How You Should Host Your Own Screen Shotting Service"
date:   2016-08-27 05:18:00 -0600
---

A fast screen shotting service is really nice to have as it lets you capture something you don't feel like typing, as i do far to often. Even if you only want to capture something on your screen that you want to show off to your friends, the internet, who ever. Although while their are alot of good/ok screen shotting services out there, gyazo being the first to come to mind for me as it was the one i used. They have their share of problems. While I'm sure their are some out their that don't have these problems and even the ones I've used might have fixed them but the lack of an instant & permanent delete button is a big issue for me as if you upload and share something that has some personal info in it that's now just out there and you're unable to remove it. The other being the not so bad but expensive part of having to pay them if you want them to keep the image online for more the X amount of time, Charging you an arm and a leg for a simple and cheap service.

Setting up your own screen shotting service you can use and share with anyone else you'd like to is super simple and cheap as all you have to do is

1. Find A Cheap VPS with pretty good bandwidth and a decent amount of HDD space. Mine for example only costs me 15$ USD a year but it also handles other tasks as it is still a Linux box

2. Once you have your VPS running you only need to do two things on it setup a ssh key for your user account so you can quickly and securely login and install NGINX an example of the command to install NGINX is `apt-get install nginx` if you're using the Apt package manager.

3. Now that your box is setup running NGINX if you visit the IP address of it you should see "Welcome To NGINX on [Insert OS Name Here]" if you don't hop back on it and run `systemctl start nginx` to start NGINX. Once you see that page then head back to your PC that you wish to take screen shots with.

4. On your client PC you'll need two programs scrot (To take screen shots) and scp (To upload the screen shots to the server) now to make this part super simple I've written this script
```
filename=`scrot -s -z -e 'echo $f'`
date=`date +%B`-`date +%d`-`date +%Y`_`date +%H`-`date +%M`-`date +%S``date +%p`
mv ~/$filename /tmp/$filename
scp -C /tmp/$filename <user>@<VPS IP>:/var/www/html/$date.png
rm -rf /tmp/$filename
echo 'http://<VPS IP>/'$date'.png'

```
Now when ever you run the script you'll be able to choose part of the screen to take a shot of and then the image will be renamed, uploaded and deleted then a link to the image will be spit out to the image on your VPS!
