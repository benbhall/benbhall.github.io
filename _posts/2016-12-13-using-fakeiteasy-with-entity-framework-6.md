---
id: 74
title: Using FakeItEasy with Entity Framework 6
date: 2016-12-13T15:51:44+00:00
author: Ben Hall
layout: post
guid: http://benhall.io/?p=74
permalink: /using-fakeiteasy-with-entity-framework-6/
categories:
  - EF6
tags:
  - .NET
  - 'C#'
  - EF6
  - Entity Framework
  - FakeItEasy
  - ORM
---
**What this article is about**

I have quickly become a fan of FakeItEasy. If you are not familiar with it, visit <https://fakeiteasy.github.io/> and check out the super fluent interface yourself.

I couldn&#8217;t resist looking for a way to quickly fake out EF6 and I am going to share how that went.

**What I will not be discussing**

  * The differences between mocks, stubs and so on (see [Gerard Meszaro](http://xunitpatterns.com/Mocks%2c%20Fakes%2c%20Stubs%20and%20Dummies.html)<u>&#8216;s list</u> for that)
  * The usefulness of mocking ORMs
  * The limitations of in-memory test doubles for a database

**  
Background – testing with EF5**

In EF5 (before my time [pharmaciepourhomme.fr](https://pharmaciepourhomme.fr/)!) we would create a mock DbSet class that implemented IDbSet, with a whole load of properties and methods. Then create an interface for a DbContext and implement that with a mocked context. I did this following the instructions [here](https://romiller.com/2012/02/14/testing-with-a-fake-dbcontext/) and it generated quite a lot of code to maintain for my relatively small project.

**Changes in EF6**

In EF6, DbSet gained an additional **protected internal** constructor. So instead of creating all those mocks, we mark the DbSet properties virtual, allowing FakeItEasy to override them:

<pre class="lang:c# decode:true">public virtual DbSet&lt;Product&gt; Products { get; set; }</pre>

**  
Working with the DbSet methods**

This is fairly straightforward and requires the behaviour of any DbSet method called to be defined.

Create instances of a fake context and fake DbSet, arrange the behaviour for calls to the Products getter and calls to the Add method on the DbSet:

<pre class="lang:c# decode:true ">var fakeContext = A.Fake&lt;ApplicationDbContext&gt;();
var fakeDbSet = A.Fake&lt;DbSet&lt;Product&gt;&gt;();
A.CallTo(() =&gt; mockContext.Products).Returns(fakeDbSet);
A.CallTo(() =&gt; fakeDbSet.Add(A&lt;Product&gt;.Ignored)).Returns(fakeProduct);</pre>

Why not setup calls direct to the methods given as we need to define their behaviour individually?

<pre class="lang:c# decode:true ">A.CallTo(() =&gt; fakeContext.Products.Add(A&lt;Product&gt;.Ignored)).Returns(fakeProduct);</pre>

We can but I prefer the first way as it has clearer logic and keeps things consistent with the way we can work with LINQ extension methods below. Opinions?

Note that there is no difference in arrangement between DbSet&#8217;s asynchronous and non-asynchronous methods.

**  
Working with the LINQ extension methods (non-asynchronously)**

So what if the method under test is using LINQ extension methods on the DbSet?

<pre class="lang:c# decode:true ">_dbContext.Products.Where(p =&gt; p.Id == 2).Select(d =&gt; new...</pre>

On the face of it these are tidier to work with because after setting up your fake DbSet, LINQ-to-Objects kicks in and there is no need to identify the behaviour of individual methods. We will take advantage of DbSet  implementing IQueryable:

<pre class="lang:c# decode:true ">public class DbSet&lt;TEntity&gt; : DbQuery&lt;TEntity&gt;, IDbSet&lt;TEntity&gt;,

        IQueryable&lt;TEntity&gt;, IEnumerable&lt;TEntity&gt;, IQueryable, IEnumerable

where TEntity : class</pre>

For our in-memory storage we will use a List that implements IQueryable, which allows us to return its properties and method to use in the fake DbSet.

<pre class="lang:c# decode:true ">IQueryable&lt;Product&gt; fakeIQueryable =

      new List&lt;Product&gt;().AsQueryable();</pre>

Next, we setup the fake DbSet. Note that FakeItEasy needs to be told explicitly to implement IQueryable in order for the Castle proxy to intercept.

<pre class="lang:c# decode:true ">var fakeDbSet = A.Fake&lt;DbSet&lt;Product&gt;&gt;( (d =&gt; d

    .Implements(typeof(IQueryable&lt;Product&gt;)));</pre>

To setup the behaviour for the DbSet under LINQ methods we can &#8216;redirect&#8217; all calls to the method and properties of the IQueryable interface to the fakeIQueryable.

<pre class="lang:c# decode:true ">A.CallTo(() =&gt; ((IQueryable&lt;Product&gt;)fakeDbSet).GetEnumerator())

  .Returns(fakeIQueryable .GetEnumerator());

A.CallTo(() =&gt; ((IQueryable&lt;Product&gt;)fakeDbSet).Provider)

  .Returns(fakeIQueryable .Provider);

A.CallTo(() =&gt; ((IQueryable&lt;Product&gt;)fakeDbSet).Expression)

  .Returns(fakeIQueryable .Expression);

A.CallTo(() =&gt; ((IQueryable&lt;Product&gt;)fakeDbSet).ElementType)

  .Returns(fakeIQueryable .ElementType);</pre>

Finally, we setup the fake context and its behaviour when the Products DbSet getter is called; then go ahead and instantiate the object under test, passing it the fake context and a dummy to the Get method.

<pre class="lang:c# decode:true ">var fakeContext = A.Fake&lt;ApplicationDbContext&gt;();

A.CallTo(() =&gt; fakeContext.Products).Returns(fakeDbSet);

var productRepository = new ProductRepository(fakeContext);

var results = productRepository.Get(A&lt;int&gt;.Ignored);</pre>

&nbsp;

**Working with the LINQ extension methods (asynchronously)**

Problem 1: What if we used a similar test arrangement for a test method that calls an asynchronous LINQ extension method? e.g.

<pre class="lang:c# decode:true ">await _dbContext.Products.SingleOrDefaultAsync(e =&gt; e.Id == id);</pre>

We get an error: The provider for the source IQueryable does not implement IDbAsyncQueryProvider…

So here we must change our behaviour for the Provider property. I have made use of a class [provided by MSDN](https://msdn.microsoft.com/en-us/library/dn314429%28v=vs.113%29.aspx) that wraps up our fakeIQueryable to provide an implementation of IDbAsyncQueryProvider:

<pre class="lang:c# decode:true ">await _dbContext.Products.SingleOrDefaultAsync(e =&gt; e.Id == id);A.CallTo(() =&gt; ((IQueryable&lt;Product&gt;)fakeDbSet).Provider)

               .Returns(new TestDbAsyncQueryProvider&lt;Product&gt;( fakeIQueryable.Provider));</pre>

Problem 2: What if we want to enumerate through the DbSet asynchronously?

<pre class="lang:c# decode:true ">IEnumerable&lt;Product&gt; products = await _dbContext.Products.ToListAsync();</pre>

We&#8217;ll get a different error message, and the solution here is to use another class provided in the link above to wrap up our fakeIQueryable to implement IDbAsyncEnumerator, replacing the original call to GetEnumerator form earlier.

<pre class="lang:c# decode:true ">A.CallTo(() =&gt; ((IDbAsyncEnumerable&lt;Product&gt;)fakeDbSet).GetAsyncEnumerator())

         .Returns(new TestDbAsyncEnumerator&lt;Product&gt;(mockIQueryable.GetEnumerator()));</pre>

FakeItEasy now also needs to be told to implement IDbAsyncEnumerable.

<pre class="lang:c# decode:true ">var fakeDbSet = A.Fake&lt;DbSet&lt;Product&gt;&gt;(d =&gt; d

  .Implements(typeof(IDbAsyncEnumerable&lt;Product&gt;))

  .Implements(typeof(IQueryable&lt;Product&gt;)));</pre>

&nbsp;

**Validation**

I did not have time to look at FakeItEasy and EF&#8217;s validation in depth.

I briefly considered one scenario where we might be relying on EF for our data validation, catching any DbEntityValidationException. We could quite easily check how our code handles validation errors by throwing a DbEntityValidationException e.g.

<pre class="lang:c# decode:true ">A.CallTo(() =&gt; mockContext.SaveChangesAsync()).Throws(new DbEntityValidationException());</pre>

Then construct an IEnumerable of DbEntityValidationResult . However, this is just theory and I have not tried this myself yet!

**  
Summary**

If you are already using FakeItEasy in your tests, it is quite nice for consistency to be able to use it with Entity Framework without having to maintain mock code for DbContext and DbSet.

There are obvious limitations to how much behaviour can be faked this way. I did say I would not be debating the merits of mocking an ORM but here are just two issues with mocking EF:

  * The differences in behaviour between LINQ-to-Objects and LINQ-to-Entities are many &#8211; there is a good [Stackoverlow.com answer here](http://stackoverflow.com/questions/13332002/how-to-mock-the-limitations-of-entityframeworks-implementation-of-iqueryable/13352779#13352779) detailing some of these.
  * Mocking the behaviour of EF&#8217;s validation would likely be unmanageable

I would be interested in hearing others&#8217; experiences of scenarios where it has been useful to mock EF.

**  
Other options**

There are a few other efforts (get the [reference](https://effort.codeplex.com/)?) out there to provide support for testing EF but they are often poorly maintained. Highway.Data looks interesting but I have not tried it yet ([link](http://hwyfwk.com/projects/data/)).

.NET Core now has an InMemory provider for testing ([link](https://docs.efproject.net/en/latest/miscellaneous/testing.html)).

&nbsp;  
<a href="http://benhall.io/" rel="tag" style="display:none">CodeProject</a>