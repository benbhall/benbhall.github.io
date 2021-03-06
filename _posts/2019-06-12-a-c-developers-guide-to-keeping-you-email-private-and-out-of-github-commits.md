---
title: Privacy in GitHub commit history
subtitle: Keeping Your Email Private and Out Of GitHub Commits
excerpt: Keeping your email private and out of GitHub commit history.
date: 2019-06-12
permalink: /a-c-developers-guide-to-keeping-you-email-private-and-out-of-github-commits/
redirect_from:  
  - /2019/06/12/a-c-developers-guide-to-keeping-you-email-private-and-out-of-github-commits/
categories:
  - git
  - privacy
tags: [git,privacy]
toc: true
toc_label: "Contents"
toc_sticky: true
toc_icon: "heart"  # corresponding Font Awesome icon name (without fa prefix)
header:
  teaser: /assets/images/emailprivate.png
---

![Cartoon depiction of keeping email private.](/assets/images/emailprivate.png){:class="img-responsive"}

If you are about to start working with public repositories on GitHub, you might want to hide your email address(es) from the commit history.

Written for .NET developers but useful to anyone working with git.

## Step 1: (Find the private email)

GitHub website -> Settings -> Emails.  
  
Scroll down to **Keep my email address private** and you'll be able to take a copy of your `no-reply` address that will look something like:

> 1119252+foobar@users.noreply.github.com

Note that if you're missing the number prefix, commits made with that _no-reply_ email won't be associated with you if you change your username. Simply un-check then re-check the **Keep my email address private** box and you'll get a new one with the id prefix.

## Step 2&nbsp;(Activate on GitHub website)

Enable it for any website operations such as creating a new repo with an initial commit. 

Simply click the checkbox next to **Keep my email address private**.

## Step 3&nbsp;(Local setup)

Note use of Windows paths in this example.

It's good idea if your global config i.e. c:\users\<username>\.gitconfig has your default user for new git providers. You can then set conditions depending on root working directory. 

So I might have c:\teamgit for working with our team's on-prem Azure DevOps git provider and c:\github for working on GitHub. You can break this down as much as you need.

Contents of&nbsp;.gitconfig:

```csharp
[user]
    name = Ben Hall
    email = benh@foo.com

[includeIf "gitdir/i:c:/github/"]
     path = c:/github/github-user.gitconfig

[includeIf "gitdir/i:c:/teamgit/"]
     path = c:/teamgit/teamgit-user.gitconfig
```

It's really picky about that trailing slash and the /i gets around case issues. It's a beast that wants to live on UNIX but is forced into Windows 🙂 At least the file names and extensions can be anything you want.

Contents of&nbsp;github-user.gitconfig:

```csharp
[user]
    email =  1119252+foobar@users.noreply.github.com
```

Contents of&nbsp;teamgit-user.gitconfig:

```csharp
[user]
    email = ben.hall@myemployer.co.uk
```

This works in command line, VS Code and Visual Studio. In the latter it won't acknowledge it in Team Explorer git settings (for sensible reasons) but you'll see it is working in your commit log.

You could instead do this email config at repository level, which is a pain to remember. There is a git config option to have it ask you every new clone but I prefer the above as a more robust solution.

Don't forget to ask anyone you add as a [co-author](https://help.github.com/en/articles/creating-a-commit-with-multiple-authors) to a commit if they would prefer to use their&nbsp;_noreply_&nbsp;email &#8211; they'll need to give you this!

## Testing it works

You'll want to try making some commits but before you do it is straightforward to check with the following:

  `git config --show-origin --get user.email`

For the repo you are sitting in, the show-origin bit will let you see precisely which config file the email taken from.

## A gotcha

You'll have seen a second option in the email settings on GitHub: **Block command line pushes that expose my email**

This is another layer of safety but with it enabled you will get an error on pushing a new branch where somewhere in the history, one of <span style="text-decoration: underline;">your</span> private emails is exposed in a commit.
