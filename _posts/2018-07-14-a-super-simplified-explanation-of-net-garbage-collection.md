---
title: .NET Garbage Collection. A Super-Simplified Explanation.
date: 2018-07-14
permalink: /a-super-simplified-explanation-of-net-garbage-collection/
redirect_from:
  - /2018/07/16/a-super-simplified-explanation-of-net-garbage-collection/
excerpt: Garbage collection is so often at the root (excuse the pun) of many performance problems, very often because of misunderstanding, so please do set aside time to deepen your understanding after reading this. This article is a super-simplified, look at .NET garbage collection, with loads of intentional technical omissions. It aims to provide a baseline level of understanding that a typical C# developer realistically needs for their day-to-day work. I certainly won’t add complexity by mentioning the stack, value types, boxing etc.
classes: wide
categories:
  - 'C# .NET'
  - Garbage Collection
tags:
  - 'C#'
  - garbage collection
---
[![image-center](/assets/images/super-gc/codeprojectgc.png){: .align-center}](https://www.codeproject.com/Competitions/1058/Best-Article-of-July-2018.aspx)

Super happy to have won First Prize @ [Codeproject](https://www.codeproject.com/Articles/1252394/A-Super-Simplified-Explanation-of-NET-Garbage-Coll) for best article.

***

Garbage collection is so often at the root (excuse the pun) of many performance problems, very often because of misunderstanding, so please do set aside time to deepen your understanding after reading this.

This article is a super-simplified, look at .NET garbage collection, with loads of intentional technical omissions. It aims to provide a baseline level of understanding that a typical C# developer realistically needs for their day-to-day work. I certainly won’t add complexity by mentioning the stack, value types, boxing etc.

Disclaimer: The .NET garbage collector is a dynamic beast that adapts to your application and its implementation is often changed.

## What Developers Know To Say At Interview

The garbage collector automatically looks for objects that are no longer used and frees up that memory. This helps avoid memory leaks created through programmer error.

That’s fine to get the job but is not enough to engineer good, performant C#, trust me.

## Managed Memory (The Brief Version)

The .NET CLR (Common Language Runtime) reserves a chunk of memory available to your application where it will manage any objects allocated by your application. When your application is finished with these objects, they are deallocated. This part is handled by the Garbage Collector (GC).

The GC can and does expand segments sizes when needed but its preference is to reclaiming space through its generational garbage collection…

## The Generational .NET Garbage Collector

New, small, objects go into generation 0. When a collection occurs, any objects that are no longer in use (no references to them) have their memory freed up (deallocated). Any objects still in use will **survive** and **promoted** to the next generation.

![image-center](/assets/images/super-gc/diag11.png){: .align-center}

## Live <span style="text-decoration: line-through;">Long</span> Short (or Forever) and Prosper

![image-center](/assets/images/super-gc/spock.png){: .align-center}

Ask any .NET expert and they will tell you the same thing – an object should be short-lived or else live forever. I won’t be going into detail about performance – this is the one and only rule I want you to take away.

To appreciate it, we need to answer: **Why generational?**

In a well-engineered C# application, typical objects will live and die without ever being promoted out of gen 0. I’m thinking of operations like:

* Variables local to a short running method
* Objects instantiated for the lifetime of a request to a web API call

Gen 1 is the ‘generation in between’, which will catch any wannabe-short-lived objects that escape gen 0, with what is still a relatively quick collection.

A check on which objects are unused consumes resources and suspends applications threads. GC gets increasingly expensive up the generations, as a collection of a particular generation has to also collect all those preceding it e.g. if gen 2 is collected, then so also must gen 1 and gen 0 (see above diagram). This is why we often refer to gen 2 as the full GC. Also, objects that live longer tend to be more complicated to clean up!

Don’t worry though &#8211; if we know which objects are likely to live longer, we can just check them less frequently. And with this in mind:

**NET GC runs the most on gen 0, less on gen 1 and even less often on gen 2.**
{: .text-center}

If an object makes it to gen 2 it needs to be for a good reason &#8211; like being a permanent, reusable object. If objects make it there unintentionally, they’ll stick around longer, using up memory and resulting in more of those bigger gen 2 full collections!

## But Generations Are All Just A Front!

The biggest gotcha when exploring your application through profilers and debuggers, looking at GC for the first time, the Large Object Heap (LOH) also being referred to as generation 2.

Physically, your objects will end up in managed heap segments (in the memory allocated to the CLR, mentioned earlier).

![image-center](/assets/images/super-gc/heaps.png){: .align-center}

Objects will be added onto gen 0 of the Small Object Heap (SOH) consecutively, avoiding having to look for free space. To reduce fragmentation when objects die, the heap may be compacted.

See the following simplified look at a gen 0 collection, followed by a gen 1 collection, with a new object allocation in between (my first go at such an animation):

{% include video id="ih_42o32UoI" provider="youtube" %}

Large objects go on the Large Object Heap, which does not compact, but will try to reuse space.

![image-center](/assets/images/super-gc/loh.png){: .align-center}

As of .NET451 you can tell the GC to compact it on the next collection. But prefer other options for dealing with LOH fragmentation such as pooling reusable objects instead.

## How Big Is a Large Object?

It is well established that >= 85KB a large object (or an array of 1000 doubles). Need to know a bit more than that…

You might be thinking of that large Bitmap image you’ve working with – actually that object uses 24 Bytes and the bitmap itself is in unmanaged memory. It’s really rare to see an object that is really large. More typically a large object is going to be an array.

In the following example, the object from LargeObjectHeapExample is actually 16 Bytes because it is just made up of general class info and pointers to the string and byte array.

By instantiating the LargeObjectHeapExample object we are actually allocating **3 objects on the heap**: 2 of them on the small object heap; and the byte array on the large object heap.

![image-center](/assets/images/super-gc/aLargeObject2.png){: .align-center}

Remember what I said earlier about stuff in the Large Object Heap – notice how the byte array reports as being in generation 2! One reason for the LOH being within gen 2 logically, is that large objects typically have longer lifetimes (think back to what I said earlier about objects that live longer in generational GC). The other reason is the expense of copying large objects while performing the compacting that occurs in earlier generations.

## What Triggers a Collection?

* An attempt to allocate exceeds threshold for a generation or the large object heap
* A call to GC.Collect (I’ll save this for another article)
* The OS signals low system memory

Remember gen 2 and LOH are logically the same thing, so hitting the threshold on either, will trigger a full (gen 2) collection on both heaps. Something to consider re performance (beyond this article).

## Summary

* A collection of a particular generation also collects all those below it i.e. collecting 2 also collects 1 and 0.
* The GC promotes objects that survive collection (because they are still in use) to the next generation. Although see previous point &#8211; don’t expect an object in gen 1 to move to gen 2 when a gen 0 collection occurs.
* GC runs the most on gen 0, less on gen 1 and even less often on gen 2. With this in mind, **objects should be short-lived (die in gen 0 or gen 1 at worst) or live forever (intentionally of course) in gen 2**.
