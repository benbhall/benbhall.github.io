---
title: OpenTelemetry, The Missing Ingredient
excerpt: At its core, OpenTelemetry (OTeL) is a vendor-neutral standard for telemetry. But it also provides a complete end-to-end implementation for generating, emitting, collecting, processing and exporting telemetry data to any support observability back-end. 
date: 2022-10-16
permalink: /opentelemetry/
categories:
  - Support
tags: [OpenTelemetry, Observability]
---

- [Part 1: The Modern Observability Problem](/opentelemetry-observability)
- Part 2: OpenTelemetry, The Missing Ingredient
- Part 3: OpenTelemetry for .NET Developers (COMING SOON)

----------------------------
<br/>

In the [Part 1](/opentelemetry-observability), we looked at observability solutions for complex microservices systems and emphasised the importance of the right data being instrumented. We concluded that there are many good observability solutions, both open-source and commercial. But they all do things their own way, greatly reducing our ability to flex and adapt.

## A Vendor-Neutral Standard + Much More

> OpenTelemetry lets you replace the need for vendor-specific SDKs and tools for generating and exporting telemetry data.

At its core, OpenTelemetry (OTeL) is a vendor-neutral standard for telemetry. But it also provides a complete end-to-end implementation for generating, emitting, collecting, processing and exporting telemetry data to any support observability back-end. For each language currently supported there are:

- **Core libraries**. We can use these for manual instrumentation of services (or your own libraries).
- **Automatic instrumentation common libraries and frameworks**. Plugin-and-go for common web frameworks, database clients, etc.
- **Exporters**. Libraries to send the instrumented telemetry data to backends. This can, of course, be through the OpenTelemetry Protocol (OTLP) itself, or  vendor-specific such as Jaegar or Azure Monitor, where it would be translated from the OpenTelemetry data in memory, to the format of vendor tool.

![image-center](/assets/images/opentelemetry/otel-libs.png){: .align-center}

Vendors are also increasingly supporting direct ingress of native OTLP. See [this list](https://opentelemetry.io/vendors/) for updates.

### Vendor-Neutral Context Propagation

OTeL uses the concept of **baggage**, which standardises the format of a shared context for values across programming languages and platforms, removing the need for teams to develop their own custom solutions.

For example, if only `service A` sees a user's ID, we could put in the baggage so that `service B` could access in when called as a child/dependency.

![image-center](/assets/images/opentelemetry/baggage.png){: .align-center}

## The Vendor-Neutral Proxy

The star of the show in my opinion, is the **Collector**. While most languages have exporters to send telemetry data directly to back-ends, which is fine during development, it is beneficial to offload data quickly to a collector to handle the resource intensive tasks, such as:

- Exporting to multiple places
- Enhancing with metadata
- Batching
- Encryption
- Buffering and retries when the back-ends are unresponsive
- Control flow to back-ends to allow service to continue its work

The collector can receive and export data in multiple formats, to and from observability tools using the OpenTelemetry Procotol (OTLP) and proprietary ones. It does his by acting as a **pipeline** through the following key components:

- **Receivers**: The core receiver is for telemetry using OTLP but there are many more available from the [contrib repository](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver)
- **Processors**: These can be run on data between receiving and exporting
- **Exporters:** : Used to send data to observavility back-ends or other destinations. As well as the core OTLP exporter, there are many available from the [contrib repository](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter)

![image-center](/assets/images/opentelemetry/pipeline.png){: .align-center}

Below is a snapshot of a typical use-case. We have a .NET web app exporting logs, metrics and traces using OTLP to a collector. The method of deployment depicted is where a collector is deployed alongside each service on a one-to-one basis, with a shared lifetime with the service. This tends to put ownership of the collector with the development team(s) and is useful if you need to do processing specific to a service.

![image-center](/assets/images/opentelemetry/collector2.png){: .align-center}

Our collector could then be setup as a pipeline to export those to the back-ends of our choosing.

The configuration for that pipeline would like this ([complete config file](https://gist.github.com/benbhall/04b3ec79b6a1934be586efbf06a0ef21)):

```yaml
service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [otlp, elasticsearch/trace]
    logs:
      receivers: [otlp]
      exporters: [otlp, elasticsearch/log, file/rotation_with_default_settings]
    metrics:
      receivers: [otlp]
      exporters: [otlp, prometheus]
```

It's also possible to deploy the collector as standalone **gateway** component, to be scaled independently of the services. This tends to mean ownership of the collector is with platform teams who can then centrally manage policies and permission.

![image-center](/assets/images/opentelemetry/collector1.png){: .align-center}

Even with a gateway deployment, you should give consideration to maintaining collector agents alongside each service too, sending data to the this one.

## Summary

Observability solutions, both open-source and commercial, have done a good job in catching up with the demands of supporting modern microservices architectures. The biggest problem is the lack of standardisation, which reduces are ability to flex and adapt - vendor-locking us.

OpenTelemetry is the missing ingredient, which is set to change the landscape significantly. It is incredibly easy to adopt with a real plug-and-play feel to it, and there is good transition support with libraries to translate between proprietary protocols and OpenTelemetry.

In [Part 3](/opentelemetry-dotnet) we will look at the current state of OpenTelemetry in .NET and have a go at using OpenTelemetry with .NET and Azure Monitor.
