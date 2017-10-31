---
layout: post
title:  "My Strange Tags"
date:   2016-12-22 11:14:00 -0600
---
If you're reading this you most likly are wondering why i tagged a post like i'm brain dead. Well you're not to far from the truth as i use an auto tagger to tag posts for me based on the most popular tags on a post. If you want to see the code it's [Here](https://git.frgl.pw/Sir_Boops/Boopblr/src/master/src/main/java/me/boops/tags/FindTop.java). 

If you don't quite understand what i mean by that. In this example we'll have three posts

* Post A: ```#nice #cool #cute```
* Post B ```#fur #cute #fluffy #amaz```
* Post C ```#cool #cute #amazing```

Now that we have three posts and their tags we can sort them by how many times they have been used

* `#nice` Uses -> 1
* `#cool` Uses -> 2
* `#cute` Uses -> 3
* `#fur` Uses -> 1
* `#fluffy` Uses -> 1
* `#amaz` Uses -> 1
* `#amazing` Uses -> 1

So now that we have usage counts using the same logic as the script and appending these tags to the post we will end up using the tags `#cute #cool #nice`. The final tag coming from the top as the final five tags all have a usage value of one.
