---
layout: post
title:  "How To Setup DNSSEC And DANE"
date:   2016-05-21 17:19:00 -0600
---

![dnssec](https://cdn.frgl.pw/blog/7/1.png)
Image generated via [dnsviz](http://dnsviz.net/)

**DNSSEC & DANE** Those two very handy protocols that sadly are very rarely used among websites. In fact none of the top 10 websites off [Alexa](http://www.alexa.com/topsites) have DNSSEC enabled this also means by extension they lack DANE support. Now lets take a look into why you should use DNSSEC & DANE (Side note if you only want to see how to set it up scroll down a bit)

Now What is DNSSEC? DNSSEC is an extension for DNS that allows validation of DNS records for reslovers just to make sure this is clear DNSSEC only helps validate to make sure that the records are legitimate it does not help with privacy. This is especially helpful for a user that uses a vulnerable network my  people of validate  now knowing that how does DNSSEC help validate records? Ok to answer that i'm going to start with this basics of DNS say you wanted to lookup boops.me that DNS lookup goes as such
```
.                       3600000 IN      NS      A.ROOT-SERVERS.NET.
Received 797 bytes from ::1#53(::1) in 1 ms
```
This is a heavily pruned response but it shows where every DNS query starts. Your resolver. Any DNS resolver will have the IPs and domain names to every root server from this point the reslover will choose a root server and ask it if it knows the IP to boops.me it won't but the root server will know the IPs to the name servers of the .me domain so it will answer with that.
```
me.                     172800  IN      NS      ns.nic.me.
Received 766 bytes from 2001:500:1::53#53(A.ROOT-SERVERS.NET) in 169 ms
```
Now the resolver will ask the .me domain for the IP to boops.me it won't know but it does know about boops.me and tells the resolver that
```
boops.me.               86400   IN      NS      ns1.frgl.pw.
Received 308 bytes from 2001:500:26::1#53(ns.nic.me) in 104 ms
```
Now rinse and repeat the last step and bam!
```
boops.me.               300     IN      AAAA    2607:5300:100:200::704
Received 361 bytes from 2607:5300:100:200::14fb#53(ns1.frgl.pw) in 169 ms
```
Yay finally a server knows the ip to boops.me! Now that we understand how basic DNS works we can look at how DNSSEC adds on to this process to help and secure it. Ok to now under stand DNSSEC we have to go back to the resolver as in it's memory is the public key for the root servers KSK.

This now allows us to validate the root servers ZSK DNSKEY. the reslover can do this by requesting all the DNSKEYs the server has and combining them in to a single RRSET, using the RRSIG that was generated with the signing of the RRSET using the private KSK,and the public KSK the resolver can then calculate if the DNSKEY records have been tempered with while they where in transit or if the DNS server that the resolver is on has been positioned.

Now that we can verify that the records root has are in fact the correct records we can finally start to move towards a tld. stil going along the line of trying to resolve .me we need the NS records of the .me name severs so we ask root and get them but along with these records we will also get a RRSIG record that to allow use to verify these records. Now verifying these records is just like above we take all the .me NS records combine them into a RRSET record and validate them using roots public ZSK now instead of KSK that's it we now that the NS records that we recived from root are trust worthy so we can follow them knowing we are going where we intend to.

Now we are talking to the .me servers validation here happens the same way as it does above the only difference being how the public KSK is validated since as you can probably guess it just wont not be feasible to have everyone hold every public KSK key. No, Every public KSK is validated by checking in the nameserver above for a hashed version of the public KSK in the form of a DS record.

Using that chain of signing logic a super tl;dr version of DNSSEC is "I trust this root server because it's DNSKEY RRSIG record can be verifyed using the public KSK for root i have stored locally. Then i can trust roots records because the RRSIG for the record can be validated by the ZSK that i already validated. Now i can trust this tld because the hash i calculated from its public KSK key is also in the root server and i can trust that from the fact that its ZSK RRSIG can be verified agenst a local copy of roots public KSK" and this chain keeps going until you get to the resource that you originally requested all verified by a string on your drive.

Now onto DANE (DNS-based Authentication of Named Entities) this is alot simpler then DNSSEC but DANE depends on DNSSEC to be worth anything. DANE as the name says, it authenticates named entities. Looking into it deeper it stores one or several TLSA record(s) on your server that contain the hash of your servers SSL certificate.
```
_443._tcp.boops.me. IN TLSA 3 1 1 21f0b1db6e60e5b401dfef53555829139d8e82b7193aa88a16e8211fb8aae6f7
```
This allows the client to validate a SSL certificate though DNS instead of forcing you to go through a certificate authority. This also highlights why DANE needs DNSSEC to be active on a domain for it to be worth anything because if you where to leave your domain without DNSSEC what's stopping an attacker from posing that record to?

------

**How To Setup DNSSEC And DANE**

Ok before we start this i am assuming that you already are running your own bind DNS servers if you're not stop here set those up then come back.

Welcome back or good job for learning and setting you your own DNS servers before hand!

Now for the setting up of DNSSEC first we have to install bind9 and haveged or if you're on debain copy pasta this line
```
apt-get update && apt-get install bind9 haveged
```

Once those have been installed we need to generate some KSK and ZSK key pairs to do this we run these two commands
```
dnssec-keygen -f KSK -a NSEC3RSASHA1 -b 4096 -n ZONE <your domain name>
```
```
dnssec-keygen -a NSEC3RSASHA1 -b 2048 -n ZONE <your domain name>
```

Once you have generated those keys all that's lets todo is add this line to your current DNS config
```
$INCLUDE /path/to/your/ksk_public.key
$INCLUDE /path/to/your/zsk_public.key
```
Now sign the zone using this command
```
dnssec-signzone -A -3 $(head -c 1000 /dev/random | sha256sum | cut -b 1-16) -N INCREMENT -o <domain name> -t /path/to/you/dns.db
```

Now in your named.conf.local you have to append .signed to your db file as such
```
/path/to/you/dns.db.signed
```

Now before you reload bind to activate your new DNSSEC db file you need to add a DS record to you domains TLD this is usually done via your domains control panel so finally you can cat a file called dsset-<you domain> this should have generated with your keys then this tests you copy pasta skills just copy the two lines (or your host will only take one use the lower key) once your done that reload bind and boom DNSSEC deployed!

If you have any questions, comments or anything feel free to [email me](mailto:admin@boops.me)
