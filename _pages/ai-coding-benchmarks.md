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

<span class="update-badge">📅 Snapshot: February 2026</span>

This page collates benchmark data from independent sources to help you compare models. **These aren't my benchmarks** - I'm just pulling highlights so you don't have to tab between sites.

For the latest data, always check the original sources. Data current as of: SWE-bench (December 2025), Aider (October 2025), Arena Code (February 2026).

---

## SWE-bench Verified

<div class="source-box">
<strong>Source:</strong> <a href="https://www.swebench.com/">swebench.com</a> (December 2025) · Tests whether models can fix real GitHub issues
</div>

| Model | Score | $/task | Copilot |
|-------|-------|--------|---------|
| Claude Opus 4.5 | 74.4% | $0.50 | 3× |
| Gemini 3 Pro | 74.2% | $0.22 | 1× |
| GPT-5.2 (high reasoning) | 71.8% | $0.53 | 1× |
| Claude Sonnet 4.5 | 70.6% | $0.30 | 1× |
| GPT-5.2 | 69.0% | $0.23 | 1× |
| Claude Opus 4.1 | 67.6% | $1.50 | 10× |
| GPT-5 (medium reasoning) | 65.0% | $0.16 | 1× |
| Gemini 3 Flash | 63.8% | $0.08 | 0.33× |
| Kimi K2 Thinking Turbo | 63.4% | $0.06 | - |
| Minimax M2 | 61.0% | $0.03 | - |
| DeepSeek V3.2 Reasoner | 60.0% | $0.02 | - |
| o3 | 58.4% | $0.18 | - |
| GLM-4.6 | 55.4% | $0.05 | - |
| Devstral 2 | 53.8% | - | - |
| Gemini 2.5 Pro | 53.6% | $0.16 | 1× |
| GPT-4o | 48.9% | $0.23 | 0× |
| Claude Haiku 4.5 | 48.4% | $0.10 | 0.33× |
| o4-mini | 45.0% | $0.10 | - |
| GPT-4.1 | 39.6% | $0.18 | 0× |
| DeepSeek V3.2 Chat | 39.0% | $0.02 | - |
| Gemini 2.5 Flash | 28.7% | $0.04 | - |
| Gemini 2.0 Flash | 22.0% | $0.01 | - |
| GPT-4o-mini | 18.6% | $0.01 | - |
| GPT-5 mini | 14.2% | $0.03 | 0× |

**$/task** = cost to solve one benchmark task via direct API (based on token usage × provider pricing). Useful for API users and for comparing relative costs. **Copilot** = GitHub Copilot premium request multiplier (0× = free on paid plans).

<div class="callout tip">
<strong>Takeaway:</strong> Claude Opus 4.5 and Gemini 3 Pro are neck-and-neck at 74%, but Gemini costs half as much ($0.22 vs $0.50). Claude Sonnet 4.5 at 70.6% for $0.30 is the sweet spot. Budget pick: Kimi K2 Thinking (63.4%) at just $0.06/task, or Minimax M2 (61%) at $0.03.
</div>

---

## Aider Polyglot

<div class="source-box">
<strong>Source:</strong> <a href="https://aider.chat/docs/leaderboards/">aider.chat/docs/leaderboards</a> (October 2025) · Tests code editing across C++, Go, Java, JavaScript, Python, Rust
</div>

<div class="callout">
<strong>Note:</strong> Aider's latest batch includes GPT-5 series, Claude 4.x, and Gemini 2.5/3 models with October 2025 data.
</div>

| Model | % Correct | Copilot |
|-------|-----------|---------|
| GPT-5 (high reasoning) | 88.0% | 1× |
| o3-pro (high) | 84.9% | - |
| Gemini 2.5 Pro 32k (think) | 83.1% | 1× |
| Claude Sonnet 4.5 | 82.4% | 1× |
| Claude Opus 4.1 | 82.1% | 10× |
| o3 (high) | 81.3% | - |
| o4-mini | 75.4% | - |
| DeepSeek V3.2 Exp Reasoner | 74.2% | - |
| Claude Haiku 4.5 | 73.5% | 0.33× |
| GPT-4o | 72.9% | 0× |
| Claude Opus 4.5 | 70.7% | 3× |
| DeepSeek V3.2 Chat | 70.2% | - |
| Gemini 2.5 Flash | 68.0% | - |
| GPT-4.1 | 66.4% | 0× |
| Kimi K2 | 59.1% | - |
| Gemini 2.0 Flash | 58.0% | - |
| GPT-4o-mini | 55.6% | - |
| GPT-5 mini | 50.2% | 0× |

