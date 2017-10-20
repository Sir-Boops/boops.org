---
layout: post
title:  "Switching From Bind9 to PowerDNS4"
date:   2016-07-21 14:27:00 -0600
---

Don't get me wrong their was and still is nothing wrong with bind it's fast, efficient and supports everything you could want out of a basic DNS server. Catch that? a basic DNS server and that is where my issue with bind comes from their *is* a mysql backend for bind floating out their some where on the internets but trying to find documentation or an official repository for it proved much to hard to find. This combining with the fact that i had to setup cron jobs to keep re signing the domains for DNSSEC set the stage nicely for for powerdns to come and sweep me up. My initial tests with it where quite lack luster as while i was trying to set it up before i found the official docs for powerdns and trust me for setting up a mysql backend you want those docs unless you feel like upping the log-level to 7 and trying to reverse engineer from that. Before you ask yes i did that to figure out how SRV records are stored in the database and also yes i feel quite dumb now.

 Back on track i found powerdns while searching how to setup bind with a mysql backend and after finally setting it up all i can say is wow DNSSEC is a dream with powerdns and i do mean that to the fullest extent as if you are to scroll back in this blog you will see a post on how to setup DNSSEC with bind and it's quite a long post where as with powerdns it's one command! All of that goes with out saying that it auto re signs the domains so once it's setup and running you never have to touch it again and to my surprise the MYSQL backend is quite efficient.

 So would i recommend you to start on powerdns? No simply because the features i'm drooling over in this article aren't useful to most people an amazing example of this is out of the top 50 websites on paypal has DNSSEC enabled where as a large majority have full or partial IPv6 support now comparing that with smaller sites like blogs for example how many have IPv6 at all despite the huge push on website owners to use IPv6. Now put that into terms for DNSSEC a tech that a majority haven't heard of built on a tech that most people touch once then never again! All that being said if you want the joy of knowing that you are on the cutting edge of DNS tech and the peace the comes with knowing it is now much harder to hijack your domain then yes use powerdns.

Have a question, concern or just want to tell me something? [email me!](mailto:blog@boops.me)
