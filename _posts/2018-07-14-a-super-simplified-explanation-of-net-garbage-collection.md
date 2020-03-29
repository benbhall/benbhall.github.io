---
id: 437
title: .NET Garbage Collection
subtitle: A Super-Simplified Explanation
date: 2018-07-14T16:00:05+01:00
author: Ben Hall
layout: post
permalink: /a-super-simplified-explanation-of-net-garbage-collection/
excerpt: Garbage collection is so often at the root (excuse the pun) of many performance problems, very often because of misunderstanding, so please do set aside time to deepen your understanding after reading this. This article is a super-simplified, look at .NET garbage collection, with loads of intentional technical omissions. It aims to provide a baseline level of understanding that a typical C# developer realistically needs for their day-to-day work. I certainly won’t add complexity by mentioning the stack, value types, boxing etc.
enclosure:
  - |
    http://benhall.io/wp-content/uploads/2018/07/gcAnimMp4.mp4
    209005
    video/mp4
    
twitterCardType:
  - summary
cardImage:
  - http://benhall.io/wp-content/uploads/2018/07/diag11.png
categories:
  - 'C# .NET'
  - Garbage Collection
tags:
  - 'C#'
  - garbage collection
---
[<img class="alignleft wp-image-503" src="https://i0.wp.com/benhall.io/wp-content/uploads/2018/07/codeprojectgc.png?resize=504%2C53" alt="" width="504" height="53" srcset="https://i0.wp.com/benhall.io/wp-content/uploads/2018/07/codeprojectgc.png?w=494 494w, https://i0.wp.com/benhall.io/wp-content/uploads/2018/07/codeprojectgc.png?resize=300%2C32 300w, https://i0.wp.com/benhall.io/wp-content/uploads/2018/07/codeprojectgc.png?resize=280%2C29 280w" sizes="(max-width: 504px) 100vw, 504px" data-recalc-dims="1" />](https://www.codeproject.com/Competitions/1058/Best-Article-of-July-2018.aspx)

Super happy to have won First Prize @ [Codeproject](https://www.codeproject.com/Articles/1252394/A-Super-Simplified-Explanation-of-NET-Garbage-Coll) for best article.

Garbage collection is so often at the root (excuse the pun) of many performance problems, very often because of misunderstanding, so please do set aside time to deepen your understanding after reading this.

This article is a super-simplified, look at .NET garbage collection, with loads of intentional technical omissions. It aims to provide a baseline level of understanding that a typical C# developer realistically needs for their day-to-day work. I certainly won’t add complexity by mentioning the stack, value types, boxing etc.

Disclaimer: The .NET garbage collector is a dynamic beast that adapts to your application and its implementation is often changed.

# What Developers Know To Say At Interview

The garbage collector automatically looks for objects that are no longer used and frees up that memory. This helps avoid memory leaks created through programmer error.

That’s fine to get the job but is not enough to engineer good, performant C#, trust me.

# Managed Memory (The Brief Version)

The .NET CLR (Common Language Runtime) reserves a chunk of memory available to your application where it will manage any objects allocated by your application. When your application is finished with these objects, they are deallocated. This part is handled by the Garbage Collector (GC).

The GC can and does expand segments sizes when needed but its preference is to reclaiming space through its generational garbage collection…

# The Generational .NET Garbage Collector

New, small, objects go into generation 0. When a collection occurs, any objects that are no longer in use (no references to them) have their memory freed up (deallocated). Any objects still in use will **survive** and **promoted** to the next generation.

<img class="size-full wp-image-438 aligncenter" src="https://i2.wp.com/benhall.io/wp-content/uploads/2018/07/diag11.png?resize=687%2C676" alt="" width="687" height="676" srcset="https://i2.wp.com/benhall.io/wp-content/uploads/2018/07/diag11.png?w=721 721w, https://i2.wp.com/benhall.io/wp-content/uploads/2018/07/diag11.png?resize=300%2C295 300w" sizes="(max-width: 687px) 100vw, 687px" data-recalc-dims="1" /> 

# Live <span style="text-decoration: line-through;">Long</span> Short (or Forever) and Prosper

<img class="alignleft wp-image-439" src="https://i0.wp.com/benhall.io/wp-content/uploads/2018/07/spock.png?resize=160%2C232" alt="" width="160" height="232" srcset="https://i0.wp.com/benhall.io/wp-content/uploads/2018/07/spock.png?w=244 244w, https://i0.wp.com/benhall.io/wp-content/uploads/2018/07/spock.png?resize=207%2C300 207w" sizes="(max-width: 160px) 100vw, 160px" data-recalc-dims="1" /> Ask any .NET expert and they will tell you the same thing – an object should be short-lived or else live forever. I won’t be going into detail about performance – this is the one and only rule I want you to take away.

To appreciate it, we need to answer: **Why generational?**

In a well-engineered C# application, typical objects will live and die without ever being promoted out of gen 0. I’m thinking of operations like:

  * Variables local to a short running method
  * Objects instantiated for the lifetime of a request to a web API call

Gen 1 is the ‘generation in between’, which will catch any wannabe-short-lived objects that escape gen 0, with what is still a relatively quick collection.

A check on which objects are unused consumes resources and suspends applications threads. GC gets increasingly expensive up the generations, as a collection of a particular generation has to also collect all those preceding it e.g. if gen 2 is collected, then so also must gen 1 and gen 0 (see above diagram). This is why we often refer to gen 2 as the full GC. Also, objects that live longer tend to be more complicated to clean up!

Don’t worry though &#8211; if we know which objects are likely to live longer, we can just check them less frequently. And with this in mind:

<p style="text-align: center;">
  <strong>.NET GC runs the most on gen 0, less on gen 1 and even less often on gen 2.</strong>
</p>

If an object makes it to gen 2 it needs to be for a good reason &#8211; like being a permanent, reusable object. If objects make it there unintentionally, they’ll stick around longer, using up memory and resulting in more of those bigger gen 2 full collections!

# But Generations Are All Just A Front!

The biggest gotcha when exploring your application through profilers and debuggers, looking at GC for the first time, the Large Object Heap (LOH) also being referred to as generation 2.

Physically, your objects will end up in managed heap segments (in the memory allocated to the CLR, mentioned earlier).

<img class="alignleft size-full wp-image-440" src="https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/heaps.png?resize=687%2C235" alt="" width="687" height="235" srcset="https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/heaps.png?w=969 969w, https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/heaps.png?resize=300%2C102 300w, https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/heaps.png?resize=768%2C262 768w, https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/heaps.png?resize=800%2C273 800w" sizes="(max-width: 687px) 100vw, 687px" data-recalc-dims="1" /> <span style="font-size: 16px;">Objects will be added onto gen 0 of the Small Object Heap (SOH) consecutively, avoiding having to look for free space. To reduce fragmentation when objects die, the heap may be compacted.</span>

See the following simplified look at a gen 0 collection, followed by a gen 1 collection, with a new object allocation in between (my first go at such an animation):

<div style="width: 640px;" class="wp-video">
  <!--[if lt IE 9]><![endif]--><video class="wp-video-shortcode" id="video-437-1" width="640" height="360" preload="metadata" controls="controls"><source type="video/mp4" src="http://benhall.io/wp-content/uploads/2018/07/gcAnimMp4.mp4?_=1" />
  
  <a href="http://benhall.io/wp-content/uploads/2018/07/gcAnimMp4.mp4">http://benhall.io/wp-content/uploads/2018/07/gcAnimMp4.mp4</a></video>
</div>

&nbsp;

Large objects go on the Large Object Heap, which does not compact, but will try to reuse space.

<img class="aligncenter size-full wp-image-442" src="https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/loh.png?resize=664%2C233" alt="" width="664" height="233" srcset="https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/loh.png?w=664 664w, https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/loh.png?resize=300%2C105 300w" sizes="(max-width: 664px) 100vw, 664px" data-recalc-dims="1" /> 

As of .NET451 you can tell the GC to compact it on the next collection. But prefer other options for dealing with LOH fragmentation such as pooling reusable objects instead.

# How Big Is a Large Object?

It is well established that >= 85KB a large object (or an array of 1000 doubles). Need to know a bit more than that…

You might be thinking of that large Bitmap image you’ve working with – actually that object uses 24 Bytes and the bitmap itself is in unmanaged memory. It’s really rare to see an object that is really large. More typically a large object is going to be an array.

In the following example, the object from LargeObjectHeapExample is actually 16 Bytes because it is just made up of general class info and pointers to the string and byte array.

By instantiating the LargeObjectHeapExample object we are actually allocating **3 objects on the heap**: 2 of them on the small object heap; and the byte array on the large object heap.

<img class="alignleft size-full wp-image-452" src="https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/aLargeObject2.png?resize=687%2C312" alt="" width="687" height="312" srcset="https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/aLargeObject2.png?w=876 876w, https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/aLargeObject2.png?resize=300%2C136 300w, https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/aLargeObject2.png?resize=768%2C349 768w, https://i1.wp.com/benhall.io/wp-content/uploads/2018/07/aLargeObject2.png?resize=800%2C363 800w" sizes="(max-width: 687px) 100vw, 687px" data-recalc-dims="1" /> 

Remember what I said earlier about stuff in the Large Object Heap – notice how the byte array reports as being in generation 2! One reason for the LOH being within gen 2 logically, is that large objects typically have longer lifetimes (think back to what I said earlier about objects that live longer in generational GC). The other reason is the expense of copying large objects while performing the compacting that occurs in earlier generations.

# What Triggers a Collection?

  * An attempt to allocate exceeds threshold for a generation or the large object heap
  * A call to GC.Collect (I’ll save this for another article)
  * The OS signals low system memory

Remember gen 2 and LOH are logically the same thing, so hitting the threshold on either, will trigger a full (gen 2) collection on both heaps. Something to consider re performance (beyond this article).

# Summary

  * A collection of a particular generation also collects all those below it i.e. collecting 2 also collects 1 and 0.
  * The GC promotes objects that survive collection (because they are still in use) to the next generation. Although see previous point &#8211; don’t expect an object in gen 1 to move to gen 2 when a gen 0 collection occurs.
  * GC runs the most on gen 0, less on gen 1 and even less often on gen 2. With this in mind, **objects should be short-lived (die in gen 0 or gen 1 at worst) or live forever (intentionally of course) in gen 2**.

<a style="display: none;" href="https://www.codeproject.com" rel="tag">CodeProject</a>
