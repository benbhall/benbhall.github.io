---
title: C# Image class extension methods for physical print size in millimetres
date: 2017-08-10
except: A couple of extension methods that use the width and height in pixels, along with the DPI to return an Image object’s width and height in mm.
permalink: /getting-the-physical-print-size-in-millimetres-of-an-image-in-c/
redirect_from:
  - /2017/08/10/getting-the-physical-print-size-in-millimetres-of-an-image-in-c/
categories:
  - 'C# .NET'
tags:
  - .NET
  - 'C#'
---

We had a business need for the actual print size of an image in millimetres.

The `PhysicalDimension` property on `System.Drawing.Image` was unfortunately not what I had hoped for.

Here’s a couple of extension methods that use the width and height in pixels, along with the DPI (as `HorizontalResolution` and `VerticalResolution`) to return an `Image` object’s width and height in mm.

```csharp
public static class ImageExtensions
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
    }
```

Usage example for those new to using extension methods:

```csharp
var bitmapImage = new Bitmap(filename);
var bitmapWidthInMm = bitmapImage.WidthInMm();
```
