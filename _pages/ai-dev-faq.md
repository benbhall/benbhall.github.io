---
title: "AI Coding FAQ"
permalink: /ai-dev-faq/
layout: single
toc: true
toc_label: "On this page"
toc_sticky: true
toc_icon: "file-alt"
---

<style>
@media (min-width: 64em) {
  .page__inner-wrap {
    max-width: 100%;
  }
  
  .sidebar__right {
    width: 300px;
    margin-right: 0;
  }
  
  .page__content {
    float: left;
    width: calc(100% - 320px);
  }
}
</style>

Jargon-free explanations of AI concepts for developers.

## What is "reasoning" and why do I care? {#reasoning}

In model terms, "reasoning" is the ability to maintain logic across multiple steps without getting confused.

**Low reasoning (Flash/Haiku):** Good at "A leads to B".
> *Example:* "Create a `User` class with these fields." (Simple translation of instruction to code)

**High reasoning (Pro/Sonnet/Opus):** Good at "A leads to B, but C might block it, so we should check D first."
> *Example:* "Refactor this `User` class to be thread-safe." (Requires understanding concurrency, locking, and potential deadlocks)

**When you need it:**
- Refactoring legacy code (understanding side effects)
- Debugging race conditions
- Designing architectures

**When you don't:**
- Writing unit tests
- Adding a simple API endpoint
- Explaining an error message

If your model writes code that compiles but introduces subtle bugs, you probably need a model with better reasoning.

{% for item in site.data.faq %}
## {{ item.question }} {#{{ item.id }}}

{{ item.answer }}
{% endfor %}

