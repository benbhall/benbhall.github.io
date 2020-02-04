---
id: 326
title: 'Addressing a simple yet common C# Async/Await misconception'
date: 2018-01-28T11:12:10+00:00
author: Ben Hall
layout: post
guid: http://benhall.io/?p=326
permalink: /correcting-a-common-c-async-await-misconception/
tdesc: Async/await has been part of C# since C# 5.0 yet many developers have yet to explore how it works under the covers, which I would recommend for any syntactic sugar in C#. I won&#8217;t be going into that level of detail now, nor will I explore the subtleties of IO and CPU bound operations.
categories:
  - Asynchronous
  - 'C# .NET'
tags:
  - Asynchronous
  - 'C#'
---
[<img class="alignnone" src="https://i0.wp.com/benhall.io/wp-content/uploads/2018/01/bestAsync2.png?resize=563%2C52" alt="" width="563" height="52" data-recalc-dims="1" />](https://www.codeproject.com/Articles/1229574/Addressing-a-Simple-Yet-Common-Csharp-Async-Await)  
Super happy to have won First Prize @ [Codeproject](https://www.codeproject.com/Articles/1229574/Addressing-a-Simple-Yet-Common-Csharp-Async-Await) for this article.

[Git repository with example code discussed in this article.](https://github.com/benbhall/AsyncAwaitBehaviourDemo)

Async/await has been part of C# since C# 5.0 yet many developers have yet to explore how it works under the covers, which I would recommend for any syntactic sugar in C#. I won&#8217;t be going into that level of detail now, nor will I explore the subtleties of IO and CPU bound operations.

## The common misconception

<p style="text-align: center;">
  <strong><span style="color: #800000;">That awaited code executes in parallel to the code that follows.</span></strong>
</p>

i.e. in the following code, `LongOperation()` is called and awaited, and while this is executing, and before it has completed, the code ‘doing other things’ will start being executed.

<pre class="lang:c# decode:true">void DemoAsyncAwait()
{
    WithAwaitAtCallAsync().Wait();
}

async Task WithAwaitAtCallAsync()
{
    await LongOperation();

    // do other things
}</pre>

This is not how it behaves.

In the above code, what actually happens is that the `await` operator causes `WithAwaitAtCallAsync()` to suspend at that line and returns control back to `DemoAsyncAwait()` until the awaited task, `LongOperation()`, is complete.

When `LongOperation()` completes, then ‘do other things’ will be executed.

## And if we don&#8217;t await when we call?

Then you do get that behaviour some developers innocently expect from awaiting the call, where `LongOperation()` is left to complete in the background while continuing on with  `WithoutAwaitAtCallAsync() `in parallel, &#8216;doing other things&#8217;:

<pre class="lang:c decode:true">void DemoAsyncAwait()
{
    WithoutAwaitAtCallAsync().Wait(); 
}

async Task WithoutAwaitAtCallAsync() 
{ 
    Task task = LongOperation();

    // doing other things 

    await task;

    // more things to do
}</pre>

However, if `LongOperation()` is not complete when we reach the awaited Task it returned, then it yields control back to `DemoAsyncAwait()`, as above. It does not continue to complete &#8216;more things to do&#8217; &#8211; not until the awaited task is complete.

## Complete Console Application Example

Some notes about this code:

  * Always use `await` over `Task.Wait()` to retrieve the result of a background task (outside of this demo) to avoid blocking. I&#8217;ve used `Task.Wait()` it in my demonstrations to force blocking and prevent the two separate demo results overlapping in time.
  * I have intentioinally not used Task.Run() as I don&#8217;t want to confuse things with new threads. Let&#8217;s just assume `LongOperation()` is IO-bound.
  * I used `Task.Delay()` to simulate the long operation. `Thread.Sleep()` would block the thread

<pre class="lang:c# decode:true">private static void Main(string[] args)
{
    // Demo 1
    Console.WriteLine(" Demo 1: Awaiting call to long operation:");
    Task withAwaitAtCallTask = WithAwaitAtCallAsync();
    withAwaitAtCallTask.Wait();

    // Demo 2
    Console.WriteLine(" Demo 2: NOT awaiting call to long operation:");
    Task withoutAwaitAtCallTask = WithoutAwaitAtCallAsync();
    withoutAwaitAtCallTask.Wait();

    Console.ReadKey();
}

private static async Task WithAwaitAtCallAsync()
{ 
    Console.WriteLine(" WithAwaitAtCallAsync() entered.");

    Console.WriteLine(" Awaiting when I call LongOperation().");
    await LongOperation();

    Console.WriteLine(" Pretending to do other work in WithAwaitAtCallAsync().");
}

private static async Task WithoutAwaitAtCallAsync()
{
    Console.WriteLine(" WithoutAwaitAtCallAsync() entered.");

    Console.WriteLine(" Call made to LongOperation() with NO await.");
    Task task = LongOperation();

    Console.WriteLine(" Do some other work in WithoutAwaitAtCallAsync() after calling LongOperation().");

    await task;
}

private static async Task LongOperation()
{
    Console.WriteLine(" LongOperation() entered.");

    Console.WriteLine(" Starting the long (3 second) process in LongOperation()...");
    await Task.Delay(4000);
    Console.WriteLine(" Completed the long (3 second) process in LongOperation()...");
}</pre>

This is what happens when the code is executed (with colouring):

<img class="aligncenter wp-image-347" src="https://i2.wp.com/benhall.io/wp-content/uploads/2018/01/async_demo2.gif?resize=560%2C239" alt="" width="560" height="239" data-recalc-dims="1" /> 

&nbsp;

## Conclusion

If you use the `await` keyword when calling an `async` method from inside an `async` method, execution of the calling method is suspended to avoid blocking the thread and control is passed (or yielded) back up the method chain. If, on its journey up the chain, it reaches a call that was not awaited, then code in that method is able to continue in parallel to the remaining processing in the chain of awaited methods until it runs out of work to do, and then needs to `await` the result, which is inside the Task object returned by `LongOperation()`.``​​​​​​​

<a style="display: none;" href="https://www.codeproject.com" rel="tag">CodeProject</a>