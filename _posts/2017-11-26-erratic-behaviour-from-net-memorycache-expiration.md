---
title: Erratic Behaviour from .NET MemoryCache Expiration Demystified
date: 2017-11-26
permalink: /erratic-behaviour-from-net-memorycache-expiration/
categories:
  - MemoryCache
tags:
  - .NET
  - 'C#'
  - MemoryCache
---
On a recent project I experienced first-hand, how the .NET [MemoryCache](https://msdn.microsoft.com/en-us/library/system.runtime.caching.memorycache(v=vs.110).aspx) class, when used with either absolute or sliding expiration, can produce some unpredictable and undocumented results.

Sometimes cache items expire exactly when expected… yay. But mostly, they expire an arbitrary period of time late.

For example, a cache item with an absolute expiry of 5 seconds might expire after 5 seconds but could just as likely take up to a further 20 seconds to expire.

This might only be significant where precision, down to a few seconds, is required (such as where I have [used it to buffer / throttle FileSystemWatcher events](http://benhall.io/a-robust-solution-for-filesystemwatcher-firing-events-multiple-times/)) but I thought it would be worthwhile decompiling **System.Runtime.Caching.dll** and then clearly documenting the behaviour we can expect.

## When does a cache item actually expire?

There are 2 ways your expired item can leave the cache:

* **Every 20 seconds**, on a Timer, it will pass through all items and flush out anything past its expiry
* **Whenever an item is accessed**, its expiry is checked and **that item** will be removed if expired

This goes for both absolute and sliding expiration. The timer is enabled as soon as anything is added to the cache, whether or not it has an expiration set.

Note that this is all about observable behaviour, as witnessed by the bemused debugger, because once an item has past its expiry, you can no longer access it anyway &#8211; see point 2 above, where accessing an item forces a flush.

## Just as weird with Sliding Expiration&#8230;

Sliding expiration is where an expiration time is set, the same as absolute, but if it is accessed the timer is reset back to the configured expiration length again.

* If the new expiry is not **at least 1 second** longer than the current (remaining) expiry, it will not be updated/reset on access

Essentially, this means that while you can add to cache with a sliding expiration of <= 1 second, there is no chance of any accessing causing the expiration to reset.

Note that if you ever feel the urge to avoid triggering a reset on sliding expiration, you could do this by boxing up values and getting/setting via the reference to the object instead.

## Conclusion / What's so bewildering?

In short, it is undocumented behaviour and a little unexpected.

Consider the 20 second timer and the 5 second absolute expiry example. When it is actually removed from the cache, will depend on where we are in the 20 seconds Timer cycle; it could be any time period, up to an additional 20 seconds, before it fires, giving a potential total of ~ 25 seconds between actually expiring from being added.

Add to this, the additional confusion you'll come across while debugging, caused by items past their expiry time being flushed whenever they are accessed, it has even troubled the great Troy Hunt: [https://twitter.com/troyhunt/status/766940358307516416.](https://twitter.com/troyhunt/status/766940358307516416) Granted he was using ASP.NET caching but the core is pretty much the same, as System.Runtime.Caching was just modified for general .NET usage.

## Decompiling System.Runtime.Caching.dll

Some snippets from the .NET FCL for those wanting a peek at the inner workings themselves.

**CacheExpires.cs**

FlushExpiredItems is called from the TimerCallback (on the 20 seconds) and can also be triggered manually via the [MemoryCache method, Trim](https://msdn.microsoft.com/en-us/library/system.runtime.caching.memorycache.trim(v=vs.110).aspx). There must be interval of >= 1 second between flushes.

Love the **goto** &#8211; so retro. EDIT: Eli points out that it might just be my decompiler!

```chsarp
internal static readonly TimeSpan MIN_UPDATE_DELTA = new TimeSpan(0, 0, 1);
internal static readonly TimeSpan MIN_FLUSH_INTERVAL = new TimeSpan(0, 0, 1); 
internal static readonly TimeSpan _tsPerBucket = new TimeSpan(0, 0, 20); 

//...

internal void EnableExpirationTimer(bool enable)
{
  if (enable)
  {
    if (this._timerHandleRef != null) return;
    DateTime utcNow = DateTime.UtcNow;
    this._timerHandleRef = new GCHandleRef&lt;Timer&gt;(new Timer(new TimerCallback(this.TimerCallback), (object)null, (CacheExpires._tsPerBucket - new TimeSpan(utcNow.Ticks % CacheExpires._tsPerBucket.Ticks)).Ticks / 10000L, CacheExpires._tsPerBucket.Ticks / 10000L));
  }
  else
  {
     GCHandleRef&lt;Timer&gt; timerHandleRef = this._timerHandleRef;
     if (timerHandleRef == null || Interlocked.CompareExchange&lt;GCHandleRef&lt;Timer&gt;&gt;(ref this._timerHandleRef, (GCHandleRef&lt;Timer&gt;)null, timerHandleRef) != timerHandleRef) return;
     timerHandleRef.Dispose();
     while (this._inFlush != 0)
        Thread.Sleep(100);
   }
}

//...

private int FlushExpiredItems(bool checkDelta, bool useInsertBlock)
{
   int num = 0;
   if (Interlocked.Exchange(ref this._inFlush, 1) == 0)
   {
     try
     {
       if (this._timerHandleRef == null) return 0;
       DateTime utcNow = DateTime.UtcNow;
       if (checkDelta && !(utcNow - this._utcLastFlush &gt;= CacheExpires.MIN_FLUSH_INTERVAL))
         {
           if (!(utcNow &lt; this._utcLastFlush))
           goto label_9;
         }
         this._utcLastFlush = utcNow;
         foreach (ExpiresBucket bucket in this._buckets)
         num += bucket.FlushExpiredItems(utcNow, useInsertBlock);
       }
       finally
       {
       Interlocked.Exchange(ref this._inFlush, 0);
       }
     }
     label_9:
     return num;
}
```

**MemoryCacheEntry.cs**

UpdateSlidingExp updates/resets sliding expiration. Note the limit **MIN\_UPDATE\_DELTA **of 1 sec.

```csharp
//...

internal void UpdateSlidingExp(DateTime utcNow, CacheExpires expires)
{
   if (!(this._slidingExp &gt; TimeSpan.Zero)) return;

   DateTime utcNewExpires = utcNow + this._slidingExp;

   if (!(utcNewExpires - this._utcAbsExp &gt;= CacheExpires.MIN_UPDATE_DELTA) && !(utcNewExpires &lt; this._utcAbsExp)) return;

   expires.UtcUpdate(this, utcNewExpires);
}

//...

```

**MemoryCacheStore.cs**

See how code accessing a cached item will trigger a check on its expiration and if expired, remove it from the cache.

```csharp
//...

internal MemoryCacheEntry Get(MemoryCacheKey key)
{
    MemoryCacheEntry memoryCacheEntry = this._entries[(object) key] as MemoryCacheEntry;

    if (memoryCacheEntry != null && memoryCacheEntry.UtcAbsExp &lt;= DateTime.UtcNow)
    {
       this.Remove(key, memoryCacheEntry, CacheEntryRemovedReason.Expired);
       memoryCacheEntry = (MemoryCacheEntry) null;
    }

    this.UpdateExpAndUsage(memoryCacheEntry, true);

    return memoryCacheEntry;
}

//...

```
