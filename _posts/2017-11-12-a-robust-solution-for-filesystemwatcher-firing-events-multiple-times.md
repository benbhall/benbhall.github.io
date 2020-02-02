---
id: 166
title: A robust solution for FileSystemWatcher firing events multiple times
date: 2017-11-12T18:57:39+00:00
author: Ben Hall
layout: post
guid: http://benhall.io/?p=166
permalink: /a-robust-solution-for-filesystemwatcher-firing-events-multiple-times/
categories:
  - File...Watcher
  - MemoryCache
tags:
  - .NET
  - 'C#'
  - FileSystemWatcher
  - MemoryCache
---
[Git repository with example code discussed in this article.](https://github.com/benbhall/FileSystemWatcherMemoryCache)

* * *

## The Problem

[FileSystemWatcher](https://msdn.microsoft.com/en-us/library/system.io.filesystemwatcher(v=vs.110).aspx) is a great little class to take the hassle out of monitoring activity in folders and files but, through no real fault of its own, it can behave unpredictably, firing multiple events for a single action.

Note that in some scenarios, like the example used below, the first event will be the start of the file writing and the second event will be the end, which, while not documented behaviour, is at least predictable. Try it with a very large file to see for yourself.

However, <span class="lang:c# decode:true  crayon-inline">FileSystemWatcher</span> cannot make any promises to behave predictably for all OS and application behaviours. See also, MSDN documentation:

> Common file system operations might raise more than one event. For example, when a file is moved from one directory to another, several OnChanged and some OnCreated and OnDeleted events might be raised. Moving a file is a complex operation that consists of multiple simple operations, therefore raising multiple events. Likewise, some applications (for example, antivirus software) might cause additional file system events that are detected by FileSystemWatcher.

## Example: Recreating edit a file in Notepad firing 2 events

As stated above, we know that 2 events from this action would mark the start and end of a write, meaning we could just focus on the second, if we had full confidence this would be the consistent behaviour. For the purposes of this article, it makes for a convenient examples to recreate.

If you edited a text file in c:\temp, you would get 2 events firing.

<pre class="lang:c# decode:true">class ExampleAttributesChangedFiringTwice
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
</pre>

Complete Console applications for both available on [Github](https://github.com/benbhall/FileSystemWatcherMemoryCache/tree/master/FileSystemWatcherMemoryCache).

## A robust solution

Good use of <span class="lang:c# decode:true  crayon-inline">NotifyFilter</span> ([see my post on how to select NotifyFilters](http://benhall.io/notifyfilters-enumeration-explained-filesystemwatcher/)) can help but there are still plenty of scenarios, like those above, where additional events will still get through for a file system event.

I worked on a nice little idea for utilising MemoryCache as a buffer to &#8216;throttle&#8217; additional events.

  1. A file event (<span class="lang:c# decode:true  crayon-inline ">Changed </span> in the example below) is triggered
  2. The event is handled by <span class="lang:c# decode:true  crayon-inline">OnChanged</span>. But instead of completing the desired action, it stores the event in MemoryCache with a 1 second expiration and a <span class="lang:c# decode:true  crayon-inline ">CacheItemPolicy</span>  callback setup to execute on expiration.
  3. When it expires, the callback <span class="lang:c# decode:true  crayon-inline ">OnRemovedFromCache </span> completes the behaviour intended for that file event.

Note that I use <span class="lang:c# decode:true  crayon-inline">AddOrGetExisting</span> as an simple way to block any additional events firing within the cache period being added to the cache.

<pre class="lang:c# decode:true">class BlockAndDelayExample
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
        watcher <a href="https://apotekerendk.com/cialis-danmark/">apotekerendk.com</a>.EnableRaisingEvents = true;
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
}</pre>

If you&#8217;re looking to handle multiple, <span style="text-decoration: underline;">different</span>, events from a single/unique file, such as <span class="lang:c# decode:true  crayon-inline  ">Created</span> <u>with</u> <span class="lang:c# decode:true  crayon-inline ">Changed</span> , then you could key the cache on the file name and event named, concatenated.  
<a style="display: none;" href="http://benhall.io/" rel="tag">CodeProject</a>