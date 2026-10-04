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

<span class="update-badge">📅 Snapshot: October 2026</span>

This page collates benchmark data from independent sources to help you compare models. **These aren't my benchmarks** - I'm just pulling highlights so you don't have to tab between sites.

For the latest data, always check the original sources. Data current as of: SWE-bench (February 2026), Aider (latest listed runs October 2025), Arena Code (February 2026), LiveBench (leaderboard checked October 2026; release 2026-06-25), ProgramBench (September 28, 2026).

---

## SWE-bench Verified

<div class="source-box">
<strong>Source:</strong> <a href="https://www.swebench.com/">swebench.com</a> (February 2026) · Tests whether models can fix real GitHub issues · <em>Standardized harness: mini-SWE-agent v2.0.0, high reasoning mode where available</em>
</div>

| Model | Score | $/task | Copilot |
|-------|-------|--------|---------|
| Claude Opus 4.5 | 76.8% | $0.50 | - |
| Minimax M2.5 | 75.8% | $0.07 | - |
| Gemini 3 Flash | 75.8% | $0.06 | - |
| Claude Opus 4.6 | 75.6% | $0.50 | - |
| GPT-5.2 (high reasoning) | 72.8% | $0.23 | - |
| GLM-5 | 72.8% | $0.05 | - |
| GPT-5.2 | 72.8% | $0.23 | - |
| Claude Sonnet 4.5 | 71.4% | $0.30 | - |
| Kimi K2.5 | 70.8% | $0.15 | - |
| DeepSeek V3.2 (high reasoning, legacy API) | 70.0% | $0.45 | - |
| Gemini 3.1 Pro | 69.6% | $0.22 | - |
| Claude Opus 4.1 (retired first-party API) | 67.6% | $1.50 | - |
| Claude Haiku 4.5 | 66.6% | $0.10 | ✓ |
| GPT-5 | 65.0% | $0.16 | - |
| Kimi K2 Thinking Turbo | 63.4% | $0.06 | - |
| GPT-5 mini | 56.2% | $0.03 | ✓ |
| Gemini 2.5 Pro | 53.6% | $0.16 | - |

**$/task** on this historical run table is the benchmark's reported run cost and may use prices that have since changed. **Copilot** = currently listed in GitHub Copilot (✓ = yes; this is availability, not a price tier).

<div class="callout tip">
<strong>Takeaway:</strong> The Verified leaderboard still has no new standardized-harness runs since February. Claude Opus 4.5 leads this snapshot at 76.8%; treat it as a historical run, not a ranking of today's newest models. DeepSeek's 70% result is V3.2, not V4.1, and Opus 4.1 is retired from Anthropic's first-party API.
</div>

---

## Aider Polyglot

<div class="source-box">
<strong>Source:</strong> <a href="https://aider.chat/docs/leaderboards/">aider.chat/docs/leaderboards</a> (latest listed runs: October 2025) · Tests code editing across C++, Go, Java, JavaScript, Python, Rust
</div>

<div class="callout">
<strong>Historical snapshot:</strong> The published model runs stop at October 2025. No newer scores were found for this update, so treat these as archived results rather than current model recommendations.
</div>

| Model as tested | % Correct |
|---------------|-----------|
| GPT-5 (high reasoning) | 88.0% |
| o3-pro (high) | 84.9% |
| Gemini 2.5 Pro 06-05 (32k think) | 83.1% |
| Claude Sonnet 4.5 | 82.4% |
| Claude Opus 4.1 | 82.1% |
| o3 (high) | 81.3% |
| Grok 4 (high) | 79.6% |
| DeepSeek V3.2 Exp Reasoner | 74.2% |
| Claude Haiku 4.5 | 73.5% |
| GPT-4o | 72.9% |
| o4-mini | 72.0% |
| Claude Opus 4.5 | 70.7% |
| DeepSeek V3.2 Exp Chat | 70.2% |

<div class="callout tip">
<strong>Takeaway:</strong> These results are useful as an archived comparison of the models tested at the time, but the leaderboard has not kept pace with current releases. The V3.2 Reasoner/Chat names refer to 2025 Aider runs; they are not DeepSeek V4.1 results.
</div>

