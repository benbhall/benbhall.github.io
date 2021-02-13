---
title: C# Debug vs. Release builds
subtitle: Builds and debugging in Visual Studio - from novice to expert in one blog article.
excerpt: Builds and debugging in Visual Studio - from novice to expert in one blog article
date: 2018-04-13
permalink: /c-debug-vs-release-builds-and-debugging-in-visual-studio-from-novice-to-expert-in-one-blog-article/
excerpt: ...exploring actual behaviour with Roslyn vs. previous commentary / what the documentation states. So, while I do start with the basics, I hope there is something for more experienced C# developers too.
categories:
  - 'C# .NET'
  - Internals
tags:
  - 'C#'
  - Internals
  - JIT
  - Roslyn
---
<img class="alignnone" src="https://i1.wp.com/benhall.io/wp-content/uploads/2018/04/codeprojectdebugrelease.png?resize=562%2C68" alt="" width="562" height="68" data-recalc-dims="1" />

Super happy to have won First Prize @ [Codeproject](http://benhall.io/c-debug-vs-release-builds-and-debugging-in-visual-studio-from-novice-to-expert-in-one-blog-article/) for this article.

[Repository for my PowerShell script to inspect the DebuggableAttribute of assemblies.](https://github.com/benbhall/DotNetGetDebuggableAttribute)

## **Introduction**

'Out of the box’ the C# build configurations are Debug and Release.

<img class="wp-image-364 alignright" src="https://i0.wp.com/benhall.io/wp-content/uploads/2018/04/releasedebug.png?resize=184%2C101" alt="" width="184" height="101" data-recalc-dims="1" /> 

I planned to write a write an introductory article but as I delved deeper into internals I started exploring actual behaviour with Roslyn vs. previous commentary / what the documentation states. So, while I do start with the basics, I hope there is something for more experienced C# developers too.

Disclaimer: Details will vary slightly for .NET languages other than C#.

## **A reminder of C# compilation**

C# source code passes through 2 compilation steps to become CPU instructions that can be executed.

<img class="aligncenter size-full wp-image-368" src="https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/compilationstepscsharp.png?resize=606%2C223" alt="Diagram showing the 2 steps of compilation in the C# .NET ecosytem" width="606" height="223" srcset="https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/compilationstepscsharp.png?w=606 606w, https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/compilationstepscsharp.png?resize=300%2C110 300w" sizes="(max-width: 606px) 100vw, 606px" data-recalc-dims="1" /> 

As part of your [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration), step 1 would take place on the build server and then step 2 would happen later, whenever the application is being run. When working locally in Visual Studio, both steps, for your convenience, fire off the back of starting the application from the Debug menu.

**Compilation step 1: The application is built** **by the C# compiler**. Your code is turned into Common Intermediate Language (CIL), which can be executed in any environment that supports CIL (which from now on I will refer to as IL). Note that the assembly produced is not readable IL text but actually metadata and byte code as binary data (tools are available to view the IL in a text format).

Some code optimisation will be carried out (more on this further on).

**Compilation  step 2:  The Just-in-time (JIT) compiler** will convert the IL into instructions that the CPU on your machine can execute. This won't all happen upfront though &#8211; in the normal mode of operation, methods are compiled at the time of calling, then cached for later use.

The JIT compiler is just one of a whole bunch of services that make up the Common Language Runtime (CLR), enabling it to execute .NET code.

The bulk of code optimisation will be carried out here (more on this further on).

## **What is compiler optimisation (in one sentence)?**

It is the process of improving factors such as execution speed, size of the code, power usage and in the case of .NET, the time it takes to JIT compiler the code &#8211; all without altering the functionality, aka original intent of the programmer.

## **Why are we concerned with optimisation in this article?**

I've stated that compilers at both steps will optimise your code. One of the key differences between the Debug and Release build configurations is whether the optimsations are disabled or not, so you do need to understand the implications of optimisation.

## **C# compiler optimisation**

The C# compiler does not do a lot of optimisation. It relies '…upon the jitter to do the heavy lifting of optimizations when it generates the real machine code. '  ([Eric Lippert](https://blogs.msdn.microsoft.com/ericlippert/2009/06/11/what-does-the-optimize-switch-do/)). It will nonetheless still degrade the debugging experience.  You don't need in-depth knowledge of C# optimisations to follow this article, but I'll look at one to illustrate the effect on debugging:

**The IL nop instruction (no operation)**

The nop instruction has a number of uses in low level programming, such as including small, predictable delays or overwriting instructions you wish to remove. In IL, it is used to help breakpoints set in the your source code behave predictably when debugging.

If we look at the IL generated for a build with optimisations disabled:

<img class="aligncenter size-full wp-image-370" src="https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/nop.png?resize=314%2C31" alt="nop instruction" width="314" height="31" srcset="https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/nop.png?w=314 314w, https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/nop.png?resize=300%2C30 300w" sizes="(max-width: 314px) 100vw, 314px" data-recalc-dims="1" /> 

This nop instruction directly maps to a curly bracket and allows us to add a breakpoint on it:

<img class="aligncenter size-full wp-image-371" src="https://i1.wp.com/benhall.io/wp-content/uploads/2018/04/nopcurly.png?resize=386%2C32" alt="curly bracket associated with nop instruction" width="386" height="32" srcset="https://i1.wp.com/benhall.io/wp-content/uploads/2018/04/nopcurly.png?w=386 386w, https://i1.wp.com/benhall.io/wp-content/uploads/2018/04/nopcurly.png?resize=300%2C25 300w" sizes="(max-width: 386px) 100vw, 386px" data-recalc-dims="1" /> 

This would be optimised out of IL generated by the C# compiler if optimisations were enabled, with clear implications for your debugging experience.

For a more detailed discussion on C# compiler optimisations see Eric Lippert's article: [What does the optimize switch do?](https://blogs.msdn.microsoft.com/ericlippert/2009/06/11/what-does-the-optimize-switch-do). There is also a good commentary of IL before and after being optimised [here](https://stackoverflow.com/questions/21438751/c-sharp-compiler-optimizations?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa).

## **The JIT compiler optimisations**

Despite having to perform its job swiftly at runtime, the JIT compiler performs a lot of optimisations. There's not much info on its internals and it is a non-deterministic beast (like Forrest Gump’s box of chocolates) &#8211; varying in the native code it produces depending on a many factors. Even while your application is running it is profiling and possibly re-compiling code to improve performance. For a good set of examples of optimisations made by the JIT compiler checkout [Sasha Goldshtein's article](https://www.codeproject.com/Articles/25801/JIT-Optimizations).

I will just look at one example to illustrate the effect of optimisation on your debugging experience:

**Method inlining**

For the real-life optimisation made by the JIT compiler, I'd be showing you assembly instructions. This is just a mock-up in C# to give you the general idea:

Suppose I have:

```csharp
private long Add(int a, int b)
{
    return a + b;
}
public void MethodA()
{
    var r = Add(a, b);
}
```

The JIT compiler would likely perform an inline expansion on this, replacing the call to <span class="lang:c# decode:true crayon-inline ">Add()</span>   with the body of <span class="lang:c# decode:true crayon-inline ">Add()</span>  :

```csharp
public void MethodA()
{
    var r = a + b;
}
```

Clearly, trying to step through lines of code that have been moved is going to be difficult and you'll also have a diminished stack trace.

## **The default build configurations**

So now that you've refreshed your understanding of .NET compilation and the two 'layers' of optimisation, let's take a look at the 2 build configurations available 'out of the box':

<img class="aligncenter size-full wp-image-372" src="https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/defaultbuildconfigs.png?resize=682%2C268" alt="Visual Studio release and debug configurations" width="682" height="268" srcset="https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/defaultbuildconfigs.png?w=682 682w, https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/defaultbuildconfigs.png?resize=300%2C118 300w" sizes="(max-width: 682px) 100vw, 682px" data-recalc-dims="1" /> 

Pretty straightforward &#8211; Release is fully optimised, the Debug is not at all, which as you are now aware, is fundamental to how easy it is to debug your code. But this is just a superficial view of the possibilities with the debug and optimize arguments.

## **The _optimize_ and _debug_ arguments in depth**

I've attempted to diagram these from the Roslyn and mscorlib code, including: [CSharpCommandLineParser.cs](https://github.com/dotnet/roslyn/blob/master/src/Compilers/CSharp/Portable/CommandLine/CSharpCommandLineParser.cs), [CodeGenerator.cs](https://github.com/dotnet/roslyn/blob/9b8aa38370fe6ad4afa10add7fa5a5bac22a9355/src/Compilers/CSharp/Portable/CodeGen/CodeGenerator.cs), [ILEmitStyle.cs](https://github.com/dotnet/roslyn/blob/master/src/Compilers/Core/Portable/CodeGen/ILEmitStyle.cs), [debuggerattributes.cs](https://github.com/Microsoft/referencesource/blob/master/mscorlib/system/diagnostics/debuggerattributes.cs), [Optimizer.cs](https://github.com/dotnet/roslyn/blob/ef41d39c55a63d9464cc4eb5344be4d8df6408d8/src/Compilers/CSharp/Portable/CodeGen/Optimizer.cs) and [OptimizationLevel.cs](http://source.roslyn.io/#Microsoft.CodeAnalysis/Compilation/OptimizationLevel.cs,faae3325158ce920). Blue parallelograms represent command line arguments and the greens are the resulting values in the codebase.

<img class="aligncenter size-full wp-image-373" src="https://i0.wp.com/benhall.io/wp-content/uploads/2018/04/optimizedebugdiagram.png?resize=605%2C377" alt="Diagram of optimize and debug command line arguments and their related settings in code" width="605" height="377" srcset="https://i0.wp.com/benhall.io/wp-content/uploads/2018/04/optimizedebugdiagram.png?w=605 605w, https://i0.wp.com/benhall.io/wp-content/uploads/2018/04/optimizedebugdiagram.png?resize=300%2C187 300w" sizes="(max-width: 605px) 100vw, 605px" data-recalc-dims="1" /> 

## **The OptimizationLevel enumeration**

**OptimizationLevel.Debug** disables all optimizations by the C# compiler and disables JIT optimisations via <span class="lang:c# decode:true crayon-inline ">DebuggableAttribute.DebuggingModes</span>  , which with the help of ildasm, we can see is:

<img class="aligncenter size-full wp-image-375" src="https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/debuggableattribute.png?resize=637%2C31" alt="Manifest debuggable attribute" width="637" height="31" srcset="https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/debuggableattribute.png?w=637 637w, https://i2.wp.com/benhall.io/wp-content/uploads/2018/04/debuggableattribute.png?resize=300%2C15 300w" sizes="(max-width: 637px) 100vw, 637px" data-recalc-dims="1" /> 

Given this is Little Endian Byte order, it reads as 0x107, which is 263, equating to: <span class="lang:c# decode:true crayon-inline ">Default</span> , <span class="lang:c# decode:true crayon-inline ">DisableOptimizations</span> , <span class="lang:c# decode:true crayon-inline ">IgnoreSymbolStoreSequencePoints</span>  and <span class="lang:c# decode:true crayon-inline">EnableEditAndContinue</span>, (see [debuggerattributes.cs](https://github.com/Microsoft/referencesource/blob/master/mscorlib/system/diagnostics/debuggerattributes.cs).

**OptimizationLevel.Release** enables all optimizations by the C# compiler and enables JIT optimizations via <span class="lang:asm decode:true crayon-inline">DebuggableAttribute.DebuggingModes = ( 01 00 02 00 00 00 00 00 )</span> , which is just <span class="lang:c# decode:true crayon-inline ">DebuggingModes.IgnoreSymbolStoreSequencePoints</span> .

With this level of optimization, 'sequence points may be optimized away. As a result it might not be possible to place or hit a breakpoint.' Also, 'user-defined locals might be optimized away. They might not be available while debugging.' ([OptimizationLevel.cs](https://github.com/dotnet/roslyn/blob/master/src/Compilers/Core/Portable/Compilation/OptimizationLevel.cs)).

## **IL type explained** 

The type of IL is defined by the following enumeration from [ILEmitStyle.cs](https://github.com/dotnet/roslyn/blob/master/src/Compilers/Core/Portable/CodeGen/ILEmitStyle.cs).

As in the diagram above, the type of IL produced by the C# compiler is determined by the <span class="lang:c# decode:true crayon-inline ">OptimizationLevel</span> ; the _debug_ argument won't change this, <u>with the exception of <em>debug+</em> when the OptimizationLevel is Release</u> i.e. in all but the case of _debug+_, optimize is the only argument that has any impact on optimisation &#8211; a departure from pre-Roslyn*.

* In Jeffry Richter's CLR Via C# (2014), he states that _optimize-_ with _debug-_ results in the C# compiler not optimising IL and the JIT compiler optimising to native.

**ILEmitStyle.Debug** &#8211; no optimization of IL in addition to adding nop instructions in order to map sequence points to IL

**ILEmitStyle.Release** &#8211; do all optimizations

**ILEmitStyle.DebugFriendlyRelease** &#8211; only perform optimizations on the IL that do not degrade debugging. This is the interesting one. It comes off the back of a _debug+_ and <span style="text-decoration: underline;">only has an effect on optimized builds</span> i.e. those with OptimizationLevel.Release. For _optimize-_ builds _debug+_ behaves as debug.

The logic in ([CodeGenerator.cs](https://github.com/dotnet/roslyn/blob/9b8aa38370fe6ad4afa10add7fa5a5bac22a9355/src/Compilers/CSharp/Portable/CodeGen/CodeGenerator.cs)) describes it more clearly than I can:

```csharp
if(optimizations == OptimizationLevel.Debug)
{
    _ilEmitStyle = ILEmitStyle.Debug;
}
else
{
    _ilEmitStyle = IsDebugPlus() ?
    ILEmitStyle.DebugFriendlyRelease :
    ILEmitStyle.Release;
}
```

The comment in the source file [Optimizer.cs](https://github.com/dotnet/roslyn/blob/ef41d39c55a63d9464cc4eb5344be4d8df6408d8/src/Compilers/CSharp/Portable/CodeGen/Optimizer.cs) states that, they do not omit any user defined locals and do not carry values on the stack between statements. I'm glad I read this, as I was a bit disappointed with my own experiments in ildasm with _debug_+, as all I had been seeing was the retention of local variables and a lot more pushing and popping to and from the stack!

There is no intentional 'deoptimizing' such as adding nop instructions.

There's no obvious direct way to chose this debug flag from within Visual Studio for C# projects? Is anyone making use of this in their production builds?

## **No difference between debug, debug:full and debug:pdbonly?**

Correct &#8211; despite the [current documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/debug-compiler-option) and the help stating otherwise:

<img class="aligncenter size-full wp-image-376" src="https://i0.wp.com/benhall.io/wp-content/uploads/2018/04/cschelp.png?resize=473%2C68" alt="csc command line help" width="473" height="68" srcset="https://i0.wp.com/benhall.io/wp-content/uploads/2018/04/cschelp.png?w=473 473w, https://i0.wp.com/benhall.io/wp-content/uploads/2018/04/cschelp.png?resize=300%2C43 300w" sizes="(max-width: 473px) 100vw, 473px" data-recalc-dims="1" /> 

They all achieve the same result &#8211; **a .pdb file is created**. A peek at [CSharpCommandLineParser.cs](https://github.com/dotnet/roslyn/blob/master/src/Compilers/CSharp/Portable/CommandLine/CSharpCommandLineParser.cs)  can confirm this. And for good measure I did check I could attach and debug with WinDbg for both the _pdbonly_ and _full_ values.

They have no impact on code optimisation.

On the plus side, the [documentation on Github](https://github.com/dotnet/roslyn/blob/master/docs/compilers/CSharp/CommandLine.md) is more accurate, although I'd say, still not very clear on the special behaviour of _debug+_.

**I'm new.. what's a .pdb?** Put simply, a .pdb file stores debugging information about your DLL or EXE, which will help a debugger map the IL instructions to the original C# code.

## **What about debug+?**

_debug+_ is its own thing and cannot be suffixed by either _full_ or _pdbonly_. Some commentators suggest it is the same thing as _debug:full_, which is not exactly true as stated above &#8211; used with _optimize-_ it is indeed the same, but when used with _optimize+_ it has its own unique behaviour, discussed above under `DebugFriendlyRelease`.

## **And debug- or no debug argument at all?**

The defaults in [CSharpCommandLineParser.cs](https://github.com/dotnet/roslyn/blob/master/src/Compilers/CSharp/Portable/CommandLine/CSharpCommandLineParser.cs) are:

```csharp
bool debugPlus = false;
bool emitPdb = false;
```

The values for debug- are:

```csharp
case "debug-":
    if (value != null)
        break;

    bool emitPdb = false;
    bool debugPlus = false;</pre>
```

So we can confidently say debug- and no debug argument result in the same  single effect &#8211; **no .pdb file is created**.

They have no impact on code optimisation.

## **Suppress JIT optimizations on module load**

A checkbox under Options->Debugging->General; this is an option <u>on the debugger in Visual Studio</u> and is not going to affect the assemblies you build.

You should now appreciate that the JIT compiler does most of the significant optimisations and is the bigger hurdle to mapping back to the original source code for debugging. With this enabled, the debugger will request that `DisableOptimizations` is ignored by the JIT compiler.

Until circa 2015 the default was enabled. I earlier cited CLR via C#, in that pre-Roslyn we could supply optimise- and debug- arguments to csc.exe and get unoptimised C# that was then optimised by the JIT compiler &#8211; so there would have been some use for suppressing the JIT optimisations in the Visual Studio debugger. However, now that anything being JIT optimised is already degrading the debugging experience via C# optimisations, [Microsoft decided to default to disabled](https://blogs.msdn.microsoft.com/devops/2015/08/14/debugging-optimized-code) on the assumption that if you are running the Release build inside Visual Studio, you probably wish to see the behaviour of an optimised build at the expense of debugging.

Typically you only need to switch it on if you need to debug into DLLs from external sources such as NuGet packages.

If you're trying to attach from Visual Studio to a Release build running in production (with a .pdb or other source for symbols) then an alternative way to instruct the JIT compiler not to optmiize is to add a .ini file with the same name as your executable along side it with the following:

```ini
[.NET Framework Debugging Control]
AllowOptimize=0
```

## **Just My Code.. What?**

By default, _Options->Debugging→Enable Just My Code_ is enabled and the [debugger considers optimised code to be non-user](https://docs.microsoft.com/en-us/visualstudio/debugger/just-my-code). The debugger is never even going to attempt non-user code with this enabled.

You could uncheck this option, and then theoretically you can hit breakpoints. But now you are debugging code optimised by both the C# and JIT compilers that barely matches your original source code, with a super-degraded experience &#8211; stepping through code will be unpredictable you will probably not be able to obtain the values in local variables.

You should only really be changing this option if working with DLLs from others where you have the .pdb file.

## **A closer look at DebuggableAttribute**

Above, I mentioned using ildasm to examine the manifest of assemblies to examine `DebuggableAttribute`. I've also written a little PowerShell script to produce a friendlier result (available via download link at the start of the article).

Debug build:

<img class="aligncenter size-full wp-image-377" src="https://i1.wp.com/benhall.io/wp-content/uploads/2018/04/debuggableattribute-debug.png?resize=528%2C70" alt="" width="528" height="70" srcset="https://i1.wp.com/benhall.io/wp-content/uploads/2018/04/debuggableattribute-debug.png?w=528 528w, https://i1.wp.com/benhall.io/wp-content/uploads/2018/04/debuggableattribute-debug.png?resize=300%2C40 300w" sizes="(max-width: 528px) 100vw, 528px" data-recalc-dims="1" /> 

Release build:

<img class="aligncenter size-full wp-image-378" src="https://i1.wp.com/benhall.io/wp-content/uploads/2018/04/debuggableattribute-release.png?resize=527%2C64" alt="" width="527" height="64" srcset="https://i1.wp.com/benhall.io/wp-content/uploads/2018/04/debuggableattribute-release.png?w=527 527w, https://i1.wp.com/benhall.io/wp-content/uploads/2018/04/debuggableattribute-release.png?resize=300%2C36 300w" sizes="(max-width: 527px) 100vw, 527px" data-recalc-dims="1" /> 

You can ignore **IsJITTrackingEnabled**, as it is has been ignored by the JIT compiler since .NET 2.0. The JIT compiler will always generate tracking information during debugging to match up IL with its machine code and track where local variables and function arguments are stored ([Source](https://msdn.microsoft.com/en-us/library/system.diagnostics.debuggableattribute.isjittrackingenabled(v=vs.110).aspx)).

**IsJITOptimizerDisabled** simply checks `DebuggingFlags` for DebuggingModes.**DisableOptimizations**. This is the one that turns on optimisation by the JIT compiler.

DebuggingModes.**IgnoreSymbolStoreSequencePoints** tells the debugger to work out the sequence points from the IL instead of loading the .pdb file, which would have performance implications. Sequence points are used to map locations in the IL code to locations in your C# source code. The JIT compiler will not compile any 2 sequence points into a single native instruction. With this flag, the JIT will not load the .pdb file. I'm not sure why this flag is being added to optimised builds by the C# compiler &#8211; any thoughts?

## **Key points**

* _debug-_ (or no _debug_ argument at all) now means: do not create a .pdb file.
* _debug_, _debug:full_ and _debug:pdbonl_y all now causes a .pdb file to be output. _debug+_ will also do the same thing if used alongside _optimize-_.
* _debug+_ is special when used alongside _optimize+,_ creating IL that is easier to debug.
* each 'layer' of optimisation (C# compiler, then JIT) further degrades your debugging experience. You will now get both 'layers' for _optimize+_ and neither of them for _optimize-_.
* since .NET 2.0 the JIT compiler will always generate tracking information regardless of the attribute <`IsJITTrackingEnabled</span>
* whether building via VS or csc.exe, the `DebuggableAttribute` is now always present
* the JIT can be told to ignore `IsJITOptimizerDisabled` during Visual Studio debugging via the general debugging option, Suppress JIT optimizations on module load. It can also be instructed to do so via a .ini file
* _optimised+_ will create binaries that the debugger considers non-user code. You can disable the option Just My Code, but expect a severely degraded debugging experience,

**You have a choice of:**

* Debug: debug|debug:full|debug:pdbonly optimize+
* Release: debug-|no debug argument optimize+
* DebugFriendlyRelease: debug+ optimize+

However,`DebugFriendlyRelease` is only possible by calling Roslyn csc.exe directly. I would be interested to hear from anyone that has been using this.