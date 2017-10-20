---
layout: post
title:  "How To Get A Signed ECDSA / ECC Cert From Letsencrypt"
date:   2016-05-18 17:26:00 -0600
---

ECDSA or Elliptic Curve Digital Signature Algorithm allows is as the name implies a elliptic curve variant of DSA (Digital Signature Algorithm).

ECDSA is seen as better then for a few reasons but the big two are it's faster and as of the time of writing this it's more "secure". Ok now lets me explan that a little more.

"It's Faster" ECDSA uses smaller key sizes this allows it to be much faster at signing data. Well how much faster you ask? i ran some speed tests using openssl version 1.0.2h and this are the results
```
rsa 4096 bits sign/s=137.5 verify/s=8404.4
384 bit ecdsa (nistp384) sign/s=5024.9 verify/s=1257.7
```
What we can gather from this is holy crap the signs per sec that works out to 36.54472727272 repeating Dam.

"It's More Secure" this is based off the fact above "We are not very good at solving them yet" Where as RSA is based off factoring and we have gotten really good at that over the years that's why RSA key sizes have been growing for a long while now and is how ECDSA is more secure. Because of the fact that ECDSA curves are harder to crack we can from the get go we can use smaller keys to encrypt out data knowing that it would take the same or more effort to crack. [How much](https://www.keylength.com/en/compare/) depends on who you ask but a ECC With a key size of 384 is roughly equivalent to a RSA key size of 10000 (basing that off mental math but you can see for yourself via the link!)

-------------
**Now with all that said. To The how to!**

First step is to make sure you have openssl, nginx & letsencrypt installed. Once you have all that installed we need to make sure that your vesion of openssl will support secp384r1 to do this is super simple all you have todo is run the command
`openssl ecparam -list_curves | grep secp384r1`
and if it returns `secp384r1 : NIST/SECG curve over a 384 bit prime field` then congrats you're openssl supports secp384r1!

Step two this step is super simple all you have todo is generate a ECC key and the command to do that is `openssl ecparam -out <filename>.key -name secp384r1 -genkey` and done!

Step three now for a slightly harder part we have to add a subject alt name or SAN tag to the openssl config so we can call on it while generating out CSR. So use you're text editor of choice in my case nano and edit your openssl.cnf file adding to the very top of the file 
```
[SAN]
subjectAltName=DNS:<Your Domain>
```
your openssl.cnf should be located in `/etc/ssl/openssl.cnf` atleast if you're using Debian this might vary depending on what distro you're using.

Step four Ok! now we generate a CSR (Certificate Signing Request) this is another dead simple command just run `openssl req -new -key <key file name>.key -sha256 -nodes -outform der -reqexts SAN -subj '/C=<Contury>/ST=<Province or State>/L=<City>/O=<Organization Name>/OU=<Organizattional Unit>/CN=<Domain name>/emailAddress=<Your email>' >  <csr name>.csr` and if all goes well we now have everything we have everything we need to get a signed certificate!

Final Step the final simple command to run is `./certbot-auto certonly --standalone --csr <csr name>.csr` And boom! you should now have a few new files in the directory you where working in now you can add that to nginx like any normal certificate and key and allow ECDSA in your cipher list!

If you have any questions, comments or anything feel free to [email me](mailto:admin@boops.me)
