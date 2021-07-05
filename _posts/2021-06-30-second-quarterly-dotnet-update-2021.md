---
title: .NET Quarterly News Update - 2021.2
excerpt: Useful things you may have missed in 2021 Q2 from the .NET community.
date: 2021-06-30
permalink: /dotnet-quarterly-update-2021-2/
categories:
  - .NET
tags: [.NET]
---

## OpenTelemetry .NET Support

The OpenTelemetry specification has reached v1.0 with stability for distributed tracing. Work has begun on adding more support for metrics, logs and semantic conventions. With this, we now have v1.0 of a .NET SDK for OpenTelemetry.

Read more:

- [https://devblogs.microsoft.com/dotnet/opentelemetry-net-reaches-v1-0/](https://devblogs.microsoft.com/dotnet/opentelemetry-net-reaches-v1-0/)
- [https://opentelemetry.io/docs/net/](https://opentelemetry.io/docs/net/)

## .NET Hot Reload

Available in VS 16.11 (currently in preview). Also coming in the dotnet cli in .NET 6.

I've already started using this and found it super-helpful being able to make changes to ASP.NET controller code without having to restart.

Read more: [https://devblogs.microsoft.com/dotnet/introducing-net-hot-reload/](https://devblogs.microsoft.com/dotnet/introducing-net-hot-reload/)

## .NET Security Advisories

Microsoft Security Advisory CVE-2021-31204 - .NET Core Elevation of Privilege Vulnerability ([link](https://github.com/dotnet/announcements/issues/185))

CVSS Severity: High
Affected versions: <= .NET 5.0.5 and <= Core 3.1.14

Microsoft Security Advisory CVE-2021-31957 - ASP.NET Denial of Service Vulnerability ([link](https://github.com/dotnet/announcements/issues/189)

CVSS Severity: Medium
Affected software: <= .NET 5.0.6 and <= Core 3.1.15

### How To Fix

The fix  for both requires an upgrade to >= 5.0.7 and >= 3.1.16.

Self-contained apps need to be built with the new SDK and redeployed.

For other apps, update runtime on machines. Remember, this process can now be automated via Microsoft Update for .NET 5.x and Core.

## Reminder of .NET Support Lifecycle Key Dates

- Core 2.1 support ends **21 August 2021**.
- .NET 5.0 support ends ~ February 2022.
- .NET 4.52, 4.6 and 4.6.1 support ends 26 April 2022 (see [SHA-1 retirement](https://github.com/dotnet/announcements/issues/183))
- Core 3.1 support ends 3 December 2022.

.NET 3.5SP1 continues to be supported with 2.0SP2 and 3.0SP2 up to 2029.

.NET 6.0 will be in GA around November 2021. Take a look at the [.NET 6 road-map](https://github.com/dotnet/aspnetcore/issues/27883).

Anything not listed above is out of support already.
