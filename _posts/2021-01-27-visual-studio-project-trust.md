---
title: Trusting Visual Studio Projects
date: 2021-01-27
permalink: /visual-studio-project-trust/
excerpt: A reminder to be cautious and consider the warning window that comes up for Visual Studio projects from external sources.
categories:
  - security
tags: [visual studio,security]
header:
  teaser: /assets/images/vsprojects/trust-dialogue.png
---

**TL;DR** Heed the warning from Visual Studio about untrusted projects but note that VS will not always know (depending on how you transferred the project to your machine). The safest mitigation is to always create a new project and manually copy the source files over to it.

![Visual Studio project security warning window.](/assets/images/vsprojects/trust-dialogue.png){:class="img-responsive"}

Google's Threat Analysis Group recently identified attempts by government-backed hackers to compromise security researchers, using Visual Studio Projects as an attack vector. These projects contained Visual Studio Build Events that called out to custom malware in a DLL.

[Read the full report from Google's Threat Analysis Group](https://blog.google/threat-analysis-group/new-campaign-targeting-security-researchers/).

This made me reflect on how many times I've probably agreed to open a project downloaded from the Internet despite the warning message in Visual Studio. How does Visual Studio even know to display a warning? Do I know what to check if I do decide to heed the warning? What's the best way to mitigate the risk?

## How does Visual Studio know?

When a file is downloaded from the Internet (or some other network location) to an NTFS filesystem on Windows, the browser (or other client application) will write an [Alternate Data Stream](https://docs.microsoft.com/en-us/archive/blogs/askcore/alternate-data-streams-in-ntfs) (ADS), `Zone.Identifier`.

This ADS is just a hidden text file. We can see it in Command Prompt with `dir /r`:

![Command prompt: dir /r VS_solution_download.zip](/assets/images/vsprojects/dir-r.png){:class="img-responsive"}

It's also possible to view streams in PowerShell:

```powershell
Get-Item .\VS_solution_downloaded.zip -Stream *
```

## Deconstructing Zone.Identifier

We can actually make one manually if we know the format of the file (this one was downloaded via Edge).

![Command prompt: dir /r VS_solution_download.zip](/assets/images/vsprojects/zone1.png){:class="img-responsive"}

Chrome differs, saving more detail:

![Command prompt: dir /r VS_solution_download.zip](/assets/images/vsprojects/zone2.png){:class="img-responsive"}

### ZoneId

* NoZone = -1
* MyComputer = 0
* Intranet = 1
* Trusted = 2
* Internet = 3
* Untrusted = 4
  
These are stored, along with their descriptions, in the registry under `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings\Zones`. We can fetch the details for each zone with the PowerShell command:

```powershell
Get-item "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings\Zones\2"
```

![PS Get-Item for Zone 2](/assets/images/vsprojects/ps-zone2.png){:class="img-responsive"}

## Disabling it

There's lots of ways to 'unblock' files. Here's just a few:

![Checking and disabling via Windows GUI.](/assets/images/vsprojects/gui.png){:class="img-responsive"}

* In File Explorer, right-click on a file then -> Properties -> General tab.
* Via PowerShell using `Unblock-File'. See [documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/unblock-file?view=powershell-7.1).
* For VS projects specifically you can deselect *Ask me for every project in this solution* in the warning window.
* Or you could also simply delete the ADS file!

## Don't Rely On It

Windows and many other Microsoft products recognise this metadata but support is otherwise patchy amongst third-party applications. Without the `Zone.Identifier` on the project file, Visual Studio will not know to display the warning.

For example, if a ZIP archive has the `Zone.Identifier` ADS, this *should* typically propagate to any files extracted from it. When I tested Windows' own ZIP file extractor, all the files extracted from a ZIP that had the `Zone.Identifier`. However, when I tested 7-Zip, the ADS did not propagate.

Another notable client that does not add a Zone.Identifier is git.

## Mitigation

We're all guilty of waving the warning message away at some point in our pasts; aided by the **Ok** button being the default focus for a quick tap of the **Enter** key. I've known some brave developers even choose to disable the feature permanently in VS options. How many of us actually take a peek inside the project file to check for anything malicious?

Build Events are a feature, not a vulnerability. Because Visual Studio is a powerful IDE, not a text editor. There are loads of other powerful features that a developer should be aware of when using projects from untrusted sources and I might explore some of these in future articles.

Heed the warning from Visual Studio about untrusted projects but note that VS will not always know (depending on how you transferred the project to your machine). The safest mitigation is to always create a new project and manually copy the source files over to it.
