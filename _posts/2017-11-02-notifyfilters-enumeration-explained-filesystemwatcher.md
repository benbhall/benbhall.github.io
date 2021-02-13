---
title: FileSystemWatcher is Confusing
subtitle: NotifyFilters enumeration explained
excerpt: NotifyFilters enumeration explained.
date: 2017-11-02
permalink: /notifyfilters-enumeration-explained-filesystemwatcher/
categories:
  - FileWatcher
tags:
  - .NET
  - 'C#'
  - FileSystemWatcher
---
## The Problem

When I first worked with the [FileSystemWatcher](https://msdn.microsoft.com/en-us/library/system.io.filesystemwatcher(v=vs.110).aspx) class I ended up experimenting with combinations of NotifyFilters and event handlers to get the desired result; it is not immediately clear, which changes to files and folders, trigger which events.

The job can only get harder when also up against a known issues (just search on [stackoverflow.com](https://stackoverflow.com/search?q=filesystemwatcher+firing+twice)) with events firing twice.

**EDIT:** See my separate blog post, on a [more reliable solution to the 'two FileSystemWatcher events firing twice problem'](http://benhall.io/a-robust-solution-for-filesystemwatcher-firing-events-multiple-times/).

Here, I hope to provide simple guidance on using the NotifyFilter enumeration for those just starting out with FileSystemWatcher.

## What is a NotifyFilter?

These filters determine what you are watching and thus, which events can be triggered.

They can also be helpful in limiting the number of events trigger in some scenarios where complex file operations, or applications like antivirus software cause additional events to be triggered (see above) although you can't have 100% confidence without some additional defensive coding.

Note that the default values for the NorifyFilter property  are LastWrite, FileName and DirectoryName.

## So, what filters can result in a <u>Changed</u> event being triggered?

* Attributes
* CreationTime
* LastAccess
* LastWrite
* Security
* Size

## Which filters can result in a <u>Renamed</u> event being triggered?

* DirectoryName
* FileName

## Which filters can result in a <u>Created</u> event being triggered?

* DirectoryName
* FileName

## And which filters can result in a <u>Deleted</u> event being triggered?

* DirectoryName
* FileName

In case you missed it in the MSDN documentation, you can combine more than one NotifyFilters member by using the bitwise OR operator like so:

```csharp
...

NotifyFilter = NotifyFilters.LastAccess | NotifyFilters.LastWrite
           | NotifyFilters.FileName | NotifyFilters.DirectoryName;
```

## I get two events when I create a new file. What's with that?

Most guides to FileWatcher tend to lead you towards the Changed event. However, using this often leads to multiple events, which is not desirable. [Try out the code in this gist](https://gist.github.com/benbhall/ec6e6264fa6d4386908139ab521a7835) to see the two-event behaviour (just copy a fileinto c:\temp when it's running). Then [try out the code in this other gis](https://gist.github.com/benbhall/b2b4abcc0df20571ed0a17a0b65fce0d)t, demonstrating how you can use Created with NotifyFilters.FileName to get a single event from a new file in a folder.

##A bit more….Where are the events for copying and moving?

Copied files will trigger <span style="text-decoration: underline;">Created </span>events in the destination folder so use `NotifyFilters.FileName`.

The same applies for moved files but you can also watch the source folder for <span style="text-decoration: underline;">Deleted </span>events (still using the same NotifyFilter).

The above works for copied  and moved folders (using instead, NotifyFilters.DirectoryName), although more code is required to trigger events for any files inside the folder. See: <https://msdn.microsoft.com/en-us/library/system.io.filesystemwatcher(v=vs.110).aspx>.

## Appendix A - Table detailing Notify Filters enumeration from MSDN:
|||
|--- |--- |
|Attributes|The attributes of the file or folder.|
|CreationTime|The time the file or folder was created.|
|DirectoryName|The name of the directory.|
|FileName|The name of the file.|
|LastAccess|The date the file or folder was last opened.|
|LastWrite|The date the file or folder last had anything written to it.|
|Security|The security settings of the file or folder.|
|Size|The size of the file or folder.|
|Changed|Occurs when a file or directory in the specified Path is changed.|
|Created|Occurs when a file or directory in the specified Path is created.|
|Deleted|Occurs when a file or directory in the specified Path is deleted.|
|Renamed|Occurs when a file or directory in the specified Path is renamed.|

Source: https://msdn.microsoft.com/en-us/library/system.io.notifyfilters(v=vs.110).aspx

## Appendix B - Table of events you'll be interested in if you've landed here

|||
|--- |--- |
|Changed|Occurs when a file or directory in the specified Path is changed.|
|Created|Occurs when a file or directory in the specified Path is created.|
|Deleted|Occurs when a file or directory in the specified Path is deleted.|
|Renamed|Occurs when a file or directory in the specified Path is renamed.|

Source: https://msdn.microsoft.com/en-us/library/system.io.filesystemwatcher(v=vs.110).aspx  
