---
layout: post
title:  "What Is OCSP Sampling and how do i enable it?"
date:   2016-05-27 14:42:00 -0600
---

**Online Certificate Status Protocol** Or OCSP is a protocol that is part of the SSL stack that allows a web server to include it's certificate status in the initial packet at the start of the SSL session. This is useful for one big reason it helps to speed up the SSL transaction time as the client does not have to initialize another connection to the CA to check the status of the certificate! Simple right?

**How To Enable OCSP Sampling**

This is super easy just ass this
```
ssl_stapling on;
ssl_stapling_verify on;
```
to you NGINX config SSL section and restart!