<div class="callout tip">
<strong>Takeaway:</strong> GPT-5 high reasoning dominates at 88%, followed by o3-pro (84.9%) and Gemini 2.5 Pro thinking (83.1%). Claude Sonnet 4.5 (82.4%) is the practical choice at 1× Copilot cost. Surprisingly, Claude Opus 4.5 underperforms here (70.7%) despite topping SWE-bench—different benchmarks favor different strengths.
</div>

---

## LiveBench

<div class="source-box">
<strong>Source:</strong> <a href="https://livebench.ai/">livebench.ai</a> (January 2026) · Contamination-free benchmark with 23 diverse tasks
</div>

**What it is:** A contamination-free benchmark with 23 diverse tasks spanning Coding, Agentic Coding, Data Analysis, Language, Instruction Following, Math, and Reasoning. Questions refresh every 6 months and are delay-released to minimize training contamination. Scores use objective ground-truth answers, not LLM judges.

**Why it matters:** Most benchmarks face contamination (models train on test data). LiveBench addresses this with regular question rotation and delayed public release. The Global Average provides a single score across multiple capabilities, avoiding narrow specialization.

| Model | Global Avg | Coding | Agentic | Data | Language | IF | Math | Reasoning |
|-------|------------|--------|---------|------|----------|-----|------|-----------|
| Claude 4.5 Opus Thinking High | 76.0 | 80.1 | 79.7 | 63.3 | 90.4 | 74.4 | 81.3 | 62.6 |
| GPT-5.2 high reasoning | 74.8 | 83.2 | 76.1 | 51.7 | 93.2 | 78.2 | 79.8 | 61.8 |
| Gemini 3 Pro | 73.4 | 77.4 | 74.6 | 55.0 | 81.8 | 74.4 | 84.6 | 65.9 |
| Gemini 3 Flash | 72.4 | 76.3 | 71.8 | 56.7 | 86.6 | 75.6 | 81.2 | 58.5 |
| GPT-5 | 70.5 | 77.5 | 68.9 | 45.0 | 86.4 | 75.1 | 77.2 | 63.4 |
| DeepSeek V3.2 Reasoner | 62.2 | 65.3 | 58.4 | 41.7 | 78.0 | 65.9 | 75.4 | 51.1 |
| Kimi K2 Thinking Turbo | 61.6 | 66.1 | 64.9 | 40.0 | 73.6 | 63.0 | 66.3 | 56.8 |
| Grok 4.1 Fast | 60.0 | 58.4 | 63.6 | 40.0 | 78.4 | 61.4 | 71.2 | 47.3 |
| GLM-4.7 | 58.1 | 60.1 | 57.2 | 36.7 | 69.6 | 57.5 | 68.8 | 56.8 |
| Gemini 2.5 Pro | 58.3 | 57.1 | 55.9 | 46.7 | 70.2 | 56.9 | 69.6 | 51.7 |
| Claude Opus 4.5 | 59.1 | 67.1 | 64.8 | 40.0 | 67.8 | 56.5 | 63.0 | 54.2 |
| GLM-4.6 | 55.2 | 57.9 | 49.8 | 41.7 | 67.0 | 56.1 | 61.3 | 52.5 |
| Claude Opus 4.1 | 54.5 | 59.3 | 56.8 | 30.0 | 62.9 | 52.0 | 58.7 | 61.8 |
| Claude Sonnet 4.5 | 53.7 | 58.9 | 56.5 | 38.3 | 61.3 | 52.8 | 59.6 | 48.5 |
| DeepSeek V3.2 Chat | 51.8 | 60.7 | 47.5 | 40.0 | 60.1 | 51.6 | 58.9 | 43.7 |
| Gemini 2.5 Flash | 47.7 | 51.1 | 41.4 | 31.7 | 57.6 | 47.2 | 56.5 | 48.3 |
| Claude Haiku 4.5 | 45.3 | 52.2 | 43.5 | 26.7 | 54.1 | 42.5 | 51.4 | 47.0 |
| Devstral 2 | 41.2 | 49.4 | 39.1 | 26.7 | 48.3 | 38.1 | 45.5 | 41.4 |

