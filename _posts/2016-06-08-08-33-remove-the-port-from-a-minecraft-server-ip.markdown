---
layout: post
title:  "Remove The Port From A Minecraft Server IP"
date:   2016-06-08 08:33:00 -0600
---

**DNS** It's an amazing thing that without the internet would be no where near what it has become today. But today we're going to focus on SRV and A Records as it's how we can define IPs and ports using DNS.

First a few definitions. We'll start with an A Record. An A record is one of the most used type of DNS record and is used to simply define an IPv4 address that's the "normal" type of IP address you'll currently see and example being 127.0.0.1.

Next up is the SRV record as it sounds a SRV record is a service record and is used to define a service on a network using priority's and weights to allow some basic load balancing. The SRV record combines with an A or AAAA record to allow you to define an IP and a port of a specific service.

-----

**Now** that we know all that you should kinda get the idea of what I'm going to show you since all we have to do is set an A record pointing to you're minecraft servers IP and then setup a minecraft SRV record to point to your A record!

Well before we start you'll need two things. A minecraft server and a domain. If you don't have a domain depending on what you want it might only cost 1$ USD/Year so if you don't have one yet since i will be using name.com since i know they work for this and i already have a domain with them.

Alright now that you have your domain we need to setup an A record pointing to your minecraft servers IP this is super simple simply pick a sub domain like mc.yourdomain.com and add you servers IP as so
![a record](https://cdn.frgl.pw/blog/16/1.png)

As of right now you should be able to connect to your server using mc.yourdomain.com:25566 (Where 25566 is your port number).

Now the SRV record this is slightly harder but still nice and easy only difference is  you now have 7 fields to fill in. For the service type we want "minecraft" for the protocol we want tcp for weight we want 10 for the port you'll want to put your servers port in there for the target you'll want to put your domain in there (The mc.yourdomain.com) in the TTL field we want 300 (seconds) and finally for the priority we want 10. at the end it should look like this:
![srv record](https://cdn.frgl.pw/blog/16/2.png)

Now if everything was done right you should be able to jump back into minecraft and use mc.yourdomain.com to connect to your server! now you can have a pretty domain for your server with out paying for port 25565! :)
