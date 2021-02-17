---
title: .NET Performance Tip
excerpt: Know Your Garbage Collection Options. An under-utilised setting that can offer substantial performance gains.
date: 2018-07-21
permalink: /net-performance-tip-know-your-garbage-collection-options/
redirect_from:
  - /2018/07/21/net-performance-tip-know-your-garbage-collection-options/
categories:
  - 'C# .NET'
  - Garbage Collection
tags:
  - .NET
  - 'C#'
  - garbage collection
---
## Introduction

An under-utilised setting that can offer substantial performance gains.

**Workstation GC** is what you’ll be getting by default with a .NET application and might be unaware of another option. It uses smaller segments, which means more frequent collections, which in turn are short, thus minimising application thread suspensions. When used with concurrent GC, it is best suited for desktop / GUI applications. With concurrent disabled (all threads will suspend for GC), it uses a little less memory and is best suited for lightweight services on single-core machines, processing intermittently (appropriate use cases are few and far between).

## There Is Another Option

**Server GC**, the one you should try if you have multiple processors dedicated to just your application, this can really speed up GC, and often allocations too. GCs happen in parallel on dedicated threads (one for each processor/core), facilitated by a heap per processor. Segments are larger, favouring throughput and resulting in less frequent, but longer GCs. This does mean higher memory consumption.

I mentioned a concurrent GC setting above (since .NET4, this is called background GC). From .NET4.5, it is enabled by default in both Server and Workstation GC. I don’t expect you’ll ever change it but good to know what it brings to the table with it enabled, the GC marks (finds unreachable objects) concurrently using a background thread. It does mean an additional thread for every logical processor in Server GC mode but they are lower priority and won’t compete with foreground threads.

Add this to your _app.config_ for Server GC:

```csharp
<configuration>
    <runtime>
        <gcServer enabled="true"/>
    </runtime>
</configuration>
```

If you have good reason, you can disable background GC:

`<gcConcurrent enabled="false"/>`

**Disclaimer**: As with all performance work, measure impact before and after to confirm it’s the right choice for your application.
