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

<span class="update-badge">📅 Snapshot: August 2026</span>

This page collates benchmark data from independent sources to help you compare models. **These aren't my benchmarks** - I'm just pulling highlights so you don't have to tab between sites.

For the latest data, always check the original sources. Data current as of: SWE-bench (February 2026), Aider (June 2025), Arena Code (February 2026).

---

## SWE-bench Verified

<div class="source-box">
<strong>Source:</strong> <a href="https://www.swebench.com/">swebench.com</a> (February 2026) · Tests whether models can fix real GitHub issues · <em>Standardized harness: mini-SWE-agent v2.0.0, high reasoning mode where available</em>
</div>

| Model | Score | $/task | Copilot |
|-------|-------|--------|---------|
| Claude Opus 4.5 | 76.8% | $0.50 | ✓ |
| Minimax M2.5 | 75.8% | $0.07 | - |
| Gemini 3 Flash | 75.8% | $0.06 | ✓ |
| Claude Opus 4.6 | 75.6% | $0.50 | ✓ |
| GPT-5.2 (high reasoning) | 72.8% | $0.23 | ✓ |
| GLM-5 | 72.8% | $0.05 | - |
| GPT-5.2 | 72.8% | $0.23 | ✓ |
| Claude Sonnet 4.5 | 71.4% | $0.30 | ✓ |
| Kimi K2.5 | 70.8% | $0.15 | - |
| DeepSeek V4 Flash | 70.0% | $0.01 | - |
| Gemini 3.1 Pro | 69.6% | $0.22 | ✓ |
| Claude Opus 4.1 | 67.6% | $1.50 | ✓ |
| Claude Haiku 4.5 | 66.6% | $0.10 | ✓ |
| GPT-5 | 65.0% | $0.16 | ✓ |
| Kimi K2 Thinking Turbo | 63.4% | $0.06 | - |
| GPT-5 mini | 56.2% | $0.03 | ✓ |
| Gemini 2.5 Pro | 53.6% | $0.16 | ✓ |

**$/task** = cost to solve one benchmark task via direct API (based on token usage × provider pricing). **Copilot** = available in GitHub Copilot (✓ = yes, token-based AI credit billing since Jun 2026).

<div class="callout tip">
<strong>Takeaway:</strong> No new SWE-bench data since Feb 2026. Claude Opus 4.5 remains leader at 76.8%, with DeepSeek V4 Flash (70%, $0.01/task) as the extreme budget option. Note: Claude Opus 4.1 has been retired from the main Anthropic API.
</div>

---

## Aider Polyglot

<div class="source-box">
<strong>Source:</strong> <a href="https://aider.chat/docs/leaderboards/">aider.chat/docs/leaderboards</a> (June 2025) · Tests code editing across C++, Go, Java, JavaScript, Python, Rust
</div>

<div class="callout">
<strong>Note:</strong> Aider's latest entries run up to June 2025. Includes GPT-5, Claude 4.x, Gemini 2.5 Pro, and Grok 4 variants.
</div>

| Model | % Correct | Copilot |
|-------|-----------|---------|
| GPT-5 (high reasoning) | 88.0% | ✓ |
| o3-pro (high) | 84.9% | - |
| Gemini 2.5 Pro 06-05 (32k think) | 83.1% | ✓ |
| Claude Sonnet 4.5 | 82.4% | ✓ |
| Claude Opus 4.1 | 82.1% | ✓ |
| o3 (high) | 81.3% | - |
| Grok 4 (high) | 79.6% | - |
| DeepSeek V4 Flash (Reasoner) | 74.2% | - |
| Claude Haiku 4.5 | 73.5% | ✓ |
| o4-mini | 72.0% | - |
| Claude Opus 4.5 | 70.7% | ✓ |
| DeepSeek V4 Flash (Chat) | 70.2% | - |
| Kimi K2 | 59.1% | - |
| Claude Sonnet 4 | 56.4% | ✓ |
| Gemini 2.5 Flash (thinking) | 55.1% | - |
| DeepSeek V3 (0324) | 55.1% | - |
| Grok 3 Beta | 53.3% | - |
| GPT-4.1 | 52.4% | - |
| Grok 3 Mini Beta (high) | 49.3% | - |
| GPT-5 mini | 50.2% | ✓ |

