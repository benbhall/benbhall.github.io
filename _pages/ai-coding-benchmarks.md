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

<span class="update-badge">📅 Snapshot: November 2026</span>

This page collates benchmark data from independent sources to help you compare models. **These aren't my benchmarks** - I'm just pulling highlights so you don't have to tab between sites.

For the latest data, always check the original sources. Data used here: LiveBench 2.0 (release 2026-10-25), Arena Code (published October 28, 2026), ProgramBench (October 22, 2026), SWE-bench Verified (standardized runs from February 2026, plus one from September 1, 2026) and Aider (archive, last run October 3, 2025).

---

## LiveBench 2.0

<div class="source-box">
<strong>Source:</strong> <a href="https://livebench.ai/">livebench.ai</a> (release 2026-10-25) · seven suites of long-running, practical tasks · one run per suite
</div>

**What changed:** LiveBench replaced its short-question benchmark with LiveBench 2.0 in October 2026. Models now do longer pieces of work: extending applications over several rounds of changing requirements, fixing bugs taken from real merged pull requests, building decks and documents, completing tasks in a real browser, and writing research reports. Short reasoning and data-analysis questions remain as two of the seven suites. The overall score weights long agentic work ×2, coding and design ×1.5, and the rest ×1.

**Comparing with older numbers:** the scale is new. The top models score a little higher on 2.0 (Claude Opus 5.5 went from 83.2 to 85.1), but most others score much lower: Gemini 3.8 Flash dropped from 75.8 to 59.2 and Muse Spark 1.3 from 81.6 to 63.0, mainly because of the long agentic suite. Don't compare a 2.0 score with a score from the old leaderboard (final release 2026-06-25, still viewable on the LiveBench site).

| Model | Overall | Agentic | Coding | Design | Browser | Data | Research | Reasoning |
|-------|---------|---------|--------|--------|---------|------|----------|-----------|
| Claude Fable 5.1 | 85.7 | 77.9 | 97.7 | 83.4 | 89.8 | 80.3 | 82.0 | 91.7 |
| GPT-6 Astra | 85.6 | 77.5 | 93.7 | 82.0 | 91.3 | 83.0 | 85.2 | 92.7 |
| Claude Opus 5.5 | 85.1 | 72.8 | 96.3 | 86.9 | 88.4 | 80.3 | 85.0 | 92.2 |
| GPT-6.1 Sol | 84.1 | 68.7 | 96.0 | 82.1 | 93.3 | 82.7 | 83.5 | 92.6 |
| Claude Sonnet 5.5 | 80.0 | 63.4 | 94.7 | 85.0 | 89.3 | 59.5 | 83.6 | 91.6 |
| Gemini 4 Argon | 79.3 | 61.2 | 89.7 | 73.7 | 82.8 | 85.2 | 83.1 | 95.1 |
| GPT-6.1 Terra | 77.8 | 48.6 | 94.3 | 82.3 | 93.1 | 82.3 | 73.9 | 88.7 |
| Muse Wonder 1.0 | 74.2 | 52.6 | 86.2 | 75.1 | 60.0 | 81.6 | 88.0 | 90.6 |
| DeepSeek V4.1 Flash 1017 | 72.9 | 35.7 | 96.0 | 83.4 | 67.2 | 79.5 | 79.5 | 89.1 |
| Kimi K3.1 Pro | 71.3 | 39.1 | 81.8 | 77.8 | 75.9 | 79.1 | 77.9 | 91.1 |
| Grok 4.7 | 70.1 | 46.1 | 84.5 | 78.0 | 49.3 | 76.9 | 86.4 | 82.7 |
| Claude Haiku 5.5 | 69.8 | 40.0 | 91.4 | 83.1 | 69.5 | 53.1 | 81.9 | 82.4 |
| MiMo V2.6 Pro | 68.5 | 35.2 | 81.5 | 78.5 | 77.3 | 72.3 | 76.7 | 79.6 |
| GPT-5.6 Terra | 67.8 | 33.1 | 86.2 | 76.0 | 70.3 | 79.3 | 60.4 | 90.6 |
| Grok 4.6 | 67.8 | 28.0 | 89.1 | 79.8 | 49.4 | 75.3 | 84.5 | 91.2 |
| MiniMax M3.1 Flash | 66.9 | 28.8 | 83.9 | 74.0 | 80.6 | 71.4 | 72.7 | 82.9 |
| GPT-6 Luna | 64.6 | 30.9 | 84.5 | 82.5 | 70.3 | 73.4 | 43.5 | 81.8 |
| Kimi K3 | 64.6 | 26.4 | 59.3 | 77.2 | 75.2 | 78.7 | 79.0 | 90.7 |
| Mistral Large 4 1029 | 63.5 | 27.5 | 95.4 | 76.3 | 17.4 | 76.6 | 79.7 | 85.2 |
| Muse Spark 1.3 | 63.0 | 25.5 | 90.2 | 74.8 | 30.9 | 79.6 | 68.6 | 89.7 |
| GLM-5.3 Flash | 62.1 | 19.0 | 80.6 | 77.2 | 59.8 | 76.4 | 70.1 | 77.6 |
| Qwen3.8 Max | 61.6 | 29.9 | 60.3 | 78.6 | 49.4 | 78.4 | 69.9 | 88.2 |
| Gemini 3.8 Flash | 59.2 | 16.5 | 82.2 | 72.7 | 45.1 | 54.0 | 79.1 | 89.3 |
| Step 5 (Preview) | 58.6 | 19.4 | 85.6 | 76.9 | 24.8 | 63.5 | 72.8 | 83.8 |
| Qwen3.8 27B | 58.4 | 20.6 | 86.8 | 75.9 | 24.2 | 76.6 | 59.4 | 80.0 |

