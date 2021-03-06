---
title: FileSystemWatcher is a Bit Broken
excerpt: A robust solution for FileSystemWatcher firing events multiple times.
date: 2017-11-12
permalink: /a-robust-solution-for-filesystemwatcher-firing-events-multiple-times/
redirect_from:
  - /2017/11/12/a-robust-solution-for-filesystemwatcher-firing-events-multiple-times/
categories:
  - 'C# .NET'
tags:
  - .NET
  - 'C#'
  - FileSystemWatcher
  - MemoryCache
---
[Git repository with example code discussed in this article.](https://github.com/benbhall/FileSystemWatcherMemoryCache)

***

## The Problem

[FileSystemWatcher](https://msdn.microsoft.com/en-us/library/system.io.filesystemwatcher(v=vs.110).aspx) is a great little class to take the hassle out of monitoring activity in folders and files but, through no real fault of its own, it can behave unpredictably, firing multiple events for a single action.

Note that in some scenarios, like the example used below, the first event will be the start of the file writing and the second event will be the end, which, while not documented behaviour, is at least predictable. Try it with a very large file to see for yourself.

However, `FileSystemWatcher` cannot make any promises to behave predictably for all OS and application behaviours. See also, MSDN documentation:

> Common file system operations might raise more than one event. For example, when a file is moved from one directory to another, several OnChanged and some OnCreated and OnDeleted events might be raised. Moving a file is a complex operation that consists of multiple simple operations, therefore raising multiple events. Likewise, some applications (for example, antivirus software) might cause additional file system events that are detected by FileSystemWatcher.

## Example: Recreating edit a file in Notepad firing 2 events

As stated above, we know that 2 events from this action would mark the start and end of a write, meaning we could just focus on the second, if we had full confidence this would be the consistent behaviour. For the purposes of this article, it makes for a convenient examples to recreate.

If you edited a text file in c:\temp, you would get 2 events firing.

```csharp
class ExampleAttributesChangedFiringTwice
    {
        public ExampleAttributesChangedFiringTwice(string demoFolderPath)
        {
            var watcher = new FileSystemWatcher()
            {
                Path = demoFolderPath,
                NotifyFilter = NotifyFilters.LastWrite,
                Filter = "*.txt"
            };

            watcher.Changed += OnChanged;
            watcher.EnableRaisingEvents = true;
        }

        private static void OnChanged(object source, FileSystemEventArgs e)
        {
            // This will fire twice if I edit a file in Notepad
        }
    }
```

Complete Console applications for both available on [Github](https://github.com/benbhall/FileSystemWatcherMemoryCache/tree/master/FileSystemWatcherMemoryCache).

## A robust solution

Good use of `NotifyFilter` ([see my post on how to select NotifyFilters](http://benhall.io/notifyfilters-enumeration-explained-filesystemwatcher/)) can help but there are still plenty of scenarios, like those above, where additional events will still get through for a file system event.

I worked on a nice little idea for utilising MemoryCache as a buffer to 'throttle' additional events.

  1. A file event (`Changed` in the example below) is triggered
  2. The event is handled by `OnChanged`. But instead of completing the desired action, it stores the event in MemoryCache with a 1 second expiration and a `CacheItemPolicy`  callback setup to execute on expiration.
  3. When it expires, the callback `OnRemovedFromCache` completes the behaviour intended for that file event.

Note that I use `AddOrGetExisting` as an simple way to block any additional events firing within the cache period being added to the cache.

```csharp
class BlockAndDelayExample
{
    private readonly MemoryCache _memCache;
    private readonly CacheItemPolicy _cacheItemPolicy;
    private const int CacheTimeMilliseconds = 1000;

    public BlockAndDelayExample(string demoFolderPath)
    {
        _memCache = MemoryCache.Default;

        var watcher = new FileSystemWatcher()
        {
            Path = demoFolderPath,
            NotifyFilter = NotifyFilters.LastWrite,
            Filter = "*.txt"
        };

        _cacheItemPolicy = new CacheItemPolicy()
        {
            RemovedCallback = OnRemovedFromCache
        };

        watcher.Changed += OnChanged;
        watcher.EnableRaisingEvents = true;
    }

    // Add file event to cache for CacheTimeMilliseconds
    private void OnChanged(object source, FileSystemEventArgs e)
    {
        _cacheItemPolicy.AbsoluteExpiration =
            DateTimeOffset.Now.AddMilliseconds(CacheTimeMilliseconds);

        // Only add if it is not there already (swallow others)
        _memCache.AddOrGetExisting(e.Name, e, _cacheItemPolicy);
    }

    // Handle cache item expiring
    private void OnRemovedFromCache(CacheEntryRemovedArguments args)
    {
        if (args.RemovedReason != CacheEntryRemovedReason.Expired) return;

        // Now actually handle file event
        var e = (FileSystemEventArgs) args.CacheItem.Value;
    }
}
```

If you're looking to handle multiple, <span style="text-decoration: underline;">different</span>, events from a single/unique file, such as `Created` <u>with</u> `Changed</span> , then you could key the cache on the file name and event named, concatenated.  