<div class="callout tip">
<strong>Takeaway:</strong> GPT-5 high reasoning still dominates at 88%, followed by o3-pro (84.9%) and Gemini 2.5 Pro 06-05 thinking (83.1%). Claude Sonnet 4.5 (82.4%) remains the practical choice. DeepSeek V4 Flash is V3.2 rebranded — same strong scores (74.2% reasoner, 70.2% chat). Claude Sonnet 4 plain (56.4%) shows the thinking tokens really do matter for Aider tasks.
</div>

---

## LiveBench

<div class="source-box">
<strong>Source:</strong> <a href="https://livebench.ai/">livebench.ai</a> (August 2026, release 2026-06-25) · Contamination-free benchmark with 23 diverse tasks
</div>

**What it is:** A contamination-free benchmark with 23 diverse tasks spanning Coding, Agentic Coding, Data Analysis, Language, Instruction Following, Math, and Reasoning. Questions refresh every 6 months and are delay-released to minimize training contamination. Scores use objective ground-truth answers, not LLM judges.

**Why it matters:** Most benchmarks face contamination (models train on test data). LiveBench addresses this with regular question rotation and delayed public release. The Global Average provides a single score across multiple capabilities, avoiding narrow specialization.

| Model | Global Avg | Coding | Agentic | Data | Language | IF | Math | Reasoning |
|-------|------------|--------|---------|------|----------|-----|------|-----------|
| Claude Fable 5 xHigh | 83.0 | 89.7 | 86.0 | 62.2 | 96.0 | 80.5 | 90.7 | 75.8 |
| GPT-5.6 Sol xHigh | 81.0 | 91.7 | 83.9 | 56.2 | 96.2 | 79.8 | 87.7 | 71.8 |
| GPT-5.5 Thinking xHigh | 80.2 | 89.7 | 82.1 | 54.0 | 95.9 | 81.6 | 87.4 | 70.7 |
| Claude Opus 5 Thinking Max | 80.1 | 91.2 | 81.4 | 65.2 | 95.7 | 74.6 | 88.7 | 63.8 |
| Kimi K3 | 79.2 | 90.7 | 81.4 | 62.2 | 84.4 | 78.7 | 85.5 | 71.4 |
| Qwen 3.8 Max | 78.5 | 88.2 | 72.9 | 64.6 | 91.3 | 78.4 | 79.7 | 74.1 |
| GPT-5.4 Thinking xHigh | 78.0 | 88.1 | 77.5 | 53.8 | 94.1 | 79.3 | 82.6 | 70.2 |
| GPT-5.6 Terra xHigh | 77.9 | 90.6 | 78.2 | 54.9 | 94.9 | 79.3 | 82.9 | 64.6 |
| Gemini 3.1 Pro High | 77.0 | 84.0 | 76.5 | 44.1 | 91.0 | 78.5 | 85.4 | 79.1 |
| Claude Opus 4.7 Thinking xHigh | 76.5 | 87.2 | 82.1 | 50.7 | 92.9 | 78.3 | 77.9 | 66.7 |
| Claude Opus 4.8 Thinking Max | 76.2 | 89.2 | 81.8 | 50.5 | 94.3 | 66.0 | 79.7 | 72.0 |
| Claude Sonnet 5 xHigh | 76.0 | 88.7 | 80.7 | 59.4 | 92.9 | 71.7 | 75.0 | 63.9 |
| Grok 4.5 | 75.8 | 87.2 | 68.6 | 56.5 | 90.8 | 73.0 | 82.8 | 71.5 |
| Gemini 3.5 Flash High | 74.6 | 82.0 | 78.2 | 49.0 | 88.2 | 64.9 | 84.6 | 75.6 |
| GPT-5.2 High | 74.6 | 83.2 | 76.1 | 50.3 | 93.2 | 78.2 | 79.8 | 61.8 |
| Claude Opus 4.6 Thinking | 74.5 | 88.7 | 78.2 | 49.0 | 89.3 | 69.9 | 83.3 | 63.3 |
| DeepSeek V4 Flash (Jul 31) | 74.2 | 86.6 | 75.0 | 46.8 | 86.8 | 79.3 | 79.2 | 65.5 |
| GPT-5.2 Codex | 74.0 | 77.7 | 83.6 | 49.4 | 88.8 | 78.2 | 73.7 | 66.4 |
| Gemini 3.6 Flash High | 73.6 | 85.1 | 77.9 | 43.4 | 86.4 | 63.0 | 83.9 | 75.4 |
| GPT-5.6 Luna xHigh | 73.6 | 85.6 | 82.9 | 48.4 | 87.2 | 78.0 | 72.6 | 60.1 |
| GLM-5.2 | 73.2 | 78.6 | 79.7 | 51.8 | 89.8 | 73.7 | 76.2 | 62.3 |
| Claude Sonnet 4.6 Thinking | 73.0 | 84.8 | 79.3 | 42.6 | 87.0 | 77.9 | 76.1 | 63.2 |
| Claude Opus 4.5 Thinking High | 72.6 | 80.1 | 79.7 | 39.7 | 90.4 | 74.4 | 81.3 | 62.5 |
| DeepSeek V4 Pro | 71.6 | 82.7 | 70.0 | 42.6 | 90.7 | 74.5 | 78.1 | 62.4 |
| GPT-5.4 Nano xHigh | 69.6 | 81.1 | 70.8 | 46.8 | 91.0 | 67.6 | 62.5 | 67.2 |
| Minimax M3 | 67.3 | 74.5 | 68.2 | 40.7 | 76.9 | 76.2 | 76.8 | 57.5 |
| GPT-5.4 Mini xHigh | 66.4 | 71.3 | 71.6 | 41.7 | 78.5 | 70.8 | 71.0 | 59.8 |
| DeepSeek V4 Flash | 65.5 | 70.6 | 69.2 | 37.6 | 79.6 | 68.0 | 70.1 | 63.1 |
| Gemini 3.5 Flash-Lite High | 63.9 | 60.2 | 76.1 | 45.3 | 73.7 | 53.2 | 71.8 | 67.2 |
| Gemini 2.5 Pro | 58.3 | 57.1 | 55.9 | 46.7 | 70.2 | 56.9 | 69.6 | 51.7 |
| GPT-5.2 No Thinking | 48.9 | 42.8 | 76.5 | 40.0 | 58.3 | 47.7 | 50.0 | 27.2 |
| Gemini 2.5 Flash | 47.7 | 51.1 | 41.4 | 31.7 | 57.6 | 47.2 | 56.5 | 48.3 |
| Claude Haiku 4.5 | 45.3 | 52.2 | 43.5 | 26.7 | 54.1 | 42.5 | 51.4 | 47.0 |

