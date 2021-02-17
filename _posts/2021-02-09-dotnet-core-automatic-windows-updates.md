---
title: Automatic updates in Windows for .NET Core and .NET 5
excerpt: Making it that little bit easier to keep up with security patching.
date: 2021-01-09
permalink: /dotnet-core-automatic-windows-updates/
categories:
  - security
  - dotnetcore
tags: [microsoft update,security,dotnetcore]
header:
  teaser: '/assets/images/2021-02-09-dotnet-core-automatic-windows-updates/windows-updates-available-teaser.png'
---

**TL;DR** .NET Core and .NET 5 servicing updates can now be installed automatically on Windows, through Microsoft Update.

Today I watched .NET Core and .NET 5 versions updated automatically for the first time.

![Windows Updates of .NET Core in progress.](/assets/images/2021-02-09-dotnet-core-automatic-windows-updates/windows-updates-available.png){:class="img-responsive"}

## Runtimes were updated

All [supported runtime](https://dotnet.microsoft.com/download/dotnet-core) already installed get updated. In my case, I received the following new versions:

* Microsoft.NETCore.App 3.1.12
* Microsoft.AspNetCore.App 3.1.12
* Microsoft.WindowsDesktop.App 3.1.12
* Microsoft.NETCore.App 5.0.3
* Microsoft.AspNetCore.App 5.0.3
* Microsoft.WindowsDesktop.App 5.0.3
* Microsoft.NETCore.App 2.1.25
* Microsoft.AspNetCore.App 2.1.25

## SDKs were updated

All .NET Core SDKs installed were also updated and as per manual SDK installs, the previous versions were replaced. 

There is one exception to this - where Visual Studio has a dependency on a particular version and after my update I did find that I now had 2 .NET 5 SDK:

* 5.0.101
* 5.0.103

However, when I updated my VS from 16.8.3 to 16.8.5, 5.0.101 was removed.

## The ASP.NET Core Module was not updated

Work has been promised to service the hosting bundle (for working with ISS) through Microsoft Update, which I don't think is finished yet. I popped an older hosting bundle on my local machine but no offers of anything newer from Microsoft Updater so assuming it's not ready yet.

## Affect on side-by-side installs

One of the benefits of Core is the ability to have side-by-side installations of runtime versions. This is unchanged:

* Major and minor versions will co-exist with their respective applications.
* Servicing updates will not overwrite previous servicing versions.

The only thing that has changed is that the servicing update can be installed automatically through Microsoft Update instead of being a manual task. 

By default, .NET Core applications will continue to only roll forward to the latest available patch version installed unless there is no available runtime for the targeted minor version. 

For example:

* If 3.1 is specified and there is a 3.1.x runtime, then the highest available 3.1.x is used, which on my machine right now, would be 3.1.12.
* If 3.0 is specified but there are no 3.0.x runtime, then the highest available 3.x.x is used, which on my machine right now, would be 3.1.12.

### Aside: Taking control of roll-forward behaviour

This is not directly related to the automatic updates but is good to know.

It is possible to override the default roll-forward behavior via [run-time configuration](https://docs.microsoft.com/en-us/dotnet/core/run-time-config/). For example, on my system where I have 2.1, 3.1 and 5.0 installed, if I run an app targeting .NET 2.1 or 3.1 with the following, it will execute on the 5.0.3 runtime.

```
dotnet --roll-forward LatestMajor myApp.dll
```

## Unaffected by automatic updates

**Self-contained**:  As of Core 3.x it is also possible to distribute self-contained executables that include the required Core runtime.

Development teams must still track runtime versions used by these self-contained apps, follow the [.NET Core and .NET 5 release metadata](https://dotnetcli.blob.core.windows.net/dotnet/release-metadata/releases-index.json) and make considered decisions about updating, rebuilding and redeploying.

**Azure App servicing**: These are still be patched automatically.

## It's optional

It is in an opt-in service. So on a client OS *Receive updates for other Microsoft products when you update Windows* must be enabled.

![Enable updates for other Microsoft Products.](/assets/images/2021-02-09-dotnet-core-automatic-windows-updates/update-options.png){:class="img-responsive"}

On server OS the updates are managed via Windows Server Update servicings (WSUS) or System Center Configuration Manager (SCCM). See the [section for IT administrators](https://devblogs.microsoft.com/dotnet/net-core-updates-coming-to-microsoft-update/#for-it-administrators) on the MS blog for detailed instructions.

## Summary

Barry Dorrans, 'The .NET security person' at Microsoft, [https://twitter.com/blowdart/status/1234228333837078528](has previously explained) why .NET Core was not distributed as part of Windows:

> 1) We'd have to support that version for the lifetime of that Windows sku
>
> 2) It takes a lot longer to ship patches for Windows embedded code
>
> 3) It would probably mean an end to side by side runtimes
>
> Right now we can turn around a security patch in a couple of weeks. If we had to insert into Windows that adds a minimum of a month, usually two depending on where we are in the month.

Obviously, updating is not the same as adopting Core as a component of Windows. It is nonetheless great to see we have overcome (or perhaps circumvented) the potential issues pulling .NET Core into Microsoft Updates (as opposed to Windows Updates).

There are no immediate plans to use Microsoft Update channels for major or minor versions also but if this does become a thing, the default roll-forward behaviour will ensure there are no breaking changes.

There's loads more details in the [.NET blog article](https://devblogs.microsoft.com/dotnet/net-core-updates-coming-to-microsoft-update/) from @jamshed.

## Useful to know

* List installed runtimes with `dotnet --list-runtimes`.
* List installed SDKs with `dotnet --list-sdks`.
* Uninstall a runtime, sdk or the hosting bundle with `dotnet-core-uninstall` available to [download here](https://github.com/dotnet/cli-lab/releases).
* Programatically have an app report which runtime it is using courtesy of [Rick Strahl](https://weblog.west-wind.com/posts/2018/Apr/12/Getting-the-NET-Core-Runtime-Version-in-a-Running-Application):

```csharp
string runtime = System.Runtime.InteropServices
    .RuntimeInformation.FrameworkDescription;
```

I think in his article he got a `null` from this but it worked correctly for me and was useful in proving to myself how the roll forward worked.
