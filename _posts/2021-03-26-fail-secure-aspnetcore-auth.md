---
title: ASP.NET Core Authentication - Fail Secure
excerpt: Reverse your approach to enforcing authentication on controllers and Razor Pages with global settings.
date: 2021-03-26
permalink: /fail-secure-aspnetcore/
categories:
  - security
  - aspnetcore
tags: [asp.net,authentication,authorization]
---

*Written with ASP.NET Core 3.x and .NET 5 in mind.*

ASP.NET developers will be familiar with using the `[Authorize]` attribute to decorate a class or method in a controller or Razor Page, so that a visitor will be forced to **authenticate** if they have not done so already.

We can also use it for **authorization** via:

* Roles (`[Authorize(Roles = "Admin")]`)
* Policies (`[Authorize(Policy = "RequireAdminRole")]`)

And select specific authentication schemes using `[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]`.

## The Confusing Bit

* Authorization is about permissions
* Authentication is about identity

Of course! Right?

But you can be forgiven for thinking that authorization and authentication have merged into one under `AuthorizeAttribute`:

* If we want a user authenticated we add the `[Authorize]`.
* If we want to check if a user is authorized we can add  `[Authorize]`.
  
The attribute is only one of many ways to do things but I just wanted to say now, that I don't like this ambiguity being the default for *simple authorization* 😁. For this article we'll play along with it as we're just looking at whatever it takes to enforce authentication.

### To be fair

The [authorization middleware](https://github.com/dotnet/aspnetcore/blob/7e145b1132ebe0bf85765f5ef96d337ff2d790e2/src/Security/Authorization/Policy/src/AuthorizationMiddleware.cs#L70) does actually call authentication directly, so the behaviour of the attribute isn't totally out there - it makes sense that an attempt to authorize should also ensure authentication has taken place first.

Anyway let's get back on topic...

## Undesirable: Fail Open

The success of the `AuthorizeAttribute` depends on developers remembering to add it whenever they add a new action or page that needs securing. If it is unintentionally omitted for an action that *should* require an authenticated user, there is no fallback to the safer option of enforcing authentication. In engineering, this is referred to as **fail open** - the failure was not adding the attribute, the resulting behaviour was to remain open, that is, continue as if no authentication was required.

## Desirable: Fail Closed

When securing a web app we typically want the opposite behaviour, referred to as **fail closed** or **fail secure** - if we make a mistake and forget to add the attribute over an action, we want the action to fail, that is, to deny anonymous, unauthenticated access.

In ASP.NET we can achieve this and fail secure by reversing the logic and requiring *all* actions to be authenticated and *then* add `[AllowAnonymous]` to anything that does not require authentication if we like.

### Method 1: Authorization Filter

It *was* the recommended way to enforce authentication globally before the release of ASP.NET Core 3.x and the shift to endpoint routing (endpoint routing, amongst other things, introduced authorization as middleware).

Of course, if you've not found a need to migrate onto endpoint routing then this is still the way to go for now.

Either way, it's  worth being able to recognise it so that you can do a quick rewrite to one of the methods further on when you encounter it in a codebase.

The following applies a filter that implements the `DefaultPolicy` across all Razor Pages:

<!-- TODO
https://github.com/dotnet/aspnetcore/blob/c925f99cddac0df90ed0bc4a07ecda6b054a0b02/src/Mvc/Mvc.Core/src/Authorization/AuthorizeFilter.cs#L156
 -->

```csharp
public void ConfigureServices(IServiceCollection services)
{
  ...

  services.AddRazorPages()
      .AddMvcOptions(options => options.Filters
          .Add(new AuthorizeFilter()));
}
```

This is the same as adding an `[Authorize]` everywhere i.e. if you are an authenticated user, you are authorized - no other requirements.

You may also find it using `RequireAuthenticatedUser()` to build a policy and avoid any dependency on `DefaultPolicy` (the behaviour of which can be changed in code); but then still, it's applied as a filter:

```csharp
 var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();
options.Filters.Add(new AuthorizeFilter(policy));
```

Or within a custom policy:

```csharp
services.AddRazorPages()
        .AddMvcOptions(options => options.Filters
            .Add(new AuthorizeFilter("UsersPolicy")));

services.AddAuthorization(options =>
{
  options.AddPolicy("UsersPolicy",
      policyBuilder => policyBuilder.RequireRole("Domain Users"));
});
```

Ultimately, as a filter it will apply to all pages and actions unless overridden so it does the job of globally enforcing authentication.

### Method 2: Fallback Policy (Recommended)

The preferred way, from ASP.NET Core 3.x on is to set a fallback authentication policy in Startup.cs:

```csharp
services.AddAuthorization(options =>
{
  options.FallbackPolicy = new AuthorizationPolicyBuilder()
      .RequireAuthenticatedUser()
      .Build();
});
```

This will apply to any Razor Page, controller or action where no authorization behaviour has been defined.

It uses the endpoint routing that was introduced fully in ASP.NET Core 3.0,   at endpoint level using the `RequireAuthorizaton()` extension method again, with the bonus of being able to add authorization to the health check endpoint and our SignalR endpoint (the `AuthorizeFilter` approach only works with Razor Pages and MVC).

```csharp
app.UseEndpoints(endpoints =>
{
endpoints.MapRazorPages().RequireAuthorization("OurPagePolicy");
endpoints.MapHealthChecks("/health").RequireAuthorization();
endpoints.MapHub<TaskHub>("/taskupdate").RequireAuthorization();
}
```

If we wanted to allow unauthenticated access to the health checks we use an extension method on `IEndpointConventionBuilder` that is the same as adding `[AllowAnonymous]`:

```csharp
endpoints.MapHealthChecks("/health").WithMetadata(new AllowAnonymousAttribute());
```

There's no overload here for `RequireAuthorization()` that takes a policy (because we're building one) but it can still be altered through the fluent builder i.e.

```csharp
options.FallbackPolicy = new AuthorizationPolicyBuilder()
      .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
      .RequireAuthenticatedUser()
      .RequireRole("Admin")
      .Build();
```

### Method 3: Razor Page Conventions

As the title suggests, this method is only intended for Razor Pages. It might appeal where a single point for globally configuring all authorization in a fluent style is preferred.

In the following example for `Startup.cs`, we are enforcing authentication from the root folder and then allowing anonymous access to specific folders and pages:

```csharp
services.AddRazorPages(
        options =>
        {
          options.Conventions.AuthorizeFolder("/")
              .AllowAnonymousToFolder("/Register")
              .AllowAnonymousToPage("/Admin/ForgotPasswordPage");
        });
```

We could instead have just used `options.Conventions.AuthorizeFolder("/")` and then added `[AllowAnonymous]` on any Razor Pages we don't require authentication on. The key takeaway here is another approach to enforcing a fail secure approach to authentication globally.