---

## LiveBench

<div class="source-box">
<strong>Source:</strong> <a href="https://livebench.ai/">livebench.ai</a> (checked October 4, 2026; latest question-set release 2026-06-25) · Contamination-free benchmark with 23 diverse tasks
</div>

**What it is:** A contamination-free benchmark with 23 diverse tasks spanning Coding, Agentic Coding, Data Analysis, Language, Instruction Following, Math, and Reasoning. Questions refresh every 6 months and are delay-released to minimize training contamination. Scores use objective ground-truth answers, not LLM judges.

**Why it matters:** Most benchmarks face contamination (models train on test data). LiveBench addresses this with regular question rotation and delayed public release. The Global Average provides a single score across multiple capabilities, avoiding narrow specialization.

| Model | Global Avg | Coding | Agentic | Data | Language | IF | Math | Reasoning |
|-------|------------|--------|---------|------|----------|-----|------|-----------|
| Claude Fable 5.1 Max | 83.4 | 91.7 | 86.4 | 66.1 | 97.0 | 80.3 | 89.5 | 73.0 |
| Claude Opus 5.5 Thinking Max | 83.2 | 92.2 | 89.3 | 71.7 | 97.1 | 80.3 | 86.3 | 65.7 |
| Claude Fable 5 Max | 83.0 | 89.7 | 86.0 | 62.2 | 96.0 | 80.5 | 90.7 | 75.8 |
| GPT-6 Astra Max | 82.2 | 92.7 | 80.4 | 57.3 | 96.8 | 83.0 | 89.4 | 75.6 |
| GPT-6.1 Sol Max | 81.6 | 92.6 | 80.4 | 54.5 | 96.8 | 82.7 | 90.1 | 74.2 |
| Muse Spark 1.3 xHigh | 81.6 | 89.7 | 81.1 | 64.1 | 95.9 | 79.6 | 82.8 | 78.0 |
| DeepSeek V4.1 Flash Max | 81.1 | 86.7 | 80.0 | 77.3 | 93.3 | 79.3 | 81.2 | 70.0 |
| GPT-5.6 Sol Max | 81.0 | 91.7 | 83.9 | 56.2 | 96.2 | 79.8 | 87.7 | 71.8 |
| GPT-5.5 Thinking xHigh | 80.2 | 89.7 | 82.1 | 54.0 | 95.9 | 81.6 | 87.4 | 70.7 |
| Claude Opus 5 Thinking Max | 80.1 | 91.2 | 81.4 | 65.2 | 95.7 | 74.6 | 88.7 | 63.8 |
| GPT-6 Sol Max | 79.3 | 88.7 | 81.8 | 52.9 | 96.4 | 81.2 | 85.3 | 68.6 |
| Kimi K3 open | 79.2 | 90.7 | 81.4 | 62.2 | 84.4 | 78.7 | 85.5 | 71.4 |
| Gemini 3.7 Flash High | 78.8 | 87.8 | 78.9 | 58.3 | 93.5 | 68.0 | 85.5 | 79.9 |
| Qwen 3.8 Max | 78.5 | 88.2 | 72.9 | 64.6 | 91.3 | 78.4 | 79.7 | 74.1 |
| Grok 4.6 xHigh | 78.0 | 90.5 | 76.8 | 57.0 | 92.6 | 73.9 | 83.7 | 71.9 |
| GPT-5.4 Thinking xHigh | 78.0 | 88.1 | 77.5 | 53.8 | 94.1 | 79.3 | 82.6 | 70.2 |
| Muse Spark 1.2 xHigh | 78.0 | 90.0 | 77.5 | 57.6 | 91.2 | 76.5 | 78.6 | 74.3 |
| GPT-5.6 Terra Max | 77.9 | 90.6 | 78.2 | 54.9 | 94.9 | 79.3 | 82.9 | 64.6 |
| Claude Sonnet 5.5 xHigh | 77.8 | 86.8 | 88.9 | 39.3 | 96.7 | 78.6 | 83.4 | 70.5 |
| DeepSeek V4 Pro 0813 open | 77.4 | 85.8 | 77.2 | 54.9 | 95.1 | 79.2 | 82.1 | 67.7 |
| Grok 4.7 xHigh | 77.4 | 82.7 | 77.2 | 54.0 | 95.7 | 76.9 | 80.1 | 75.3 |
| Gemini 3.1 Pro High | 77.0 | 84.0 | 76.5 | 44.1 | 91.0 | 78.5 | 85.4 | 79.1 |
| DeepSeek V4 Flash Vision Exp open | 76.8 | 85.4 | 68.2 | 65.1 | 87.8 | 79.5 | 80.4 | 71.0 |
| Claude Opus 4.7 Thinking xHigh | 76.5 | 87.2 | 82.1 | 50.7 | 92.9 | 78.3 | 77.9 | 66.7 |
| Claude Opus 4.8 Thinking Max | 76.2 | 89.2 | 81.8 | 50.5 | 94.3 | 66.0 | 79.7 | 72.0 |
| Qwen 3.8 Flash Next open | 76.2 | 87.4 | 72.6 | 61.6 | 85.8 | 74.2 | 74.6 | 77.1 |
| GLM-5.3 open | 76.1 | 85.8 | 79.0 | 60.9 | 87.9 | 70.2 | 79.9 | 69.3 |
| Claude Sonnet 5 xHigh | 76.0 | 88.7 | 80.7 | 59.4 | 92.9 | 71.7 | 75.0 | 63.9 |
| Gemini 3.8 Flash High | 75.8 | 89.3 | 72.5 | 54.2 | 91.6 | 54.0 | 87.8 | 81.4 |
| Grok 4.5 | 75.8 | 87.2 | 68.6 | 56.5 | 90.8 | 73.0 | 82.8 | 71.5 |

