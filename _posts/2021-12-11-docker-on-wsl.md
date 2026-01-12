---
title: Manual Docker Setup on Windows
excerpt: An alternative using WSL 2, where Docker Desktop is not available to you in Windows
date: 2021-12-11
permalink: /docker-wsl-2/
categories:
  - Containers
tags: [Docker, WSL]
---

If, like me, you're moving between a number of environments for development, you may not always have access to Docker Desktop.

Well, don't panic! It is still possible to get up and running in Windows without Docker Desktop. Why? Because we're developers with super powers and there is *nothing* we cannot do when we're given the time to solve a problem.

Notice I said 'given the time' - just because we can, doesn't mean we should all of the time.  It's complicated and comes with an ongoing commitment to maintaining it all - not ideal for productivity, and your security team won't be pleased if you don't keep everything patched.

That said, there have been occasions when Docker Desktop has not been available to me and it has been useful to know how to use Docker in Windows, nonetheless.

In this article I'll walk you through the process that I follow with Windows Subsystem for Linux (WSL) 2 that lives in a small executable, wsl.exe, in c:\windows\system32. It will allow us to run Linux containers natively on Windows, without emulation.

## Prerequisites

These are shared with Docker Desktop so, if you had previously setup Docker Desktop, you may not need to complete these.

1. Install Windows 10 version 1903 or higher or Windows 11.
2. Enable the WSL 2 feature on Windows.
3. Download and install the Linux kernel update package.

## Creating a WSL 2 Distribution

1\. First, install a Linux distro on WSL 2 - either from the Microsoft Store or from the command line. I'm using Ubuntu in this example.

```powershell
wsl --install -d Ubuntu
```

2\. When the installation completes, an automatic process to create a non-root user begins. Other distros may require you to configure a non-root user and sudo access yourself.

3\. You should also confirm the command installed WSL 2 (not v1):

```powershell
wsl --list --verbose
```

4\. And if it did not, run the following command to upgrade it to v2:

```powershell
wsl --set-version Ubuntu 2
```

5\. Remember, you will be managing this VM yourself, so now is a good time to update the Ubuntu distro. Switch to your Ubuntu distro’s WSL 2 Bash shell:

```powershell
wsl --distribution Ubuntu
```

And run:

```bash
sudo apt update && sudo apt upgrade
```

Next, install Docker manually by setting up Docker Engine and launching `dockerd`. Refer to the complete official [guide for Ubuntu](https://docs.docker.com/engine/install/ubuntu/) if you get stuck, but the steps below should get you started.

## Setting up the Docker Repository

Continue in your VM Bash shell.

1\. Install packages to allow apt to use a repository over HTTPS:

```bash
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

2\. Add Docker’s official GPG key:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

3\. Use the *stable* repository:

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

## Installing Docker Engine on the WSL 2 VM

Continue in your VM Bash shell.

1\. Update the apt package index next:

```bash
sudo apt-get update
```

2\. For this example, install the latest version of Docker Engine and `containerd` with the following command:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

3\. Test it with the following command:

```bash
sudo docker run hello-world
```

You have now manually installed the Docker Engine on an Ubuntu WSL 2 VM. However, since you’re managing it yourself, there’s still more to do.

## Additional Setup and Challenges

To manage Docker as a non-root user, rather than using `sudo` to run Docker commands, you must create a group, add a user, and possibly modify some file permissions. I won’t go through the details here, but you can follow the [post-installation steps for Linux](https://docs.docker.com/engine/install/linux-postinstall/) if you've got the time to do a proper job.

The post-installation steps also offer guidance on other challenges you might face while managing your own Docker VM, such as:

- Configuring Docker to start on boot
- Logging
- Accepting connections to Docker daemon from remote hosts
- Configuring remote access
- Enabling IPv6
- Fixing IP forwarding problems

## Troubleshooting: Cannot Connect to the Docker Daemon

You were warned - Docker Engine and WSL 2 VM setup is a complex operation to take on. You’re now the admin of a Linux system and responsible for solving any problems. For example, you may have received the following error when you tried to run `hello-world`:

![Cannot connect to the Docker daemon](/assets/images/docker/dockerconnect.png)

You received this error because you are not working with a Debian-based distribution and must start the Docker service manually using `systemctl` or the `service` command. You probably won’t have `systemctl` out-of-the-box with the Ubuntu WSL distro, so use the service command:

```bash
sudo service docker start
```

When you rerun the `hello-world` test, you should now get a `“Hello from Docker!”`.
