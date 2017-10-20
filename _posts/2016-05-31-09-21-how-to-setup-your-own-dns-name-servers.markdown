---
layout: post
title:  "How to setup your own DNS name servers"
date:   2016-05-31 09:21:00 -0600
---

**FIRST** Before you go any further please be aware that hosting your own DNS servers can be expensive and come with risks the cost coming from the fact that good practice and some TLDs say that you should have minimum three name servers in three geographically different locations around earth and those servers should have at minimum 99.9999% up time any less and you're allowing the chance that your clients will see a broken website or no website at all!
As for the risks involved these come from people attacking your name servers but seeing as all the current known bind9 attacks as of the writing of this just allow an attacker to DOS your name server to take it offline but this can still cause serious issues with your clients in the form of your service to appear "offline" until you migrate the attack or the attack stops. Did i scare you off yet? No? Well in that case lets look at the up sides to hosting your own name servers one big one if you're coming from AWS or any non-IPv6 name server provider is of course IPv6 now some of you won't care about that but you should however we can save that for another post. The second big upside is DNSSEC which you can read my post on that [here](https://boops.me/how-to-setup-dnssec-and-dane/) but a TL;DR on that post is you should use DNSSEC to allow end users to ensure that the record they looked up and received is the proper record and not some modified record that an attacker or repressive government put in place of your record. And the final big up side to hosting your own name servers is learning because even if you don't fully set them up or only set them up on a basic level you this will help you learn alot about how DNS works and what types of records their are.

----------
**Now** On to what you came here for the setup

The first things you will need are three Linux boxes to use if they are just running bind9 as they should be you don't need anything powerful so any box even down to 256 MB of ram 10GB SSD and a newer processor will work just fine for this BUT remember you will need at minimum two of these boxes and depending on your TLD you might even need three now they don't have to be geographically spread out but i highly recommend it.

Now login to all three boxes and make sure they are up to date since i am going to be using Ubuntu 16.04 for this guide that command for me would be
```
apt-get update && apt-get dist-upgrade
```
This will fully update your system and make sure you do this often on all your name servers to help keep them secure.

Next up we need to install bind so on all three paste this command
```
apt-get install bind9
```

Now we have to choose a master node for our name servers i would suggest using your NS1 server to use as the master but that choice is all up to you but for this guide i will be using NS1 as the master and NS2 & NS3 as the slaves.

So on our NS1 server now that bind9 is installed we should cd in to /etc/bind/ and edit the named.conf.options to look like this
```
options {
        directory "/var/cache/bind";

        dnssec-enable yes;
        dnssec-validation yes;
        dnssec-lookaside auto;

        max-udp-size 512;
        querylog yes;
        version "No.";

        recursion no;
        allow-transfer { none; };
        auth-nxdomain no;

        listen-on-v6 { any; };
        listen-on { any; };
};

```
This config will allow our master server to serve requests for domains it knows but will not try to lookup domains it does not know.

Now we need to setup the file that will hold all the records you can place this file where ever you wish but remember where you place it because you will call on it in that next step! So the records file is all the information that your domain holds in this file we need the normal A, AAAA, MX, NS records but before we start adding those we need to add the SOA.
```
$TTL    604800
@       IN      SOA     <Inital name server domain>. <email for the domain> (
                     2016040330         ; Serial
                           1200         ; Refresh
                            120         ; Retry
                        1209600         ; Expire
                          86400 )       ; Negative Cache TTL
;

```
An example for initial name server domain is "ns1.frgl.pw." not including the "" but including the . at the end THIS IS VERY IMPORTANT! and an example for a domain email is "admin.frgl.pw." without the "" again keeping the ending . The one line you will have to edit EVERY time you make any changes to your domain is the Serial number. Now by convention it should by YYYYMMDDXX X being a random number but the serial number can be any number you want less then or equal to ten numbers long.

Once you've edited your SOA you need to add some records! the first ones you should add are your NS (Name Server) records these define what name servers revolvers should use to resolve your domain
```
; Name Servers
<Your TLD>.     300        IN      NS      ns1.<Your TLD>.
<Your TLD>.     300        IN      NS      ns2.<Your TLD>.
<Your TLD>.     300        IN      NS      ns3.<Your TLD>.

```
The "; Name Servers" At the top is only there to help you keep some order in your domain file. Now you might be thinking wait how do i get the IP of the name server if i only gave it domains to follow this is where we start to have some fun! But before we start we have a few more lines to add to the TLD file
```
; A & AAAA NS Records
ns1.<Your TLD>.    300     IN      A       <IPv4 Address For NS1>
ns1.<Your TLD>.    300     IN      AAAA    <IPv6 Address For NS1>
ns2.<Your TLD>.    300     IN      A       <IPv4 Address For NS2>
ns2.<Your TLD>.    300     IN      AAAA    <IPv6 Address For NS2>
ns3.<Your TLD>.    300     IN      A       <IPv4 Address For NS3>
ns3.<Your TLD>.    300     IN      AAAA    <IPv6 Address For NS3>

```
Once you have added those we need to head to you domain's registar website to register some name servers!

I'm unsure where this will be hiding in your domains panel but if you dig around you should find a page that will have options like such
![ns reg](https://cdn.frgl.pw/blog/13/1.png)
This allows your TLD to add glue records to your name servers IPs so that when a resolver starts looking for your name servers IPs your TLD will answer that request so the resolver can make it to your name servers!

Now back on NS1 we need to edit named.conf.local and add the following line
```
zone "<Your domain>" {
    type master;
    file "/path/to/domain/file";
    allow-transfer {  };
};

```
As you might have guessed this tells this specific bind server that it is the master for this domain and since it is the master we need to tell the slaves to come to it to check for updates to the domain file.

As you also might have guessed in the the allow-transfer { }; you have to add the slaves IPs in this field as such
```
 allow-transfer { <NS-IPv4>; <NS-IPv6>; };
```

Now how we do this is quite simple we hop over to NS2 for example and edit the named.conf.options to look the exact same as the master and we edit the named.conf.local to look like such
```
zone "<Your Domain>" {
    type slave;
    masters { <NS1 IPv4>; <NS1 IPv6>; };
};

```
Then we save and close that on NS2 and NS3 start bind on both of them then head back to the master server to add an A record

Back on NS1 we need to edit the domain file again and add an A or AAAA record for your web server to do this go to the bottom of the file and add this
```
; A & AAAA Normal Records
<Your Domain>.        300     IN      A       <IPv4 Address>
<Your Domain>.        300     IN      AAAA    <IPv6 Address>
```
Remember that dot and remember to plus one to your serial number in your SOA other wise your changes wont get pushed to the slaves!

Now that you saved that start bind on your master this should automatically push the domain file to all your slaves!

Now finally test it out if your using Linux as your desktop simply type
```
dig <Your domain> A +trace
```
And if you're on Windows use
```
nslookup <Your Domain>
```
And you should see it go to the root down to your TLD then off to you! Once it's done that Congrats you have now setup your own DNS name servers!


If you have any questions, comments or anything feel free to [email me](mailto:admin@boops.me)
