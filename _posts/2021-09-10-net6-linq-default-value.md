---
title: .NET 6 LINQ Improvements - Default Values
excerpt: .NET 6 introduces new LINQ overloads that allows us to specify default values more succinctly.
date: 2021-09-10
permalink: /linq-net6-default-value/
categories:
  - .NET
tags: [.NET6, LINQ]
---

## A Cleaner Way to Specify Default Values

In the APIs for `System.Linq.Enumerable` and `System.Linq.Queryable` we have overloads for `FirstAsync()`, `SingleAsync()` and `LastAsync()` (and their synchronous counterparts) that return the first, single or last element of a sequence. If they find nothing, then they throw an exception.

When this behaviour is not desired, our other option is to use `SingleOrDefaultAsync()`, `FirstOrDefaultAsync()`, `LastOrDefaultAsync()`, where instead of an exception, the a `default(T)` value is returned. For example, the default for an `int` is 0 and the default for a `string` is `null`.

We do already have control over the default value, but it is not very convenient to use:

```csharp
var singleOrDefault = list.Where(x => x.Age > 20)
    .DefaultIfEmpty(new Person
    {
        Age = 99,
        Name = "Nobody"
    })
    .Single();
```

.NET 6 introduces new overloads that allows us to specify the default value more succinctly. For example:

```csharp
var singleOrDefault = list.SingleOrDefault(x => x.Age > 100, new Person
{
    Age = 99,
    Name = "Nobody"
});
```
