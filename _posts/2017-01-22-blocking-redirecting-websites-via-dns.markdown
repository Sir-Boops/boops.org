---
layout: post
title:  "Blocking/Redirecting websites via DNS"
date:   2017-01-27 12:51:00 -0600
---
One of the simplest ways to block a website on you network is via DNS hijacking this allows you to return any response you wish in place of the actual request. Using this for dead simple and basic website blocking can be useful for many network setups in fact this is what [PI-Hole](https://github.com/pi-hole/pi-hole) uses to block ads for home networks. Now before we go any further remember this should not be used if you need to with 100% certainty block a website as if it's easy to create the block it's also just as easy to get around the block and getting around this block is as simple as changing your DNS server to another one!

Now with all that in mind let's see how to implement this on a network!

* The first thing you're going to need is a DNS reslover/forwarder running [Unbound](https://www.unbound.net/).

* Now onto blocking. if you want to simply block a website such as `google.com` you would add the following line **ABOVE** the forward zone and **WITH** the dot after the TLD
```
local-zone: "google.com." static
```
Boom! Google will no longer resolve on you network!


* Now lets say you wanted to redirect `google.com` to another page like a warning page or something or just a page that says NO on it. What ever the case it's just as simple as blocking the page!
```
local-zone: "google.com." static
local-data: "google.com. 300 IN A <Some IPv4>"
local-data: "google.com. 300 IN AAAA <Some IPv6>"
```

This will redirect the domain to the IP you set and from there you can do as you with to the domain!

Thanks for reading! if you have any issues, questions or anything else please feel free to contact me via [Email](mailto:admin@boops.me) Using [GNUPG](https://frgl.pw/keys/Sir_Boops.txt) if you wish. Or via [Twitter](https://twitter.com/Sir_Boops), [Mastodon](https://mastodon.social/users/Sir_Boops)!
