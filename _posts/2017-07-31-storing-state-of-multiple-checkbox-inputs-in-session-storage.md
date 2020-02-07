---
id: 92
title: Persisting multiple checkbox states in session Storage (using jQuery)
date: 2017-07-31T14:52:00+01:00
author: Ben Hall
layout: post
guid: http://benhall.io/?p=92
permalink: /storing-state-of-multiple-checkbox-inputs-in-session-storage/
categories:
  - JavaScript
tags:
  - checkbox
  - HTML
  - JavaScript
  - jQuery
  - sessionStorage
---
**The problem:**

An existing ASP.NET MVC page allowed the user to apply additional an additional filter a to jQuery DataTable with a bunch of checkboxes in a modal/popup. These were being forgotten each time the user followed one of the links in the table and then returned.

The filtering took values directly from the checkboxes.

The state of the checkboxes needed to be saved when the modal was closed, then reloaded when they returned to the page.

**The solution:**

A quick fix using session storage on the client.

<u>A brief explanation of Window.sessionStorage</u>

It gives you access to an object on which to store key-value pairs, on the client side for the duration a window (or tab) is open.

Window.localStorage is also available, differing in that it does not expire on closing of the window.

As this was an internal website with all users on IE11 and there was no server-side need for the data, cookies were deemed unnecessary.

<u>Key bits</u>

To save the state of the check-boxes to session storage as JSON array:

<pre class="lang:js decode:true">let checkBoxArray = [];
$('input:checkbox:checked').each(function() {
  checkBoxArray.push($(this).val());;
});
sessionStorage.setItem('boxes', JSON.stringify(checkBoxArray));
</pre>

To reload the state of the check-boxes:

<pre class="lang:js decode:true ">let checkBoxArray = JSON.parse(sessionStorage.getItem('boxes'));
$(".checkbox").find('input:checkbox').each(function() {
  $(this).prop("checked", ($.inArray($(this).val(), checkBoxArray) !== -1));
});
</pre>

<u>Side note</u>

The `jQuery.inArray()>` function behaves in a similar way to `array.indexOf` i.e.

<pre class="lang:js decode:true ">(function () {
  var existsBool = ['ss','dd'].indexOf('ss') !== -1;
})();</pre>

JavaScript’s Array `indexOf()` method returns the index of the specified item, which is -1 if  not found. Similarly, jQuery’s `inArray` returns -1 for not found or otherwise the index (first only) where the item is found.

The consequence being, we need to avoid the == or !=, as doing so will result in a 0 being evaluated as false. So remember to use !==. Not so important in the example above as we are checking for -1 only.

<u>JSFiddle</u>



CSS for checkboxes borrowed from [aahz&#8217;s Bootsnip](https://bootsnipp.com/snippets/featured/animated-radios-amp-checkboxes-nojs).