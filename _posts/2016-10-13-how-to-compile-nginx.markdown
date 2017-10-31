---
layout: post
title:  "How to compile NGINX"
date:   2016-10-13 13:56:00 -0600
---
Building an application from source can be a very daunting especially if you've never had or wanted to but compiling some apps ( Or all if you use Gentoo! ) can be quite helpful as the pre-compiled binary's that come with your package manager might be widely out of date..Debian. This is when compiling is quite handy as you can quickly update from one version to the next with out having to wait or someone else to do it for you. Plus it also allows you to only add what you need to your running binary this means if you don't need a feature you don't have to waste RAM or CPU time on it!

So, with all that being said how do we compile NGINX. First step is to pick out the versions we want so I'm going to use NGINX v1.11.5 as it is the latest at the time of writing.

* Once we have the version picked out we need to download them this can be done as such
```
wget http://nginx.org/download/nginx-1.11.5.tar.gz
```

* Now that we have them downloaded we need to De-compress them since it is a tar files we can use tar for this like so
```
tar -xvaf nginx-1.11.5.tar.gz
```

* Now that we have our two source code directories we will want to cd into the NGINX directory
```
cd nginx-1.11.5
```

* Ok we are almost ready to configure the build! the last thing we need to do is install the needed libraries. If you're running a Debian based OS ( Like Ubuntu ) you should just be able to copy and paste the command below else you will have to manually find the equivalent libraries on your distro
```
apt-get install gcc g++ libpcre3-dev zlib1g-dev make libssl-dev
``` 

* Watch out CPU here comes the compiler! now that we have everything we need lets see all the flags we can compile with using
```
./configure --help
```
* When you run that you should see a large list of flags if you do good everything is working, else try and search up the error as this should have worked if you've followed this to here. Around half way down the list you'll see some flags that add more options for your HTTP server, You can choose what ones you want except the `--with-http_ssl_module` as we need this one to flag the SSL module to be included in the final binary that we are going to use!

* You've chosen now have all the flags you want like if you want to add HTTP/2 you can add the flag `--with-http_v2_module`. Or you just want a super simple NGINX server that also works! In that case we want to configure using the flags
```
./configure --prefix=/etc/nginx --with-http_ssl_module
```

* Or if you want to add more features like the HTTP/2 example just add it to the end of this command like so
```
./configure --prefix=/etc/nginx --with-http_ssl_module --with-http_v2_module
```

* As you might be able to guess these configure commands can get quite long. Now before we compile NGINX you'll notice in the two commands above their is a flag called prefix, This flag defines where this copy of NGINX is going to be installed to so if you run with the above command all the NGINX components will be installed into the directory /etc/nginx. You can change this and point it where ever you want but i recommend leaving it pointed at /etc/nginx

* Now that NGINX is configured we want to run the command `make` this will compile all the code and create the NGINX binary for us to run. This can take a bit depending on how much RAM and how powerful your CPU is.

* Once your done compiling without any errors you're ready to install NGINX to the directory we defined earlier simply run `make install` and that's it you've just compiled NGINX to start it simplly cd into the nginx folder and run `./sbin/nginx` now when you open that boxes IP address in a web browser you should see welcome to NGINX!

* One final note for you guys if you inside the nginx folder the NGINX config is located at `conf/nginx.conf` and to stop the server run `./sbin.nginx -s stop`

Thanks for reading! if you have any issues, questions or anything else please feel free to contact me via [Email](mailto:blog@boops.me) If you wish with my GPG key [Here](https://frgl.pw/keys/Sir_Boops.txt) or [Twitter](https://twitter.com/Sir_Boops)!
