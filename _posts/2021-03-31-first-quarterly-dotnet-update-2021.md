---
title: .NET Quarterly News Update - 2021.1
excerpt: Useful things you may have missed in 2021 Q1 from the .NET community.
date: 2021-03-31
permalink: /dotnet-quarterly-update-2021-1/
categories:
  - .NET
tags: [.NET]
---

## Automatic updates in Windows for .NET Core and .NET 5

I just made a small update to [my .NET version guidance](https://failingfast.io/dotnet) this quarter - that .NET Core and .NET 5 servicing updates can now be installed automatically on Windows, through Microsoft Update.

See the [article I wrote in January](https://failingfast.io/dotnet-core-automatic-windows-updates/) for more on this.

## .NET Core Support Lifecycle Key Dates

The key dates for those staying on the LTS (Long-term Support) releases, to help plan ahead for upgrades:

* Core 2.1 goes out of support 21 August 2021.
* Core 3.1 goes out of support 3 December 2022.

.NET 6 is the next LTS that we should be looking to move both Core 2.1 and 3.1 applications on to. It's planned release is 10 November 2021.

There’s a clear upgrade window for 3.1 to work towards but 2.1 will unfortunately require an intermediate stage.

## .NET Framework Support Lifecycle Key Dates

More to consider with this and worth a read of my  [my .NET version guidance](https://failingfast.io/dotnet). Some headlines:

* Versions 4, 4.5 and 4.51 are out of support so check those legacy applications.
* Support for .NET Framework 4.5.2, 4.6, and 4.6.1 will end on April 26, 2022. This is a departure from the lifecycle due to SHA-1 retirement.

## .NET Security Advisory

Hopefully you caught my [notice earlier on in March](/system-text-encodings-web-vulnerability/) and have already taken appropriate action.

The vulnerability is with a .NET library `System.Text.Encodings.Web`, which is included out of the box in the runtime for anything based off `Microsoft.NETCore.App`. The issue is misleading on the face of it as this package is also used in .NET Framework applications directly as a NuGet.

### Action: .NET Core / NET 5

It should be adequate to update the runtime on the box and restart the application. (3.1.13 or 2.1.26)

If it's a self-contained application then it needs to be rebuilt and redeployed from an agent with the updated runtime. Note that if you include the following in AzDo pipeline yaml, it will automatically pull the SDK v3.1.407 in, which includes the fix. 

```yaml
task: UseDotNet@2
        displayName: 'Use .NET Core sdk'
        inputs:
          packageType: sdk
          version: 3.1.x
          installationPath: $(Agent.ToolsDirectory)\\dotnet
```

If you've enabled the new Windows Update feature for .NET Core then just check that happened!

### Action: .NET Framework

Update the package to a version that is not vulnerable and redeploy (4.5.1, 4.7.2, 5.0.1).