{: .table .table-striped }

<div class="callout-box">
<strong>⚡ Key takeaways:</strong><br>
• <strong>LiveBench refreshed to v2026-06-25</strong> — scores shifted for all models; compare within this version only<br>
• <strong>New #1: Claude Fable 5</strong> (83.0) leads, with GPT-5.6 Sol (81.0) and GPT-5.5 (80.2) close behind<br>
• <strong>New Anthropic models:</strong> Claude Opus 5 (80.1) and Claude Sonnet 5 (76.0) — two new tiers to choose from<br>
• <strong>GPT-5.6 family:</strong> Sol ($0.55), Terra ($0.22), Luna ($0.02) — three variants across the price spectrum<br>
• <strong>DeepSeek V4 Flash Jul 31 update</strong> jumped from 65.5 → 74.2 — best-value model for agentic tasks at $0.01/task
</div>

---

## Chatbot Arena Code

<div class="source-box">
<strong>Source:</strong> <a href="https://lmarena.ai/">lmarena.ai</a> Code category (February 2026) · Human preference voting on coding tasks
</div>

| Rank | Model | Elo Score | $/task | Copilot | Notes |
|------|-------|-----------|--------|---------|-------|
| 1 | Claude Opus 4.5 thinking-32k | 1497 | $0.50 | ✓ | Thinking variant |
| 2 | GPT-5.2 high reasoning | 1470 | $0.23 | ✓ | High reasoning mode |
| 3 | Claude Opus 4.5 | 1468 | $0.50 | ✓ | Standard (non-thinking) |
| 4 | GLM-4.7 | 1440 | $0.05 | - | |
| 5 | Gemini 3 Flash | 1443 | $0.06 | ✓ | |
| 6 | GPT-5.2 | 1432 | $0.23 | ✓ | |
| 7 | Claude Opus 4.1 | 1431 | $1.50 | ✓ | |
| 8 | o3 | 1417 | $0.18 | - | |
| 9 | Minimax M2.1 preview | 1408 | $0.03 | - | |
| 10 | GPT-5 | 1407 | $0.16 | ✓ | |
| 11 | Grok 4.1 Fast | 1393 | - | - | |
| 12 | Claude Sonnet 4.5 | 1383 | $0.30 | ✓ | |
| 13 | GPT-4o | 1372 | $0.23 | - | |
| 14 | Gemini 2.5 Pro | 1372 | $0.16 | ✓ | |
| 15 | Kimi K2 Thinking Turbo | 1356 | $0.06 | - | |
| 16 | DeepSeek V4 Flash | 1350 | $0.01 | - | |
| 17 | Claude Haiku 4.5 | 1290 | $0.10 | ✓ | |
| 18 | GPT-4.1 | 1305 | $0.18 | - | |

