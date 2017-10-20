---
layout: post
title:  "What is HPK Pinning And How Do I Deploy It?"
date:   2016-05-24 13:38:00 -0600
---

**What Is HPKP** HPKP (HTTP Public Key Pinning) is a HTTP header with a SHA256 hash encoded in base64. This trust model works on the client initially visiting the website and cache the keys for a server defined amount of time once that exchange has taken place it allows the client to verify the certificate the server sends via a quick hash and encode instead of doing a full chain lookup.

**How Do i Deploy HPKP?** Deploying HPKP is super simple for nginx. The first thing you need to do is find 2 PINS (SHA256 SUMs Base64 encoded) to use one PIN has to be from your certificate chain and another has to be a backup PIN from a cert not in the chain so for this example for the backup i'm using DigiCert High Assurance EV Root CA since it's not in my chain

Fist step go to [SSLLabs](https://www.ssllabs.com/ssltest/) scan your server. This will also generate the PIN that we can then copy
![ssllabs pin](https://cdn.frgl.pw/blog/10/1.png)
I highly suggest you copy both your CA and your ROOT PINs and not yours in case for some reason your certificate changes for some unforeseen reason! 

Once you have those open up your NGINX config and add this line into your ssl server config
```
add_header Public-Key-Pins 'pin-sha256="<CA Pin>"; pin-sha256="<Your Chain ROOT PIN>"; pin-sha256="<A Different ROOT Pin>"; max-age=5184000;';
```
And If you don't want to look for a different ROOT PIN here is DigiCert High Assurance EV Root CA's PIN
```
WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18=
```
Now Save and reload NGINX retest your site using SSLLabs you you see this
![hpkp done](https://cdn.frgl.pw/blog/10/2.png)
then you've successfully deployed HPKP!
