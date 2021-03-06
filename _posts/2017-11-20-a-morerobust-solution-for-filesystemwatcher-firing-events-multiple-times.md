---
title: FileSystemWatcher vs. Locked Files
excerpt: Another Problem with FileSystemWatcher.
date: 2017-11-20
permalink: /a-morerobust-solution-for-filesystemwatcher-firing-events-multiple-times/
redirect_from:
  - /2017/11/20/a-morerobust-solution-for-filesystemwatcher-firing-events-multiple-times/
categories:
  - 'C# .NET'
tags:
  - .NET
  - 'C#'
  - FileSystemWatcher
  - MemoryCache
---
[Git repository with example code discussed in this article.](https://github.com/benbhall/FileSystemWatcherMemoryCache)

## Another Problem with FileSystemWatcher

You've just written your nice shiny new application to monitor a folder for new files arriving and added the code send that file off somewhere else and delete it. Perhaps you even spent some time packaging it in a nice Windows Service. It probably behaved well during debugging. You move it into a test environment and let the manual testers loose. They copy a file, your eager file watcher spots the new file as soon as it starts writing and does the funky stuff and BANG!&#8230; an IOException:

> *he process cannot access the file X because it is being used by another process.

The copying had not finished before the event fired. It doesn't even have to be a large file as your super awesome watcher is just so efficient.

## A Solution

  1. When a file system event occurs, store its details in Memory Cache for X amount of time
  2. Setup a callback, which will execute when the event <span style="text-decoration: underline;">expires</span> from Memory Cache
  3. In the callback, check the file is available for write operations
  4. If it is, then get on with the intended file operation
  5. Else, put it back in Memory Cache for X time and repeat above steps

It would make sense to track and limit the number of retry attempts to get a lock on the file.

## Code Snippets

I've built this on top of the code discussed in a previous post on [dealing with multiple FileSystemWatcher events](http://benhall.io/a-robust-solution-for-filesystemwatcher-firing-events-multiple-times/).

Complete code for this example solution [here](https://github.com/benbhall/FileSystemWatcherMemoryCache/blob/master/FileSystemWatcherMemoryCache/BlockDelayAndHandleFileLockExample.cs)

When a file system event is handled, store the file details and the retry count, using a simple POCO, in MemoryCache with a timer of, something like 60 seconds:

```csharp
private void OnCreated(object source, FileSystemEventArgs e)
{
    _cacheItemPolicy.AbsoluteExpiration = DateTimeOffset.Now.AddSeconds(CacheTimeSeconds);

    var fileData = new CacheItemValue()
    {
         FilePath = e.FullPath,
         RetryCount = 0,
         FileName = e.Name
    };
    _memCache.AddOrGetExisting(e.Name, fileData, _cacheItemPolicy);
}
```

A simple POCO:

```csharp
class CacheItemValue
{
    public string FileName { get; set; }
    public string FilePath { get; set; }
    public int RetryCount { get; set; }
}
```

In the constructor, I initialised my cache item policy with a callback to execute when these cached POCOs expire:

```csharp
_cacheItemPolicy = new CacheItemPolicy
{
    RemovedCallback = OnRemovedFromCache
};
```

The callback itself&#8230;

  1. Increment the number retries
  2. Try and get a lock on the file
  3. If still lock put it back into the cache for another 60 seconds (repeat this MaxRetries times)
  4. Else, get on with the intended file operation

```csharp
private void OnRemovedFromCache(CacheEntryRemovedArguments args)
{
    // Checking if expired, for a bit of future-proofing
    if (args.RemovedReason != CacheEntryRemovedReason.Expired) return;

    var cacheItemValue = (CacheItemValue)args.CacheItem.Value;
    if (cacheItemValue.RetryCount &gt; MaxRetries) return;

    if (IsFileLocked(cacheItemValue.FilePath))
    {
        cacheItemValue.RetryCount++;
        _cacheItemPolicy.AbsoluteExpiration = DateTimeOffset.Now.AddSeconds(CacheTimeSeconds);
              
        _memCache.Add(cacheItemValue.FileName, cacheItemValue, _cacheItemPolicy); 
     }

     // Now safe to perform the file operation here...
}
```

## Other ideas / TODO

* Could also store the actual event object
* Could explore options for non-volatile persistence
* Might find sliding expiration more appropriate in some scenario
