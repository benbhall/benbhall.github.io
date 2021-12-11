---
title: .NET 6 LINQ Improvements - Count Performance
excerpt: .NET 6 introduces new LINQ method to count the number of elements in a sequence more efficiently.
date: 2021-09-11
permalink: /linq-net6-count/
categories:
  - .NET
  - LINQ
tags: [.NET6, LINQ]
---

For some C# collection types, a call to Count() may have to enumerate the *entire* collection to determine the number of elements.

.NET 6 has introduced a new method `TryGetNonEnumeratedCount()` to count the number of elements in a sequence more efficiently.

From the [API docs](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable.trygetnonenumeratedcount?view=net-6.0):

> The method performs a series of type tests, identifying common subtypes whose count can be determined without enumerating; this includes `ICollection<T>`, `ICollection` as well as internal types used in the LINQ implementation.

The method really just avoids the developer having to check the underlying type of a collection - you may still need to call `Count()` when it cannot determine the count quickly and so returns `false` and the `out` parameter returns 0.
