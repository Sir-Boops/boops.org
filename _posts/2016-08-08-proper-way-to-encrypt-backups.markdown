---
layout: post
title:  "Proper Way To Encrypt Backups"
date:   2016-08-09 16:30:00 -0600
---

Backups, You know those things you should have but most likely don't as you just haven't gotten around to it yet. Well today I'm hoping i can convince you to backup by showing you how easy it is to setup fully encrypted backups. Before you ask, yes you should encrypt your backups as your backups should be stored offsite as, If something where to happen at your location a locally saved backup won't save you. That also means you should encrypt all you backups as nothing you and you alone don't have 100% control over cannot be trusted as if the company you are using to store those backups has a glitch in their soft/hardware or someone at the company is unaware of is making unauthorized copies of your backups. In ether case the result is the same someone you did not intend to give access has a full copy of your backup!

Now with the reasons way you should encrypt your backups out of the way. Let's look at how we can do this

* The First Step is to generate a RSA Private Key. This will be used to create a public RSA key that we can put on any server to allow it to encrypt our files without endangering our private key! This is done simply via this command:
```
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out <private key file>
```
This may take a while depending on how powerful your CPU is but on any newer CPU this shouldn't take anymore then 1 minute.

* Once your private key has been generated you'll need to  extract the public key from it. This is nearly instant and super simple to do and the command to do so is
```
openssl rsa -in <private key file> -outform PEM -pubout -out <public key file>
``` 
At this point we are ready to go we can hand out our public key to anyone and they can encrypt up to 4096 bits of data as we generated a 4096 bit key.

*  Now this is where you have a choice of how you can encrypt your backup data as all you need to do once you encrypt your data using any algorithm you wish is encrypt your the random key you used to encrypt your backup data using the RSA public key we generated. Because at the time of writing this AES-256 is the gold standard for data encryption we are going to us it to encrypt the backup data via using a random AES key. Now to generate this we are going to take a random string and use that to generate our AES key! Now thanks to the pipe command this can be condensed down to one command:
```
openssl rand -base64 64 | openssl enc -aes-256-cbc -k - -P -md sha256 -out <key file name>
``` 

* Now from this here all we have to do is encrypt the data we want using our random AES key like such:
```
openssl aes-256-cbc -e -kfile <AES key file name> -in <data file> -out < encrypted data file>
```
The .enc file extension is not really needed but it will help you tell what file is encrypted and what file is not!

* Now That you've encrypted your files using the random AES key we need to encrypt the AES key using our RSA public key so not just anyone can decrypt our encrypted files! this like the last several commands is just a simgle line:
```
openssl rsautl -encrypt -inkey <rsa public key> -pubin -in <input data> -out <output data>
```
This takes our AES key and encrypts it with our public RSA key meaning that you now need your RSA private key to open the file!

* Now from here we should delete the unencrypted backup data and the unencrypted AES key as we don't want ether of those falling into the hands of unknown parties. That leaves us with the encrypted AES key and the encrypted backup. Now what can you do with these? The easier option is to put them both in a storage tar archive that way you only have to deal with moving/uploading one file to and from your storage!

* Decrypting. The worst has happened and you now need to pull down one of your encrypted backups. So how do you decrypt it? Well first if it is stored in a tar file untar it to get the encrypted AES key and the encrypted backup once you have those two files you simply need to first decrypt your AES key this is easily done by running this:
```
openssl rsautl -decrypt -inkey <rsa private key> -in <Encrypted AES key> -out <Decrypted AES key>
```
Now That we have our AES key that was used to encrypt the backup we only have to run the same command used to encrypt the data only replacing the e with a d as such:
```
openssl aes-256-cbc -e -kfile <AES key> -in <Encrypted Data> -out <Decrypted Data>
```
And boom your data has been restored from your fully encrypted backup!

In the end yes, Some people might think this is overkill but in this world as it is at the time of writing this you can never be to secure with your data. And for how little extra work setting something up like this is. And when you factor in the fact that even if the company you are using turns out to be trying to harvest your data. It will end just like that they will have only tried.


Thanks for reading! if you have any issues, questions or anything else please feel free to contact me via [Email](mailto:blog@boops.me) or [Twitter](https://twitter.com/Sir_Boops)!