{: .table .table-striped }

Seven more open-weight models scored between 38.7 and 51.6; see the LiveBench site for the full list.

<div class="callout tip">
<strong>Takeaway:</strong> The top four are within 1.6 points of each other: Claude Fable 5.1 (85.7), GPT-6 Astra (85.6), Claude Opus 5.5 (85.1) and GPT-6.1 Sol (84.1). The long agentic suite separates models more than anything else. Gemini 3.8 Flash scores 82.2 on coding but 16.5 on long agentic work. GPT-6.1 Sol costs half as much per task as Opus 5.5 and a fifth as much as Fable 5.1 or Astra, for a slightly lower score.
</div>

---

## Arena Code

<div class="source-box">
<strong>Source:</strong> <a href="https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset">Arena leaderboard dataset</a> (text arena, coding category, style control on; published October 28, 2026) · blind human votes between two anonymous models
</div>

People submit a coding prompt, get answers from two anonymous models and vote for the better one. The rating comes from those votes. Style control adjusts for things voters tend to reward regardless of quality, such as longer answers and heavy markdown; it's Arena's default view.

| Rank | Model as listed | Score | 95% CI | Votes |
|------|-----------------|-------|--------|-------|
| 1 | Gemini 4 Carbon (High) | 1573 | 1555–1592 | 1,106 |
| 2 | Claude Opus 4.7 (High) | 1551 | 1545–1557 | 18,587 |
| 3 | Claude Opus 5.5 (High) | 1551 | 1538–1563 | 2,555 |
| 4 | Claude Fable 5 (High) | 1550 | 1544–1557 | 11,629 |
| 5 | Gemini 4 Argon (High) | 1550 | 1539–1562 | 2,813 |
| 6 | Claude Opus 4.6 (High) | 1548 | 1542–1553 | 21,789 |
| 7 | Claude Opus 4.6 | 1546 | 1541–1551 | 24,611 |
| 8 | Claude Opus 4.7 | 1546 | 1540–1552 | 18,788 |
| 9 | Muse Wonder (Max) | 1545 | 1531–1559 | 1,902 |
| 10 | Muse Spark 1.2 (xHigh) | 1543 | 1531–1554 | 2,987 |
| 11 | GPT-6 Astra (Max) | 1542 | 1532–1553 | 3,393 |
| 12 | GPT-6.1 Sol (Max) | 1541 | 1527–1556 | 1,896 |
| 13 | Kimi K3 (Max) | 1540 | 1533–1547 | 9,235 |
| 14 | MiMo-V2.6-Pro | 1538 | 1521–1556 | 1,091 |
| 15 | Claude Fable 5.1 (Max) | 1537 | 1526–1547 | 3,403 |
| 16 | Claude Opus 5 (High) | 1534 | 1528–1540 | 18,778 |
| 17 | Muse Spark 1.3 (Max) | 1534 | 1525–1543 | 5,707 |
| 18 | Claude Opus 4.8 (High) | 1534 | 1528–1540 | 17,403 |
| 19 | Muse Spark 1.1 | 1533 | 1527–1539 | 12,770 |
| 20 | GPT-5.6 Sol (xHigh) | 1533 | 1526–1539 | 11,636 |
| 21 | Claude Opus 4.5 (High, 32K, 20251101) | 1530 | 1523–1538 | 7,777 |
| 22 | Gemini 3.8 Flash (High) | 1530 | 1523–1537 | 12,376 |
| 23 | Claude Opus 4.8 | 1529 | 1524–1535 | 18,091 |
| 24 | Claude Sonnet 5.5 (xHigh) | 1529 | 1516–1542 | 2,339 |
| 25 | Muse Spark | 1529 | 1519–1539 | 3,941 |

