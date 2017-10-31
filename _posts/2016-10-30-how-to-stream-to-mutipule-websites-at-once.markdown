---
layout: post
title:  "How to stream to multiple websites at once"
date:   2016-10-30 10:43:00 -0600
---
If you've ever streamed before or watched streams you'll know that you have many choices when it comes to streaming platforms and want to stream to multiple of them. The only thing holding you back if you suffer the same terrible luck as me is your limited slow upstream meaning you can only blast out to one at best. The way around this? a rebroadcasting box! It is exactly as it sounds a server that when you stream to it will automatically copy the stream and push it to any/all services you want. Including itself so you can have saved recordings of your stream online instead of having to re upload any one you wish to use.

* Before we start you should quickly read over how to compile NGINX [Here](https://boops.me/how-to-compile-nginx/), as it covers the basics of compiling NGINX such as needed libraries for compiling as those are of course required!

* So now that you've read over that why don't we quickly download and compile! First thing to do if of course download the latest stable version of NGINX and NGINX-RTMP ( A Plugin for NGINX ) to your box. Make sure you check what the current stable version of [NGINX](https://nginx.org/en/download.html) and [NGINX-RTMP](https://github.com/arut/nginx-rtmp-module/releases) are as when you are reading this they might be widely out of date! After that you'll want to download them like such below! 
```
wget https://nginx.org/download/nginx-1.10.2.tar.gz
wget https://github.com/arut/nginx-rtmp-module/archive/v1.1.10.tar.gz
```
 * Once have downloaded them we need to untar the downloaded. The `xvaf` flags on the command mean in order: eXtract, Verbose, Any & Force meaning this tar command will decompress almost any tar file!
```
tar -xvaf nginx-1.10.2.tar.gz
tar -xvaf v1.1.10.tar.gz
```

* Now we want to enter the nginx directory that we just extracted then compile with the extra addon in the folder above the directory we can do this simply by running the below commands. Like i said earlier you can add plenty more things into NGINX with configure flags but i will only be using the necessary ones as more features can be your quest to figure out!
```
cd nginx-1.10.2/
./configure --add-module=../nginx-rtmp-module-1.1.10/ --prefix=/etc/nginx --with-ipv6
``` 

* Now that NGINX is configured we want to compile and install. If you'd like to compile faster you can use the first command below else use the lower one as it will always work. Simply replace `<cpu cores +1>` with a number
```
make -j<cpu cores +1> && make install
make && make install
```

* Congrats NGINX with the addon NGINX-RTMP has been compiled and installed to the directory `/etc/nginx/` with the config file located in `/etc/nginx/conf/`. That is out next target as this is where the magic happens!

* We now want to enter the directory `/etc/nginx/conf/` and edit the nginx.conf file and edit it using what ever text editor you like or nano as it is quite easy. This can be done by running the nano command followed by what you want to edit example `nano nginx.conf`. Once inside if you plan to also use this server for a website scroll down to the bottom of the config and add the following lines. Replacing anything wrapped in `<>` with your strings 
```
rtmp {
 server {
 listen 1935;
 allow publish <your ip>;
 chunk_size 4096;
  application <some app name> {
  live on;
  record off;
  push rtmp://ingest-tor.beam.pro:1935/beam/<key>;
  push rtmp://live-jfk.twitch.tv/app/<key>;
  push rtmp://a.rtmp.youtube.com/live2/<key>
  push rtmp://live.hitbox.tv/push/<user name>?key=<key>;
 }
 application <some test app name> {
  live on;
  record off;
}

}
}
```

* Now in that config you'll notice that I've left some push commands for popular streaming services at the time of writing, If you don't wish to stream to any of these simply remove those lines. The keen eyed of you will see the line "allow publish" followed by your IP address. We use this to make sure that the restreamer will only allow you you stream from that IP blocking any other requests.

* Once you've filled those in save and exit nano using `CTRL + O` then `CTRL + X` and start NGINX by running the binary `./sbin/nginx` if you didn't see any errors that means it's working! Else make sure your application name does not have any spaces and each line ends with a `;`

* Now to test it using your streaming software of choice or for me OBS-Studio open up the settings window streams tab and set stream type to `custom streaming server` then fill in the `URL` and `Stream key` field as is done below. Once you've done that click `OK` then try and start streaming. You should then see your self start broadcasting as normal then when you check the services you are also streaming to you should see then all come online within 3~ Seconds. If they do enjoy! else if they don't and you can't figure out why see the last bit of text to how to ask for help!
![obs](https://cdn.frgl.pw/blog/43/1.png)
 
Thanks for reading! if you have any issues, questions or anything else please feel free to contact me via [Email](mailto:blog@boops.me) If you wish with my GPG key [Here](https://frgl.pw/keys/Sir_Boops.txt) or [Twitter](https://twitter.com/Sir_Boops)!