{: .table .table-striped }

<div class="callout-box">
<strong>⚡ Key takeaways:</strong><br>
• <strong>Current leaderboard leader:</strong> Claude Fable 5.1 Max (83.4), followed by Claude Opus 5.5 (83.2) and Fable 5 Max (83.0)<br>
• <strong>OpenAI's GPT-6 family is now represented:</strong> Astra (82.2), 6.1 Sol (81.6), Sol (79.3), and Luna (72.0)<br>
• <strong>New contenders:</strong> Muse Spark 1.3 (81.6), DeepSeek V4.1 Flash (81.1), Kimi K3 (79.2), and Gemini 3.7 Flash (78.8)<br>
• <strong>Version note:</strong> the leaderboard was checked October 4; its question-set release is still 2026-06-25. Model submissions continue to appear within that release.
</div>

---

## ProgramBench

<div class="source-box">
<strong>Source:</strong> <a href="https://programbench.com/">ProgramBench</a> · 200 tasks · leaderboard updated September 28, 2026 · <a href="https://arxiv.org/abs/2605.03546">paper</a>
</div>

ProgramBench asks an agent to recreate a program from its compiled executable and documentation, without source code, decompilation, or internet access. It measures a much harder and different task than fixing a bounded repository issue. A task counts as resolved only when the recreated program passes all behavioral tests.

| Rank | Model / effort | Resolved | Almost resolved | Run cost |
|------|----------------|----------|-----------------|----------|
| 1 | Claude Opus 5 (xhigh) | 4.5% | 37.0% | $50.53 |
| 2 | Muse Spark 1.3 (max) | 2.5% | 25.0% | $6.46 |
| 3 | Muse Spark 1.3 (xhigh) | 1.0% | 16.5% | $2.02 |
| 4 | GPT-5.6 Sol (xhigh) | 1.0% | 15.5% | $6.08 |
| 5 | GPT-5.5 (xhigh) | 0.5% | 13.5% | $8.85 |
| 6 | Gemini 3.6 Flash | 0.5% | 4.0% | $4.83 |
| 7 | GPT-5.6 Sol | 0.5% | 2.5% | $1.00 |
| 8 | Claude Opus 4.8 (xhigh) | 0% | 16.5% | $21.02 |
| 9 | GLM-5.2 | 0% | 8.5% | $25.36 |

