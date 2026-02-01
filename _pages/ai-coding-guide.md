---
permalink: /ai-coding-guide/
title: "Getting Started: AI Coding Quick Reference"
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

.quick-pick {
  margin: 1em 0 2em 0;
}
.quick-pick h3 {
  color: #00adb5 !important;
  margin-top: 0;
  margin-bottom: 1em;
  font-size: 1.2em;
}
.quick-pick-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5em;
  margin-bottom: 1em;
}
@media (max-width: 500px) {
  .quick-pick-grid {
    grid-template-columns: 1fr;
  }
}
.pick-card {
  background: #2d333b;
  border-left: 3px solid #00adb5;
  border-radius: 4px;
  padding: 0.8em 1em;
}
.use-case {
  color: #a8a8a8;
  font-size: 0.85em;
  margin-bottom: 0.4em;
}
.models {
  color: #00adb5;
  font-size: 0.9em;
  line-height: 1.6;
}
.pick-card .use-case {
  font-size: 0.85em;
  color: #a8a8a8;
  margin-bottom: 0.75em;
  border-bottom: 1px solid #3d4144;
  padding-bottom: 0.5em;
  white-space: nowrap;
}
.pick-card .models {
  color: #00adb5;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.6;
}
.jump-links {
  margin: 1.5em 0 2em 0;
  padding: 0;
  border: none;
  font-size: 0.95em;
}
.jump-links span {
  color: #a8a8a8;
  margin-right: 0.75em;
}
.jump-links a {
  background: transparent;
  border: none;
  color: #00adb5 !important;
  padding: 0;
  margin-right: 0.25em;
  font-size: 1em;
  text-decoration: none;
}
.jump-links a:hover {
  background: transparent;
  color: #52edff !important;
  text-decoration: underline;
}
.jump-links a::after {
  content: " →";
  color: #3d4144;
  margin-right: 1em;
}
.callout {
  border-left: 4px solid #e05d45;
  background: #1a1d23;
  padding: 1em 1.2em;
  margin: 1em 0;
  border-radius: 0 8px 8px 0;
}
.callout.tip {
  border-left-color: #00adb5;
}
.callout strong {
  color: #e05d45;
}
.callout.tip strong {
  color: #00adb5;
}
.update-badge {
  display: inline-block;
  background: #373b44;
  padding: 0.3em 0.8em;
  border-radius: 20px;
  font-size: 0.85em;
  margin-bottom: 1em;
}
body.light-theme .update-badge {
  background: #e5e7eb !important; /* Light gray */
  color: #1f2937 !important; /* Dark gray */
}
</style>

<span class="update-badge">📅 Last updated: February 2026</span>

No-nonsense reference for developers who just want to know which AI model to pick. Bookmark this and stop Googling.

<div class="quick-pick">
<h3>📌 Quick pick - just tell me what to use</h3>
<div class="quick-pick-grid">
<div class="pick-card">
<div class="use-case">Features / bugs / tests</div>
<div class="models">Claude Sonnet 4.5<br>Gemini 3 Pro<br>GPT-5.2</div>
</div>
<div class="pick-card">
<div class="use-case">Agentic / CLI / scaffolding</div>
<div class="models">Claude Haiku 4.5<br>Gemini 3 Flash<br>GPT-4o</div>
</div>
<div class="pick-card">
<div class="use-case">Architecture / refactors</div>
<div class="models">Claude Opus 4.5<br>Gemini 3 Pro<br>GPT-5.2 high</div>
</div>
<div class="pick-card">
<div class="use-case">Code review</div>
<div class="models">Claude Sonnet 4.5<br>Gemini 3 Pro<br>GPT-5.2</div>
</div>
<div class="pick-card">
<div class="use-case">Documentation</div>
<div class="models">Claude Sonnet 4.5<br>Gemini 3 Pro<br>GPT-4o</div>
</div>
<div class="pick-card">
<div class="use-case">Design / planning</div>
<div class="models">Claude Opus 4.5<br>Gemini 3 Pro<br>GPT-5.2 high</div>
</div>
</div>
</div>

## A note on versions {#versions}

You'll see version numbers everywhere: Sonnet 3.5, Sonnet 4, Sonnet 4.5. Gemini 2.5, Gemini 3. GPT-4o, GPT-5.

**Don't overthink it.** The tier matters more than the version. "Sonnet" is the mid-tier Claude. "Opus" is the heavyweight Claude. "Flash" is the fast/cheap Gemini. Your IDE usually offers the latest version of each tier - just pick the tier that fits your task.

When this page says "Sonnet", it means whatever the current Sonnet is. Same for the others.

## The big three model families {#model-families}

**Speed key:** ⚡⚡⚡ Fast · ⚡⚡ Medium · ⚡ Slow

### Anthropic (Claude) {#anthropic-claude}

| Model | What it's for | Speed | Cost |
|-------|---------------|-------|------|
| **Haiku** | Fast tasks, scaffolding, CLI | ⚡⚡⚡ | 💰 |
| **Sonnet** | Everyday coding | ⚡⚡ | 💰💰 |
| **Opus** | Complex reasoning, design | ⚡ | 💰💰💰 |

<div class="callout tip">
<strong>Start with Sonnet.</strong> It's the workhorse. Only reach for Opus when Sonnet genuinely can't handle the complexity.
</div>

### OpenAI (GPT) {#openai-gpt}