Gemini 4 Carbon is on Arena but isn't in Google's API price list yet.

<div class="callout tip">
<strong>Takeaway:</strong> The top 25 span 44 points, and most confidence intervals overlap with their neighbours. Claude Opus 4.6 and 4.7 still rate as highly as the newest models here, so Arena separates current models less clearly than LiveBench does. It covers more models than any other source on this page, though, which makes it useful for models nobody else has tested.
</div>

<div class="callout">
<strong>Why this was stuck at February 2026:</strong> the arena.ai site loads its leaderboard with JavaScript and sits behind a bot check, so the scraper used for earlier updates got an empty page. Arena publishes the same leaderboard as a dataset on Hugging Face, which is where these numbers now come from.
</div>

---

## ProgramBench

<div class="source-box">
<strong>Source:</strong> <a href="https://programbench.com/">ProgramBench</a> · 200 tasks · leaderboard updated October 22, 2026 · <a href="https://arxiv.org/abs/2605.03546">paper</a>
</div>

ProgramBench asks an agent to recreate a program from its compiled executable and documentation, without source code, decompilation, or internet access. It measures a much harder and different task than fixing a bounded repository issue. A task counts as resolved only when the recreated program passes all behavioral tests.

| Rank | Model / effort | Resolved | Almost resolved | Run cost |
|------|----------------|----------|-----------------|----------|
| 1 | Claude Opus 5.5 (xhigh) | 18.5% | 70.5% | $36.36 |
| 2 | Claude Fable 5.1 (xhigh) | 9.0% | 55.5% | $56.84 |
| 3 | Muse Wonder Full | 8.5% | 60.0% | not published |
| 4 | Muse Wonder (xhigh) | 5.5% | 50.5% | $36.53 |
| 5 | GPT-6 Astra (max) | 5.0% | 52.5% | $11.47 |
| 6 | Claude Opus 5 (xhigh) | 4.5% | 37.0% | $50.53 |
| 7 | Muse Spark 1.3 (max) | 2.5% | 25.0% | $6.46 |
| 8 | Muse Spark 1.3 (xhigh) | 1.0% | 16.5% | $2.02 |
| 9 | GPT-5.6 Sol (xhigh) | 1.0% | 15.5% | $6.08 |
| 10 | GPT-5.5 (xhigh) | 0.5% | 13.5% | $8.85 |

These are ProgramBench's own mini-SWE-agent runs; run cost is the average API cost per task. Claude Opus 5.5 resolved four times as many tasks as Opus 5, at a lower cost per task. Full-resolution rates are low by design, so don't compare them with SWE-bench Verified or read them as a day-to-day coding success rate.

---

## SWE-bench Verified

<div class="source-box">
<strong>Source:</strong> <a href="https://www.swebench.com/">swebench.com</a> · tests whether models can fix real GitHub issues · <em>standardized harness: mini-SWE-agent, one attempt per issue</em>
</div>

