---
id: 142
title: NotifyFilters enumeration explained (FileSystemWatcher)
date: 2017-11-02T21:47:11+00:00
author: Ben Hall
layout: post
guid: http://benhall.io/?p=142
permalink: /notifyfilters-enumeration-explained-filesystemwatcher/
categories:
  - File...Watcher
tags:
  - .NET
  - 'C#'
  - FileSystemWatcher
---
**The Problem**

When I first worked with the [FileSystemWatcher](https://msdn.microsoft.com/en-us/library/system.io.filesystemwatcher(v=vs.110).aspx) class I ended up experimenting with combinations of NotifyFilters and event handlers to get the desired result; it is not immediately clear, which changes to files and folders, trigger which events.

The job can only get harder when also up against a known issues (just search on [stackoverflow.com](https://stackoverflow.com/search?q=filesystemwatcher+firing+twice)) with events firing twice.

**EDIT: See my separate blog post, on a [more reliable solution to the &#8216;two FileSystemWatcher events firing twice problem&#8217;](http://benhall.io/a-robust-solution-for-filesystemwatcher-firing-events-multiple-times/).**

Here, I hope to provide simple guidance on using the NotifyFilter enumeration for those just starting out with FileSystemWatcher.

**What is a NotifyFilter?**

These filters determine what you are watching and thus, which events can be triggered.

They can also be helpful in limiting the number of events trigger in some scenarios where complex file operations, or applications like antivirus software cause additional events to be triggered (see above) although you can&#8217;t have 100% confidence without some additional defensive coding.

Note that the default values for the NorifyFilter property  are LastWrite, FileName and DirectoryName.

**So, what filters can result in a <u>Changed</u> event being triggered?**

  * Attributes
  * CreationTime
  * LastAccess
  * LastWrite
  * Security
  * Size

**Which filters can result in a <u>Renamed</u> event being triggered?**

  * DirectoryName
  * FileName

**Which filters can result in a <u>Created</u> event being triggered?**

  * DirectoryName
  * FileName

**And which filters can result in a <u>Deleted</u> event being triggered?**

  * DirectoryName
  * FileName

In case you missed it in the MSDN documentation, you can combine more than one NotifyFilters member by using the bitwise OR operator like so:

<pre class="lang:c# decode:true">...NotifyFilter = NotifyFilters.LastAccess | NotifyFilters.LastWrite

           | NotifyFilters.FileName | NotifyFilters.DirectoryName;</pre>

**I get two events when I create a new file&#8230; what&#8217;s with that?**

Most guides to FileWatcher tend to lead you towards the Changed event. However, using this often leads to multiple events, which is not desirable. [Try out the code in this gist](https://gist.github.com/benbhall/ec6e6264fa6d4386908139ab521a7835) to see the two-event behaviour (just copy a fileinto c:\temp when it&#8217;s running). Then [try out the code in this other gis](https://gist.github.com/benbhall/b2b4abcc0df20571ed0a17a0b65fce0d)t, demonstrating how you can use Created with NotifyFilters.FileName to get a single event from a new file in a folder.

**A bit more….Where are the events for copying and moving?**

Copied files will trigger <span style="text-decoration: underline;">Created </span>events in the destination folder so use <span style="text-decoration: underline;">NotifyFilters.FileName.</span>

The same applies for moved files but you can also watch the source folder for <span style="text-decoration: underline;">Deleted </span>events (still using the same NotifyFilter).

The above works for copied  and moved folders (using instead, NotifyFilters.DirectoryName), although more code is required to trigger events for any files inside the folder. See: <https://msdn.microsoft.com/en-us/library/system.io.filesystemwatcher(v=vs.110).aspx>.

**Appendix A &#8211; Table detailing NotifyFilters enumeration from MSDN:**

<table style="height: 360px;" width="654">
  <tr>
    <td>
      Attributes
    </td>
    
    <td>
      The attributes of the file or folder.
    </td>
  </tr>
  
  <tr>
    <td>
      CreationTime
    </td>
    
    <td>
      The time the file or folder was created.
    </td>
  </tr>
  
  <tr>
    <td>
      DirectoryName
    </td>
    
    <td>
      The name of the directory.
    </td>
  </tr>
  
  <tr>
    <td>
      FileName
    </td>
    
    <td>
      The name of the file.
    </td>
  </tr>
  
  <tr>
    <td>
      LastAccess
    </td>
    
    <td>
      The date the file or folder was last opened.
    </td>
  </tr>
  
  <tr>
    <td>
      LastWrite
    </td>
    
    <td>
      The date the file or folder last had anything written to it.
    </td>
  </tr>
  
  <tr>
    <td>
      Security
    </td>
    
    <td>
      The security settings of the file or folder.
    </td>
  </tr>
  
  <tr>
    <td>
      Size
    </td>
    
    <td>
      The size of the file or folder.
    </td>
  </tr>
</table>

Source: https://msdn.microsoft.com/en-us/library/system.io.notifyfilters(v=vs.110).aspx

**Appendix B &#8211; Table of events you&#8217;ll be interested in if you&#8217;ve landed here **

<table>
  <tr>
    <td>
      Changed
    </td>
    
    <td>
      Occurs when a file or directory in the specified Path is changed.
    </td>
  </tr>
  
  <tr>
    <td>
      Created
    </td>
    
    <td>
      Occurs when a file or directory in the specified Path is created.
    </td>
  </tr>
  
  <tr>
    <td>
      Deleted
    </td>
    
    <td>
      Occurs when a file or directory in the specified Path is deleted.
    </td>
  </tr>
  
  <tr>
    <td>
      Renamed
    </td>
    
    <td>
      Occurs when a file or directory in the specified Path is renamed.
    </td>
  </tr>
</table>

Source: https://msdn.microsoft.com/en-us/library/system.io.filesystemwatcher(v=vs.110).aspx  
<a href="http://benhall.io/" rel="tag" style="display:none">CodeProject</a>