{: .table .table-striped }

<div class="callout-box">
<strong>⚡ Key takeaways:</strong><br>
• <strong>Thinking models dominate:</strong> Claude Opus 4.5 Thinking (76.0) outperforms base version (59.1) by 17 points<br>
• <strong>Contamination-free leader:</strong> GPT-5.2 high reasoning (74.8) maintains top-3 position with advantage on Language (93.2) and Coding (83.2)<br>
• <strong>Flash vs Pro nuance:</strong> Gemini 3 Flash (72.4) rivals Pro (73.4) on average due to strong Language scores, but Pro leads significantly on <strong>Reasoning (+7.4 points)</strong> where complex coding happens (e.g. untangling messy refactors)<br>
• <strong>Category variance reveals specialization:</strong> Models vary 20-40 points across categories (e.g., Claude 90.4 Language vs 62.6 Reasoning)<br>
• <strong>Budget champion:</strong> GLM-4.7 (58.1) delivers 75% of top-tier performance at $0.05/task (10× cheaper than Claude Opus)
</div>

---

## Chatbot Arena Code

<div class="source-box">
<strong>Source:</strong> <a href="https://lmarena.ai/">lmarena.ai</a> Code category (February 2026) · Human preference voting on coding tasks
</div>

| Rank | Model | Elo Score | $/task | Copilot | Notes |
|------|-------|-----------|--------|---------|-------|
| 1 | Claude Opus 4.5 thinking-32k | 1497 | $0.50 | - | Thinking variant |
| 2 | GPT-5.2 high reasoning | 1470 | $0.53 | 1× | High reasoning mode |
| 3 | Claude Opus 4.5 | 1468 | $0.50 | 3× | Standard (non-thinking) |
| 4 | Gemini 3 Pro | 1454 | $0.22 | 1× | |
| 5 | Gemini 3 Flash | 1443 | $0.08 | 0.33× | |
| 6 | GLM-4.7 | 1440 | $0.05 | - | |
| 7 | GPT-5.2 | 1432 | $0.23 | 1× | |
| 8 | Claude Opus 4.1 | 1431 | $1.50 | 10× | |
| 9 | o3 | 1417 | $0.18 | - | |
| 10 | Minimax M2.1 preview | 1408 | $0.03 | - | |
| 11 | GPT-5 | 1407 | $0.16 | 1× | |
| 12 | Grok 4.1 Fast | 1393 | - | 0.25× | |
| 13 | Claude Sonnet 4.5 | 1383 | $0.30 | 1× | |
| 14 | GPT-4o | 1372 | $0.23 | 0× | |
| 15 | Gemini 2.5 Pro | 1372 | $0.16 | 1× | |
| 16 | Devstral 2 | 1363 | - | - | |
| 17 | Kimi K2 Thinking Turbo | 1356 | $0.06 | - | |
| 18 | DeepSeek V3.2 Reasoner | 1350 | $0.02 | - | |
| 19 | o4-mini | 1310 | $0.10 | - | |
| 20 | GPT-4.1 | 1305 | $0.18 | 0× | |
| 21 | Claude Haiku 4.5 | 1290 | $0.10 | 0.33× | |
| 22 | DeepSeek V3.2 Chat | 1287 | $0.02 | - | |

<div class="callout">
<strong>"Thinking" variants are labeled explicitly.</strong> Claude Opus 4.5 thinking-32k (rank 1, 1497 Elo) does explicit reasoning passes. The standard Opus 4.5 (rank 3, 1468 Elo) is still excellent but slightly lower. Both cost $0.50/task but thinking models are slower and burn more tokens on complex tasks.
</div>

<div class="callout tip">
<strong>Takeaway:</strong> Top tier is tightly packed (1468-1497 Elo). Gemini 3 Pro (1454) at $0.22/task offers frontier performance at half the cost of Claude Opus. For budget: GLM-4.7 (1440 Elo) at $0.05/task or Minimax M2.1 (1408) at $0.03/task punch way above their weight.
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
