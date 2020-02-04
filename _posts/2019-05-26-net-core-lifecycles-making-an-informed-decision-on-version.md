---
id: 651
title: '.NET Core Lifecycles &#8211; Making an Informed Decision on Version Path'
date: 2019-05-26T20:07:35+01:00
author: Ben Hall
layout: post
guid: http://benhall.io/?p=651
permalink: /net-core-lifecycles-making-an-informed-decision-on-version/
img: coreversions2.png
categories:
  - .NET Core
  - 'C# .NET'
tags:
  - .net core
---
<figure class="wp-block-image"><img src="https://i1.wp.com/benhall.io/wp-content/uploads/2019/06/versions2.png?resize=687%2C326" alt="" class="wp-image-655" srcset="https://i1.wp.com/benhall.io/wp-content/uploads/2019/06/versions2.png?resize=1024%2C486 1024w, https://i1.wp.com/benhall.io/wp-content/uploads/2019/06/versions2.png?resize=300%2C143 300w, https://i1.wp.com/benhall.io/wp-content/uploads/2019/06/versions2.png?resize=768%2C365 768w, https://i1.wp.com/benhall.io/wp-content/uploads/2019/06/versions2.png?resize=800%2C380 800w, https://i1.wp.com/benhall.io/wp-content/uploads/2019/06/versions2.png?w=1063 1063w" sizes="(max-width: 687px) 100vw, 687px" data-recalc-dims="1" /></figure> 

**UPDATE 16 September 2019 &#8211; I&#8217;ve updated this and now maintain it with the C# Guild in the UKHO GitHub** [**https://github.com/UKHO/csharp-guild/blob/master/dotnetverstions.md**](https://github.com/UKHO/csharp-guild/blob/master/dotnetverstions.md) ****



I’ve had a few queries about decisions on .NET Core versions. Here’s some key points to help you make an informed decision. Remember, no support means no security updates! Microsoft&#8217;s &#8216;Modern Lifecycle Policy&#8217; is going to keep us on our toes and require a little more forward planning than Framework did, I think.

Please do comment if I make any factual errors &#8211; easy to do so during this transition in policies.

## The Long-Term Support Path

.NET Core 2.1 is the stable Long-Term Support (LTS) release, supported to around August 2021. It is recommended for all new projects, particularly applications that won&#8217;t be updated often. .NET 3.1 will be the next LTS release, dropping around November 2019, with 2.1 support cover until August 2021 to upgrade.

Note that ASP .NET Core 3.x is not going to run on Framework, so definitely do not upgrade anything to 2.2 that you wish to continue running on Framework.

There might be implications for Core applications currently running on Framework when 2.1 goes out of support. Not sure yet &#8211; there is extended support for running ASP.NET Core 2.1 on Framework that would see ASP.NET Core 2.1 related packages being supported indefinitely. We&#8217;ll have to wait and see; the intention is still for everyone to full migrate.

## The ‘Current’ Path

.NET Core 2.2 is a ‘Current’ release, expected to end support in December 2019. Only use this if you really need the latest features on the &#8216;current train&#8217; and can resource the manual update cadence that follows. Based on known dates from MS, to remain in support, 2.2 applications would need to be upgraded to 3.0 by around December 2019, 3 months after release; and again, around February 2020 up to 3.1.

## Versions you should not be using

.NET Core 1.0 and 1.1 will end support 27 June 2019 so needs upgrading to either 2.1 or 2.2 asap.

.NET Core 2.0 ended support 1 October 2018 and should now be on either 2.1 or 2.2.