---
title: Using FakeItEasy with Entity Framework 6
date: 2016-12-13
permalink: /using-fakeiteasy-with-entity-framework-6/
redirect_from:
  - /2016/12/13/using-fakeiteasy-with-entity-framework-6/
classes: wide
excerpt: In EF6, DbSet gained an additional protected internal constructor. So instead of creating lots of mocks, we mark the DbSet properties virtual, allowing FakeItEasy to override them.
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

## What this article is about

I have quickly become a fan of FakeItEasy. If you are not familiar with it, visit <https://fakeiteasy.github.io/> and check out the super fluent interface yourself.

I couldn't resist looking for a way to quickly fake out EF6 and I am going to share how that went.

## What I will not be discussing

* The differences between mocks, stubs and so on (see [Gerard Meszaro's list](http://xunitpatterns.com/Mocks%2c%20Fakes%2c%20Stubs%20and%20Dummies.html) for that)
* The usefulness of mocking ORMs
* The limitations of in-memory test doubles for a database

## Background – testing with EF5

In EF5 (before my time) we would create a mock `DbSet` class that implemented `IDbSet`, with a whole load of properties and methods. Then create an interface for a `DbContext` and implement that with a mocked context. I did this following the instructions [here](https://romiller.com/2012/02/14/testing-with-a-fake-dbcontext/) and it generated quite a lot of code to maintain for my relatively small project.

## Changes in EF6

In EF6, `DbSet` gained an additional `protected internal` constructor. So instead of creating all those mocks, we mark the `DbSet` properties virtual, allowing FakeItEasy to override them:

```csharp
public virtual DbSet<Product> Products { get; set; }
```
  
## Working with the DbSet methods

This is fairly straightforward and requires the behaviour of any DbSet method called to be defined.

Create instances of a fake context and fake DbSet, arrange the behaviour for calls to the Products getter and calls to the Add method on the DbSet:

```csharp
var fakeContext = A.Fake<ApplicationDbContext>();
var fakeDbSet = A.Fake<DbSet<Product>>();
A.CallTo(() => mockContext.Products).Returns(fakeDbSet);
A.CallTo(() => fakeDbSet.Add(A<Product>.Ignored)).Returns(fakeProduct);
```

Why not setup calls direct to the methods given as we need to define their behaviour individually?

```csharp
A.CallTo(() => fakeContext.Products.Add(A<Product>.Ignored)).Returns(fakeProduct);
```

We can but I prefer the first way as it has clearer logic and keeps things consistent with the way we can work with LINQ extension methods below. Opinions?

Note that there is no difference in arrangement between `DbSet`'s asynchronous and non-asynchronous methods.

## Working with the LINQ extension methods (non-asynchronously)

So what if the method under test is using LINQ extension methods on the DbSet?

```csharp
_dbContext.Products.Where(p => p.Id == 2).Select(d => new...
```

On the face of it these are tidier to work with because after setting up your fake DbSet, LINQ-to-Objects kicks in and there is no need to identify the behaviour of individual methods. We will take advantage of DbSet  implementing IQueryable:

```csharp
public class DbSet<TEntity> : DbQuery<TEntity>, IDbSet<TEntity>,
        IQueryable<TEntity>, IEnumerable<TEntity>, IQueryable, IEnumerable
        where TEntity : class
```

For our in-memory storage we will use a ```List``` that implements ```IQueryable```, which allows us to return its properties and method to use in the fake ```DbSet```.

```csharp
IQueryable<Product> fakeIQueryable = new List<Product>().AsQueryable();
````

Next, we setup the fake DbSet. Note that FakeItEasy needs to be told explicitly to implement IQueryable in order for the Castle proxy to intercept.

```csharp
var fakeDbSet = A.Fake<DbSet<Product>>( (d => 
                  d.Implements(typeof(IQueryable<Product>)));
```

To setup the behaviour for the DbSet under LINQ methods we can 'redirect' all calls to the method and properties of the IQueryable interface to the fakeIQueryable.

```csharp
A.CallTo(() => ((IQueryable<Product>)fakeDbSet).GetEnumerator())
    .Returns(fakeIQueryable .GetEnumerator());
A.CallTo(() => ((IQueryable<Product>)fakeDbSet).Provider)
    .Returns(fakeIQueryable .Provider);
A.CallTo(() => ((IQueryable<Product>)fakeDbSet).Expression)
    .Returns(fakeIQueryable .Expression);
A.CallTo(() => ((IQueryable<Product>)fakeDbSet).ElementType)
  .Returns(fakeIQueryable .ElementType);
```

Finally, we setup the fake context and its behaviour when the Products DbSet getter is called; then go ahead and instantiate the object under test, passing it the fake context and a dummy to the Get method.

```csharp
var fakeContext = A.Fake<ApplicationDbContext>();

A.CallTo(() => fakeContext.Products).Returns(fakeDbSet);

var productRepository = new ProductRepository(fakeContext);

var results = productRepository.Get(A<int>.Ignored);
```

## Working with the LINQ extension methods (asynchronously)

Problem 1: What if we used a similar test arrangement for a test method that calls an asynchronous LINQ extension method? e.g.

```csharp
await _dbContext.Products.SingleOrDefaultAsync(e => e.Id == id);
```

We get an error: The provider for the source `IQueryable` does not implement `IDbAsyncQueryProvider`.

So here we must change our behaviour for the Provider property. I have made use of a class [provided by MSDN](https://msdn.microsoft.com/en-us/library/dn314429%28v=vs.113%29.aspx) that wraps up our fakeIQueryable to provide an implementation of IDbAsyncQueryProvider:

```csharp
await _dbContext.Products.SingleOrDefaultAsync(e => e.Id == id);A.CallTo(() => ((IQueryable<Product>)fakeDbSet).Provider)
              .Returns(new TestDbAsyncQueryProvider<Product>( fakeIQueryable.Provider));
```

Problem 2: What if we want to enumerate through the DbSet asynchronously?

```csharp
IEnumerable<Product> products = await _dbContext.Products.ToListAsync();
```

We'll get a different error message, and the solution here is to use another class provided in the link above to wrap up our `fakeIQueryable` to implement `IDbAsyncEnumerator`, replacing the original call to `GetEnumerator` from earlier.

```csharp
A.CallTo(() => ((IDbAsyncEnumerable<Product>)fakeDbSet).GetAsyncEnumerator())
         .Returns(new TestDbAsyncEnumerator<Product>(mockIQueryable.GetEnumerator()));
```

FakeItEasy now also needs to be told to implement `IDbAsyncEnumerable`.

```csharp
var fakeDbSet = A.Fake<DbSet<Product>>(d => d
  .Implements(typeof(IDbAsyncEnumerable<Product>))
  .Implements(typeof(IQueryable<Product>)));</pre>
```

## Validation

I did not have time to look at FakeItEasy and EF's validation in depth.

I briefly considered one scenario where we might be relying on EF for our data validation, catching any `DbEntityValidationException`. We could quite easily check how our code handles validation errors by throwing a `DbEntityValidationException` e.g.

```csharp
A.CallTo(() => mockContext.SaveChangesAsync()).Throws(new DbEntityValidationException());
```

Then construct an `IEnumerable` of `DbEntityValidationResult`. However, this is just theory and I have not tried this myself yet!

## Summary

If you are already using FakeItEasy in your tests, it is quite nice for consistency to be able to use it with Entity Framework without having to maintain mock code for `DbContext` and `DbSet`.

There are obvious limitations to how much behaviour can be faked this way. I did say I would not be debating the merits of mocking an ORM but here are just two issues with mocking EF:

  * The differences in behaviour between LINQ-to-Objects and LINQ-to-Entities are many. There is a good [Stackoverlow.com answer here](http://stackoverflow.com/questions/13332002/how-to-mock-the-limitations-of-entityframeworks-implementation-of-iqueryable/13352779#13352779) detailing some of these.
  * Mocking the behaviour of EF's validation would likely be unmanageable

I would be interested in hearing others' experiences of scenarios where it has been useful to mock EF.

## Other options

There are a few other efforts (get the [reference](https://effort.codeplex.com/)?) out there to provide support for testing EF but they are often poorly maintained. Highway.Data looks interesting but I have not tried it yet ([link](http://hwyfwk.com/projects/data/)).

.NET Core now has an InMemory provider for testing ([link](https://docs.efproject.net/en/latest/miscellaneous/testing.html)).