| Model | What it's for | Speed | Cost |
|-------|---------------|-------|------|
| **GPT-4o-mini** | Fast tasks, high volume | ⚡⚡⚡ | 💰 |
| **GPT-4o** | Everyday coding | ⚡⚡ | 💰💰 |
| **GPT-4.1** | Complex coding | ⚡⚡ | 💰💰 |
| **GPT-5 / 5.2** | Heavy lifting | ⚡ | 💰💰💰 |
| **o1** | Deep reasoning (expensive) | ⚡ | 💰💰💰💰 |
| **o3 / o4-mini** | Reasoning (cheaper) | ⚡ | 💰💰 |

<div class="callout">
<strong>Skip the "o-series" reasoning models (o1, o3, o4)</strong> for everyday coding. They think longer and cost more - o1 is particularly expensive at ~$1.35/task. Save them for:
<ul style="margin: 0.5em 0 0 1.5em; padding: 0;">
<li>Implementing algorithms (graph traversal, dynamic programming)</li>
<li>Debugging race conditions or complex state machines</li>
<li>Mathematical proofs or formal verification</li>
</ul>
</div>

### Google (Gemini) {#google-gemini}

| Model | What it's for | Speed | Cost |
|-------|---------------|-------|------|
| **Gemini 2.0 Flash** | Ultra-cheap, simple tasks | ⚡⚡⚡ | 💰 (cheapest) |
| **Gemini 2.5 Flash** | Fast tasks, high volume | ⚡⚡⚡ | 💰 |
| **Gemini 2.5 Pro** | Complex reasoning | ⚡ | 💰💰💰 |
| **Gemini 3 Flash** | Everyday coding | ⚡⚡ | 💰💰 |
| **Gemini 3 Pro** | Heavy lifting | ⚡ | 💰💰💰 |

## Benchmarks {#benchmarks}

Want numbers? 
- **[Compare all models](/ai-coding-guide/compare/)** - sortable table, filter by Copilot cost
- **[Benchmark details](/ai-coding-guide/benchmarks/)** - methodology, sources, caveats

**The TLDR:**

- **Claude Opus 4.5 & Gemini 3 Pro tie at 74% on SWE-bench** - but Gemini costs half as much ($0.22 vs $0.50/task)
- **GPT-5 high reasoning dominates Aider at 88%** - followed by Gemini 2.5 Pro thinking (83%) and Sonnet 4.5 (82%)
- **Budget champions:** GLM-4.7 ($0.05/task, 1440 Arena Elo) and Minimax M2 ($0.03/task, 1408 Elo) punch way above their weight
- **The most expensive model is not automatically the best at coding**

Benchmarks are useful for gut-checking, but the real test is running a model on your own work.

## Marketing BS decoder {#marketing-terms}

| They say | It means |
|----------|----------|
| "Most intelligent" | Bigger, slower, pricier |
| "Balanced" | Mid-tier - usually right |
| "Fast" / "efficient" | Smaller, cheaper, simpler |
| "Reasoning" / "thinking" | Extra thinking time - [see below](#reasoning-models) |
| "Preview" / "experimental" | Unstable - skip it |
| "200K context" | Can see lots of code - but [should it?](#context-windows) |

<div class="callout">
<strong>Opus is NOT a "thinking" model.</strong> It's just big and slow. "Thinking" models (o1, o3, Opus-thinking, Sonnet-thinking) explicitly reason step-by-step before responding - you'll see them labeled with "thinking" or "reasoning" in the model name. Regular Opus/Sonnet/GPT-5 are slower because they're larger, not because they're doing extra reasoning passes.
</div>

<div class="callout callout-info">
<strong>💡 "Thinking..." in the UI ≠ reasoning model.</strong> When your IDE shows "Thinking..." or a spinner, that's just the model processing your request - every model does this. True reasoning models show you their actual chain-of-thought (sometimes in a collapsible section), and are explicitly labeled "thinking" or "reasoning" in the model picker. Don't confuse a slow response with deep reasoning.
</div>

### When do "reasoning" models actually help? {#reasoning-models}

Reasoning models (o1, o3, "thinking" variants) work through problems step-by-step before responding.

**Worth it for:**
- Implementing complex algorithms (A*, red-black trees, constraint solvers)
- Debugging concurrency issues, race conditions, deadlocks
- Untangling deeply nested dependency chains
- Mathematical proofs or formal logic

**Overkill for:**
- Adding a new API endpoint
- Fixing a null pointer exception
- Writing unit tests
- Refactoring for readability
- Most day-to-day feature work

A standard model with a good prompt is faster and cheaper for 90% of coding tasks.

### What about context window size? {#context-windows}

Context window ([what's this?](/ai-dev-faq/#context-window)) = how much code the model can "see" at once. Bigger sounds better, but:

- **More context = more noise.** The model gets distracted.
- **More context = slower and pricier.** You pay per token.
- **You rarely need it.** Most tasks involve a few files, not hundreds.

Big windows help for: exploring unfamiliar codebases, analysing logs, multi-file refactors. For everyday coding, focused context beats massive context.

## Sources

- [Anthropic Claude models](https://docs.anthropic.com/en/docs/about-claude/models)
- [OpenAI models](https://platform.openai.com/docs/models)
- [Google Gemini models](https://ai.google.dev/gemini-api/docs/models/gemini)
- [Aider Leaderboards](https://aider.chat/docs/leaderboards/)
- [SWE-bench](https://www.swebench.com/)
- [Chatbot Arena](https://lmarena.ai/)