| Model | Score | Run date | $/task | Copilot |
|-------|-------|----------|--------|---------|
| Claude Opus 4.5 (high) | 76.8% | Feb 2026 | $0.50 | - |
| MiniMax M2.5 (high) | 75.8% | Feb 2026 | $0.07 | - |
| Gemini 3 Flash (high) | 75.8% | Feb 2026 | $0.06 | - |
| Claude Opus 4.6 | 75.6% | Feb 2026 | $0.50 | - |
| GPT-5.2 (high) | 72.8% | Feb 2026 | $0.23 | - |
| GPT-5.2-Codex | 72.8% | Feb 2026 | $0.23 | - |
| GLM-5 (high) | 72.8% | Feb 2026 | $0.05 | - |
| Gemini 3.5 Flash (medium) | 71.8% | Sep 2026 | - | - |
| Claude Sonnet 4.5 (high) | 71.4% | Feb 2026 | $0.30 | - |
| Kimi K2.5 (high) | 70.8% | Feb 2026 | - | - |
| DeepSeek V3.2 (high) | 70.0% | Feb 2026 | - | - |
| Gemini 3 Pro (high) | 69.6% | Feb 2026 | - | - |
| Claude Haiku 4.5 (high) | 66.6% | Feb 2026 | $0.10 | ✓ |
| GPT-5 mini | 56.2% | Feb 2026 | $0.03 | - |

**$/task** uses the same 50K input + 10K output token estimate as the [comparison page](/ai-coding-guide/compare/), at current list prices; "-" means the model is retired or I couldn't confirm its current price. The February runs used mini-SWE-agent 2.0.0. The Gemini 3.5 Flash run used version 2.4.2, and Google now routes that model to Gemini 3.6 Flash. DeepSeek V3.2 and Gemini 3 Pro are retired.

<div class="callout tip">
<strong>Takeaway:</strong> None of the models released since February has a standardized Verified run, and that's why the SWE-bench column on the comparison page is mostly empty. Providers still quote Verified scores above 90% for their newest models, but those come from their own agents and settings, so they aren't comparable with these runs and aren't included here. Use this table to compare the older models in it, not to rank current releases.
</div>

---

## Aider Polyglot

<div class="source-box">
<strong>Source:</strong> <a href="https://aider.chat/docs/leaderboards/">aider.chat/docs/leaderboards</a> (last run: October 3, 2025) · Tests code editing across C++, Go, Java, JavaScript, Python, Rust
</div>

<div class="callout">
<strong>Archive:</strong> Aider's leaderboard hasn't added a model since October 3, 2025, so none of the models released in 2026 has a score. It's no longer on the comparison page; the results are kept here for reference.
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

LiveBench 2.0's coding suite and SWE-bench both use real bug fixes; Aider's archived runs cover multi-language code editing up to October 2025. ProgramBench tests a different, much broader full-program reconstruction task.

---

## Appendix: GitHub Copilot — billing changed June 1, 2026

GitHub moved Copilot to **usage-based AI credit billing** on June 1, 2026. The old "premium request multiplier" system is now legacy-only for some existing annual Pro/Pro+ subscribers. For current usage:

- **1 AI credit = $0.01 USD**
- Models are priced per token; Copilot rates can differ from provider API rates
- The Copilot column in these tables now simply shows **✓** (available) or **-** (not available)

Models listed in Copilot pricing as of November 2026:

| Provider | Models |
|----------|--------|
| OpenAI | GPT-6 Astra, GPT-6/6.1 Sol, GPT-6.1 Terra, GPT-6 Luna, GPT-5.6 Sol/Terra/Luna, GPT-5.4 nano, GPT-5.3-Codex |
| Anthropic | Claude Fable 5/5.1, Opus 5/5.5, Opus 4.8, Sonnet 5/5.5, Sonnet 4/4.6, Haiku 5.5, Haiku 4.5 |
| Google | Gemini 4 Argon, Gemini 3.8 Flash |
| xAI / Moonshot / Microsoft | Grok 4.5/4.6/4.7, Kimi K3, MAI-Code-1.1-Flash |

Since October, GitHub has added Claude Haiku 5.5, GPT-6.1 Terra and Gemini 4 Argon, and removed GPT-5.5, GPT-5.4, GPT-5.4 mini, GPT-5 mini and Gemini 3.7 Flash.

Copilot's per-token rates can differ from provider API pricing and may have context tiers, cached-input rates, cache-write charges, or promotional prices. The API-based $/task column is not an estimate of Copilot's bill. Consult the linked rate card before quoting a Copilot cost. `1 AI credit = $0.01`.

<div class="source-box">
<strong>Source:</strong> <a href="https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing">GitHub Copilot models and pricing</a>
</div>

← Back to [AI Guide](/ai-coding-guide/)
