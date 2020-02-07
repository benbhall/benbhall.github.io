---
id: 121
title: 'C# image extension methods for physical print size in millimetres'
date: 2017-08-10T13:12:49+01:00
author: Ben Hall
layout: post
guid: http://benhall.io/?p=121
permalink: /getting-the-physical-print-size-in-millimetres-of-an-image-in-c/
categories:
  - Image Class
tags:
  - .NET
  - 'C#'
---
We had a business need for the actual print size of an image in millimetres.

The `PhysicalDimension` property on `System.Drawing.Image` was unfortunately not what I had hoped for.

Here’s a couple of extension methods that use the width and height in pixels, along with the DPI (as `HorizontalResolution` and `VerticalResolution`) to return an `Image` object’s width and height in mm.

<pre class="lang:c# decode:true ">public static class ImageExtensions
    {
        public static double WidthInMm(this Image img)
        {
            const double mmPerInch = 25.4;

            return Convert.ToDouble(img.Width / img.HorizontalResolution * mmPerInch);
        }

        public static double HeightInMm(this Image img)
        {
            const double mmPerInch = 25.4;

            return Convert.ToDouble(img.Height / img.VerticalResolution * mmPerInch);
        }
    }</pre>

Usage example for those new to using extension methods:

<pre class="lang:c# decode:true">var bitmapImage = new Bitmap(filename);
var bitmapWidthInMm = bitmapImage.WidthInMm();</pre>