---
layout: post
title:  "What's The Difference Between 127.0.0.1/[::1] And Localhost?"
date:   2016-09-08 14:39:00 -0600
---

Let's Start Simple. Localhost is a DNS name just like like ```boops.me``` This is why you can run an IPv6 App or An IPv4 app on you machine and still connect though localhost instead of having to type 127.0.0.1 or [::1].

Now with big difference out of the way we can look into a questions that stems from the initial question and that is would it be slower to connect though localhost vs direct IP? Now if you know the inner workings of your PC you already know the answer to this but the numbers are kinda interesting none the less. Lets start with pinging the localhost name over V6 and V4 using time and ping(6) it takes 6 MS to send a 64 Byte packet where as ping6 only took 4 MS to send the same packet. Cool, These results are exactly as you'd expect them to be as modern machines always try for AAAA records before the normal A record and as those results show. Now for the direct IP pings and their times are....Both 1 MS so most likely it's even less then that but as the timer is was using only goes down to 1 MS that is the result.

So what can we get from this? tl;dr you should use a direct IP in extremely ping sensitive non DNS caching applications but beyond that use case it's not possible to tell the difference.

Thanks for reading! if you have any issues, questions or anything else please feel free to contact me via [Email](mailto:blog@boops.me) or [Twitter](https://twitter.com/Sir_Boops)!