*Note: Arena Code data not refreshed this update (access issues). Data as of February 2026. DeepSeek V3.2 Reasoner renamed to DeepSeek V4 Flash.*

<div class="callout">
<strong>"Thinking" variants are labeled explicitly.</strong> Claude Opus 4.5 thinking-32k (rank 1, 1497 Elo) does explicit reasoning passes. The standard Opus 4.5 (rank 3, 1468 Elo) is still excellent but slightly lower. Both cost $0.50/task but thinking models are slower and burn more tokens on complex tasks.
</div>

<div class="callout tip">
<strong>Takeaway:</strong> Top tier is tightly packed (1468-1497 Elo). For budget: GLM-4.7 (1440 Elo) at $0.05/task or Minimax M2.1 (1408) at $0.03/task punch way above their weight. <strong>Note: Arena Code data is from February 2026 — newer models (Claude 4.6, GPT-5.4, Gemini 3.1 Pro) don’t have Arena scores yet.</strong>
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

## Appendix: GitHub Copilot — billing changed June 1, 2026

GitHub moved Copilot to **usage-based AI credit billing** on June 1, 2026. The old "premium request multiplier" system is now legacy-only (affects only Copilot Pro/Pro+ users who were on existing annual plans). For everyone else:

- **1 AI credit = $0.01 USD**
- Models are priced per token (same rates as direct API access)
- The Copilot column in these tables now simply shows **✓** (available) or **-** (not available)

Models available in Copilot as of June 2026:

| Provider | Models |
|----------|--------|
| OpenAI | GPT-5.5, GPT-5.4, GPT-5.4 mini, GPT-5.4 nano, GPT-5.3-Codex, GPT-5 mini |
| Anthropic | Claude Fable 5, Claude Opus 4.5–4.8, Claude Sonnet 4–4.6, Claude Haiku 4.5 |
| Google | Gemini 3.5 Flash, Gemini 3.1 Pro, Gemini 3 Flash, Gemini 2.5 Pro |
| Other | Raptor mini (GitHub), MAI-Code-1-Flash (Microsoft) |

Note: GPT-4o and GPT-4.1 are no longer listed in Copilot's published model pricing as of June 2026.

<div class="source-box">
<strong>Source:</strong> <a href="https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing">GitHub Copilot models and pricing</a>
</div>

← Back to [AI Guide](/ai-coding-guide/)
