---
permalink: /ai-coding-guide/benchmarks/
title: "AI coding benchmarks"
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
.source-box {
  background: #1a1d23;
  border: 1px solid #3d4144;
  border-radius: 8px;
  padding: 0.75em 1em;
  margin: 1em 0;
  font-size: 0.9em;
}
.source-box strong {
  color: #e05d45;
}
</style>

<span class="update-badge">📅 Snapshot: December 2025</span>

This page collates benchmark data from independent sources to help you compare models. **These aren't my benchmarks** - I'm just pulling highlights so you don't have to tab between sites.

For the latest data, always check the original sources.

---

## SWE-bench Verified

<div class="source-box">
<strong>Source:</strong> <a href="https://www.swebench.com/">swebench.com</a> · Tests whether models can fix real GitHub issues
</div>

| Model | Score | $/task | Copilot |
|-------|-------|--------|---------|
| Claude 4.5 Opus | 74.4% | $0.72 | 3× |
| Gemini 3 Pro | 74.2% | $0.46 | 1× |
| GPT-5.2 (high reasoning) | 71.8% | $0.52 | 1× |
| Claude 4.5 Sonnet | 70.6% | $0.56 | 1× |
| GPT-5.2 | 69.0% | $0.27 | 1× |
| Claude Opus 4.1 | 67.6% | $1.13 | 10× |
| GPT-5 (medium reasoning) | 65.0% | $0.28 | 1× |
| o3 | 58.4% | $0.33 | - |
| Gemini 2.5 Pro | 53.6% | $0.29 | 1× |
| o4-mini | 45.0% | $0.21 | - |
| GPT-4.1 | 39.6% | $0.15 | 0× |
| Gemini 2.5 Flash | 28.7% | $0.13 | - |

**$/task** = cost to solve one benchmark task via direct API (based on token usage × provider pricing). Useful for API users and for comparing relative costs. **Copilot** = GitHub Copilot premium request multiplier (0× = free on paid plans).

<div class="callout tip">
<strong>Takeaway:</strong> Sonnet 4.5 hits 70% at $0.56/task and 1× Copilot cost. Opus 4.5 is marginally better but 3× in Copilot. The older Opus 4.1 costs 10× - always use 4.5 if you need Opus.
</div>

---

## Aider Polyglot

<div class="source-box">
<strong>Source:</strong> <a href="https://aider.chat/docs/leaderboards/">aider.chat/docs/leaderboards</a> · Tests code editing across C++, Go, Java, JavaScript, Python, Rust
</div>

<div class="callout">
<strong>Why so few Copilot models?</strong> Aider benchmarks older model versions (Claude 3.5, not 4.5). GitHub Copilot has moved on to newer models, so there's limited overlap. GPT-4o is the main one you can directly compare.
</div>

| Model | % Correct | Copilot |
|-------|-----------|---------|
| o1 | 84.2% | - |
| Claude 3.5 Sonnet | 84.2% | - |
| Gemini exp | 80.5% | - |
| Claude 3.5 Haiku | 75.2% | - |
| GPT-4o | 72.9% | 0× |
| DeepSeek Coder V2 | 72.9% | - |
| Claude 3 Opus | 68.4% | - |
| GPT-4o-mini | 55.6% | - |
| Claude 3 Haiku | 47.4% | - |

<div class="callout tip">
<strong>Takeaway:</strong> On this benchmark, GPT-4o (0× in Copilot - free on paid plans) scores 72.9%. That's your baseline. If Aider updates with Claude 4.5/GPT-5 results, expect higher scores.
</div>

---

## Chatbot Arena WebDev

<div class="source-box">
<strong>Source:</strong> <a href="https://lmarena.ai/leaderboard/webdev">lmarena.ai/leaderboard/webdev</a> · Human preference voting on web development tasks
</div>

| Rank | Model | Score | $/task | Copilot | Notes |
|------|-------|-------|--------|---------|-------|
| 1 | Claude Opus 4.5 **thinking** | 1520 | $0.72 | 3× | Thinking variant |
| 2 | GPT-5.2 high | 1484 | $0.52 | 1× | High reasoning mode |
| 3 | Claude Opus 4.5 | 1480 | $0.72 | 3× | Standard (non-thinking) |
| 4 | Gemini 3 Pro | 1478 | $0.46 | 1× | |
| 5 | Gemini 3 Flash | 1465 | $0.13 | 0.33× | |
| 8 | Claude Sonnet 4.5 **thinking** | 1393 | $0.56 | 1× | Thinking variant |
| 11 | Claude Sonnet 4.5 | 1387 | $0.56 | 1× | Standard (non-thinking) |
| 21 | Claude Haiku 4.5 | 1290 | $0.21 | 0.33× | |

<div class="callout">
<strong>"Thinking" variants are labeled explicitly.</strong> Claude Opus 4.5 (rank 3) is NOT a thinking model - it's just big. The thinking variant (rank 1) is a separate model that does explicit reasoning passes. Same for Sonnet: standard (rank 11) vs thinking (rank 8). The thinking versions score higher but are slower and cost more.
</div>

---

## What benchmarks don't tell you

- **Latency** - high-scoring models can feel sluggish
- **Consistency** - benchmark runs are controlled; your prompts aren't
- **Your stack** - generic benchmarks miss framework-specific quirks
- **Cost at scale** - 5% better might not justify 3x the price

The best benchmark is running a model on your own work for a day.

---

## Other benchmarks

| Benchmark | What it tests | Notes |
|-----------|---------------|-------|
| **HumanEval** | Python function completion | Classic but dated |
| **MBPP** | Basic Python problems | Also dated |
| **CodeContests** | Competitive programming | Harder, less realistic |
| **LiveCodeBench** | Fresh problems | [livecodebench.github.io](https://livecodebench.github.io/) - avoids training contamination |

For day-to-day coding, SWE-bench and Aider are most relevant.

---

## Appendix: GitHub Copilot cost column

The **Copilot** column shows the premium request multiplier for GitHub Copilot (VS Code, etc.):

| Multiplier | What it means |
|------------|---------------|
| **0×** | Included free (GPT-4.1, GPT-4o, GPT-5 mini) - no premium requests used |
| **0.33×** | Cheap (Haiku 4.5, Gemini 3 Flash) - 3 requests for the price of 1 |
| **1×** | Standard (Sonnet, GPT-5, Gemini Pro) - 1 premium request per use |
| **3×** | Expensive (Opus 4.5) - costs 3 premium requests per use |
| **10×** | Very expensive (Opus 4.1) - costs 10 premium requests per use |
| **-** | Not available in GitHub Copilot |

Paid plans get 300-1500 premium requests/month depending on tier. Extra requests cost $0.04 each.

<div class="source-box">
<strong>Source:</strong> <a href="https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/about-premium-requests">GitHub Copilot premium requests docs</a>
</div>

← Back to [AI Guide](/ai-coding-guide/)
