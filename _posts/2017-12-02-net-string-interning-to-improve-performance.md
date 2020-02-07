---
id: 251
title: .NET String Interning 
subtitle: To Improve String Comparison Performance (C# examples)
date: 2017-12-02T19:57:40+00:00
author: Ben Hall
layout: post
permalink: /net-string-interning-to-improve-performance/
categories:
  - String Class
tags:
  - .NET
  - 'C#'
  - String Interning
---
## Introduction

String comparisons must be one of the most common things we do in C#; and string comparisons can be really expensive! So its worthwhile knowing the what, when and why to improving string comparison performance.

In this article I will explore one way &#8211; string interning.

## What is string interning?

String interning refers to having a <span style="text-decoration: underline;">single copy</span> of each unique string in an string intern pool, which is via a hash table in the.NET common language runtime (CLR). Where the key is a hash of the string and the value is a reference to the actual String object.

So if I have the same string occurring 100 times, interning will ensure only one occurrence of that string is actually allocated any memory. Also, when I wish to compare strings, if they are interned, then I just need to do a reference comparison.

## String interning mechanics

In this example, I explicitly intern string literals just for demonstration purposes.

<pre class="lang:c# decode:true">var s1 = string.Intern("stringy"); 
var s2 = string.Intern("stringy");
var s3 = string.Intern("stringy");</pre>

Line 1:

  * This new &#8220;stringy&#8221; is hashed and the hash is looked up in our pool (of course its not there yet)
  * A copy of the &#8220;stringy&#8221; object would be made
  * A new entry would be made to the interning hash table, with the key being the hash of &#8220;stringy&#8221; and the value being a reference to the copy of &#8220;stringy&#8221;
  * Assuming application no longer references original &#8220;stringy&#8221;, the GC can reclaim that memory

Line 2: This new &#8220;stringy&#8221; is hashed and the hash is looked up in our pool (which we just put there). The reference to the &#8220;stringy&#8221; copy is returned  
Line 3: Same as line 2

## Interning depends on string immutability

Take a classic example of string immutability:

<pre class="">var s1 = "stringy";   
s1 += " new string";</pre>

We know that when line 2 is executed, the &#8220;stringy&#8221; object is de-referenced and left for garbage collection; and s1 then points to a new String object &#8220;stringy new string&#8221;.

String interning works because the CLR knows, categorically, that the String object referenced cannot change. Here I&#8217;ve added a fourth line to the earlier example:

<pre class="lang:c# decode:true">var s1 = string.Intern("stringy"); 
var s2 = string.Intern("stringy");
var s3 = string.Intern("stringy");
s1 += " new string";</pre>

Line 4: s1 doesn&#8217;t change because it is immutable; it now points to a new String object &#8221; stringy new string&#8221;.  
s2 and s3 will still safely reference the copy that was made at line 1

## Using Interning in the .NET CLR

You&#8217;ve already seen a bit in the examples above [gutepotenz.de](https://gutepotenz.de/). .NET offers two static string methods:

[Intern(String str)](https://msdn.microsoft.com/en-us/library/system.string.intern.aspx)

It hashes string _str_ and checks the intern pool hash table and either:

  * returns a reference to the (already) interned string, if interned; or
  * a references to _str_ is added to the intern pool and this reference is returned

[IsInterned(String str)](https://msdn.microsoft.com/en-us/library/system.string.isinterned(v=vs.110).aspx)

It hashes string _str_ and checks the intern pool hash table. Rather than a standard bool, it returns either:

  * null, if not interned
  * a reference to the (already) interned string, if interned

String literals (not generated in code) are automatically interned, although CLR versions have varied in this behaviour, so if you expect strings interned, it is best to always do it explicitly in your code.

## My simple test: Setup

I&#8217;ve run some timed tests on my aging i5 Windows 10 PC at home to provide some numbers to help explore the potential gains from string interning. I used the following test setup:

  * Strings randomly generated
  * All string comparisons are ordinal
  * Strings are all the same length of 512 characters as I want the CLR will compare every character to force the worst-case (the CLR checks string length first for ordinal comparisons)
  * The string added <span style="text-decoration: underline;">last</span> (so to the end of the List<T>) is also stored as a &#8216;known&#8217; search term. This is because I am only exploring the worst-case approach
  * For the List<T> interned, every string added to the list, and also the search term, were wrapped in the string.Intern(String str) method

I timed how long populating each collection took and then how long searching for the known search term took also, to the nearest millisecond.

The collections/approaches used for my tests:

  * List<T> with no interning used, searched via a foreach loop and string.Equals on each element
  * List<T> with no interning used, searched via the Contains method
  * List<T> with interning used, searched via a foreach loop and object.ReferenceEquals
  * HashSet<T>, searched via the Contains method

The main objective is to observe string search performance gains from using string interning with List<T> HashSet is just included as a baseline for known fast searches.

## My simple test: Results

In Figure 1 below, I have plotted the size of collections in number of strings added, against the time taken to add that number of randomly generated strings. Clearly there is no significant difference in this operation, when using a HashSet<t> compared to a List<T> without interning. Perhaps if had run to larger sets the gap would widen further based on trend?

There is slightly more overhead when populating the List<T> with string interning, which is initially of no consequence but is growing faster than the other options.

<div id="attachment_259" style="width: 574px" class="wp-caption aligncenter">
  <img aria-describedby="caption-attachment-259" class="size-full wp-image-259" src="https://i2.wp.com/benhall.io/wp-content/uploads/2017/12/populatecollection2.png?resize=574%2C322" alt="" width="574" height="322" srcset="https://i2.wp.com/benhall.io/wp-content/uploads/2017/12/populatecollection2.png?w=574 574w, https://i2.wp.com/benhall.io/wp-content/uploads/2017/12/populatecollection2.png?resize=300%2C168 300w" sizes="(max-width: 574px) 100vw, 574px" data-recalc-dims="1" />
  
  <p id="caption-attachment-259" class="wp-caption-text">
    Figure 1: Populating List<T> and HashSet<T> collections with random strings
  </p>
</div>

Figure 2, shows the times for searching for the known string. All the times are pretty small for these collection sizes but the growths are clear.

<div id="attachment_260" style="width: 571px" class="wp-caption aligncenter">
  <img aria-describedby="caption-attachment-260" class="size-full wp-image-260" src="https://i1.wp.com/benhall.io/wp-content/uploads/2017/12/searchcollection.png?resize=571%2C322" alt="" width="571" height="322" srcset="https://i1.wp.com/benhall.io/wp-content/uploads/2017/12/searchcollection.png?w=571 571w, https://i1.wp.com/benhall.io/wp-content/uploads/2017/12/searchcollection.png?resize=300%2C169 300w" sizes="(max-width: 571px) 100vw, 571px" data-recalc-dims="1" />
  
  <p id="caption-attachment-260" class="wp-caption-text">
    Figure 2: Times taken searching for a string known, which was added last
  </p>
</div>

As expected, HashSet is O(1) and the others are O(N). The searches not utilising interning are clearly growing in time taken at a greater rate.

## Conclusion

HashSet<T> is present in this article only as a baseline for fast searching and should obviously be your choice for speed where there are no constraints requiring a List<T>.

In scenarios where you must use a List<T> such as where you still wish to enumerate quickly through a collection, there are some performance gains to be had from using string interning, with benefits increasing as the size of the collection grows. The drawback is the slightly increased populating overhead (although I think it is fair to suggest that most real-world use cases would not involve populating the entire collection in one go).

The utility and behaviour of string interning, reminds me of database indexes &#8211; it takes a bit longer to add a new item but that item will be faster to find. So perhaps the same considerations for database indexes are true for string interning?

There is also the added bonus that string interning will prevent any duplicate strings being stored, which in some scenarios could mean substantial memory savings.

**Potential benefits:**

  * Faster searching via object references
  * Reduced memory usage because duplicate interned strings will only be stored once

**Potential performance hit:**

  * Memory referenced by the intern hash table is unlikely to be released until the CLR terminates
  * You still need to create the string to be interned, which will be allocated memory (granted, this will then be garbage collected)

## Sources

  * https://msdn.microsoft.com/en-us/library/system.string.intern.aspx

<a style="display: none;" href="http://benhall.io/" rel="tag">CodeProject</a>