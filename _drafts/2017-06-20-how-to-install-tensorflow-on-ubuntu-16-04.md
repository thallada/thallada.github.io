---
title: How to Install TensorFlow on Ubuntu 16.04 with GPU Support
layout: post
---

I found the [tensorflow
documentation](https://www.tensorflow.org/install/install_linux) rather lacking
for installation instructions, especially in regards to getting GPU support.
I'm going to write down my notes from wrangling with the installation here for
future reference and hopefully this helps someone else too.

This will invariably go out-of-date at some point, so be mindful of the publish
date of this post. Make sure to cross-reference other documentation that has
more up-to-date information.

## Assumptions

These instructions are very specific to my environment, so this is what I am
assuming:

1. You are running Ubuntu 16.04. (I have 16.04.1)
    - You can check this in the output of `uname -a`
2. You have a 64 bit machine.
    - You can check this with `uname -m`. (should say `x86_64`)
2. You have an NVIDIA GPU that has CUDA Compute Capability 3.0 or higher.
[NVIDIA documentation] has a full table of cards and their Compute Capabilities.
(I have a GeForce GTX 980 Ti)
    - You can check what card you have in Settings > Details under the label
      "Graphics"
    - You can also check by verifying there is any output when you run `lspci |
      grep -i nvidia`
3. You have a linux kernel version 4.4.0 or higher. (I have 4.8.0)
    - You can check this by running `uname -r`
4. You have gcc version 5.3.1 or higher installed. (I have 5.4.0)
    - You can check this by running `gcc --version`
5. You have the latest [proprietary](https://i.imgur.com/8osspXj.jpg) NVIDIA
drivers installed.
    - You can check this and install it if you haven't in the "Additional
      Drivers" tab in the "Software & Updates" application (`update-manager`).
      (I have version 375.66 installed)
6. You have the kernel headers installed.
    - Just run `sudo apt-get install linux-headers-$(uname -r)` to install them
      if you don't have them installed already.
7. You have Python installed. The exact version shouldn't matter, but for the
rest of this post I'm going to assume you have `python3` installed.
    - You can install `python3` by running `sudo apt-get install python3`. This
      will install Python 3.5.
    - Bonus points: you can install Python 3.6 by following [this
      answer](https://askubuntu.com/a/865569), but Python 3.5 should be fine.

## Install the CUDA Toolkit 8.0

NVIDIA has [a big scary documentation
page](http://docs.nvidia.com/cuda/cuda-installation-guide-linux/) on this, but I
will summarize the only the parts you need to know here.

Go to the [CUDA Toolkit Download](https://developer.nvidia.com/cuda-downloads)
page. Click Linux > x86_64 > Ubuntu > 16.04 > deb (network).

Click download and then follow the instructions, copied here:

1. `sudo dpkg -i cuda-repo-ubuntu1604_8.0.61-1_amd64.deb`
2. `sudo apt-get update`
3. `sudo apt-get install cuda`

This will install CUDA 8.0. It installed it to the directory
`/usr/local/cuda-8.0/` on my machine.

There are some [post-install
actions](http://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#post-installation-actions)
we must follow:

1. Edit your `~/.bashrc`
    - Use your favorite editor `gedit ~/.bashrc`, `nano ~/.bashrc`, `vim
      ~/.bashrc`, whatever.
2. Add the following lines to the end of the file:
```bash
# CUDA 8.0 (nvidia) paths
export CUDA_HOME=/usr/local/cuda-8.0
export PATH=/usr/local/cuda-8.0/bin${PATH:+:${PATH}}
export LD_LIBRARY_PATH=/usr/local/cuda-8.0/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
```
3. Save and exit.
4. Run `source ~/.bashrc`.
5. Install writable samples by running the script `cuda-install-samples-8.0.sh
~/`.
   - If the script cannot be found, the above steps didn't work :(
   - I don't actually know if the samples are absolutely required for what I'm
     using CUDA for, but it's recommended according to NVIDIA, and compiling
     them will output a nifty `deviceQuery` binary which can be ran to test if
     everything is working properly.
6. Make sure `nvcc -V` outputs something.
   - If an error, the above steps 1-4 didn't work :(
7. `cd ~/NVIDIA_CUDA-8.0_Samples`, cross your fingers, and run `make`
   - The compile will take a while
   - My compile actually errored near the end with an error about `/usr/bin/ld:
     cannot find -lcudart`. I *think* that doesn't really matter because the
     binary files were still output.
8. Try running `~/NVIDIA_CUDA-8.0_Samples/bin/x86_64/linux/release/deviceQuery`
to see if you get any output. Hopefully you will see your GPU listed.

## Install cuDNN v5.1

## Install libcupti-dev

## Create a Virtualenv

## Install the TensorFlow with GPU support