These are results from ProgramBench's published mini-SWE-agent runs; effort setting and agent scaffold matter. Its strict full-resolution rates are low by design, so don't compare them directly with SWE-bench Verified or interpret them as a day-to-day coding success rate.

---

## Chatbot Arena Code

<div class="source-box">
<strong>Source:</strong> <a href="https://lmarena.ai/">lmarena.ai</a> Code category (February 2026) · Human preference voting on coding tasks
</div>

| Model | Elo Score | Notes |
|-------|-----------|-------|
| Claude Opus 4.5 thinking-32k | 1497 | Thinking variant |
| GPT-5.2 high reasoning | 1470 | High reasoning mode |
| Claude Opus 4.5 | 1468 | Standard (non-thinking) |
| Gemini 3 Flash | 1443 | |
| GLM-4.7 | 1440 | |
| GPT-5.2 | 1432 | |
| Claude Opus 4.1 | 1431 | |
| o3 | 1417 | |
| GPT-5 | 1407 | |
| Claude Sonnet 4.5 | 1383 | |
| GPT-4o | 1372 | |
| Gemini 2.5 Pro | 1372 | |
| Kimi K2 Thinking Turbo | 1356 | |
| DeepSeek V3.2 Reasoner | 1350 | |
| Claude Haiku 4.5 | 1290 | |
| DeepSeek V3.2 Chat | 1287 | |

*Note: Arena Code data could not be refreshed; these are February 2026 results. The table is a historical snapshot, not a current model ranking.*

<div class="callout">
<strong>"Thinking" variants are labeled explicitly.</strong> Claude Opus 4.5 thinking-32k (rank 1, 1497 Elo) does explicit reasoning passes. The standard Opus 4.5 (rank 3, 1468 Elo) is still excellent but slightly lower. Both cost $0.50/task but thinking models are slower and burn more tokens on complex tasks.
</div>

<div class="callout tip">
<strong>Takeaway:</strong> The archived top group was tightly packed (1468–1497 Elo). Arena Code's table was inaccessible during this refresh, so don't use these old model prices or rankings to choose among today's releases.
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
| **ProgramBench** | Rebuilding executable programs from docs/binaries | [programbench.com](https://programbench.com/) - 200 tasks, strict behavioral-test pass; not comparable to issue-fixing scores |

For repository issue fixing, SWE-bench is relevant; for code editing, Aider's historical runs provide context. ProgramBench tests a different, much broader full-program reconstruction task.

---

## Appendix: GitHub Copilot — billing changed June 1, 2026

GitHub moved Copilot to **usage-based AI credit billing** on June 1, 2026. The old "premium request multiplier" system is now legacy-only for some existing annual Pro/Pro+ subscribers. For current usage:

- **1 AI credit = $0.01 USD**
- Models are priced per token; Copilot rates can differ from provider API rates
- The Copilot column in these tables now simply shows **✓** (available) or **-** (not available)

Models listed in Copilot pricing as of October 2026:

| Provider | Models |
|----------|--------|
| OpenAI | GPT-6 Astra, GPT-6/6.1 Sol, GPT-6 Luna, GPT-5.6 Sol/Terra/Luna, GPT-5.5, GPT-5.4, GPT-5.4 mini/nano, GPT-5.3-Codex, GPT-5 mini |
| Anthropic | Claude Fable 5/5.1, Opus 5/5.5, Opus 4.8, Sonnet 5/5.5, Sonnet 4/4.6, Haiku 4.5 |
| Google | Gemini 3.7 Flash, Gemini 3.8 Flash |
| xAI / Moonshot / Microsoft | Grok 4.5/4.6/4.7, Kimi K3, MAI-Code-1.1-Flash |

Copilot's per-token rates can differ from provider API pricing and may have context tiers, cached-input rates, cache-write charges, or promotional prices. The API-based $/task column is not an estimate of Copilot's bill. Consult the linked rate card before quoting a Copilot cost. `1 AI credit = $0.01`.

<div class="source-box">
<strong>Source:</strong> <a href="https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing">GitHub Copilot models and pricing</a>
</div>

← Back to [AI Guide](/ai-coding-guide/)
