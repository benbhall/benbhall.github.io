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

<span class="update-badge">📅 Snapshot: March 2026</span>

This page collates benchmark data from independent sources to help you compare models. **These aren't my benchmarks** - I'm just pulling highlights so you don't have to tab between sites.

For the latest data, always check the original sources. Data current as of: SWE-bench (February 2026), Aider (October 2025), Arena Code (February 2026).

---

## SWE-bench Verified

<div class="source-box">
<strong>Source:</strong> <a href="https://www.swebench.com/">swebench.com</a> (February 2026) · Tests whether models can fix real GitHub issues · <em>Standardized harness: mini-SWE-agent v2.0.0, high reasoning mode where available</em>
</div>

| Model | Score | $/task | Copilot |
|-------|-------|--------|---------|
| Claude Opus 4.5 | 76.8% | $0.50 | 3× |
| Minimax M2.5 | 75.8% | $0.07 | - |
| Gemini 3 Flash | 75.8% | $0.06 | 0.33× |
| Claude Opus 4.6 | 75.6% | $0.50 | 3× |
| GPT-5.2 (high reasoning) | 72.8% | $0.23 | 1× |
| GLM-5 | 72.8% | $0.05 | - |
| GPT-5.2 | 72.8% | $0.23 | 1× |
| Claude Sonnet 4.5 | 71.4% | $0.30 | 1× |
| Kimi K2.5 | 70.8% | $0.15 | - |
| DeepSeek V3.2 Reasoner | 70.0% | $0.02 | - |
| Gemini 3.1 Pro | 69.6% | $0.22 | 1× |
| Claude Opus 4.1 | 67.6% | $1.50 | 10× |
| Claude Haiku 4.5 | 66.6% | $0.10 | 0.33× |
| GPT-5 | 65.0% | $0.16 | 1× |
| Kimi K2 Thinking Turbo | 63.4% | $0.06 | - |
| Minimax M2 | 61.0% | $0.03 | - |
| o3 | 58.4% | $0.18 | - |
| GPT-5 mini | 56.2% | $0.03 | 0× |
| GLM-4.6 | 55.4% | $0.05 | - |
| Devstral 2 | 53.8% | - | - |
| Gemini 2.5 Pro | 53.6% | $0.16 | 1× |
| GPT-4o | 48.9% | $0.23 | 0× |
| o4-mini | 45.0% | $0.10 | - |
| GPT-4.1 | 39.6% | $0.18 | 0× |
| DeepSeek V3.2 Chat | 39.0% | $0.02 | - |
| Gemini 2.5 Flash | 28.7% | $0.04 | - |
| Gemini 2.0 Flash | 22.0% | $0.01 | - |
| GPT-4o-mini | 18.6% | $0.01 | - |

**$/task** = cost to solve one benchmark task via direct API (based on token usage × provider pricing). Useful for API users and for comparing relative costs. **Copilot** = GitHub Copilot premium request multiplier (0× = free on paid plans).

<div class="callout tip">
<strong>Takeaway:</strong> Scores across the board are higher with the standardized harness. Claude Opus 4.5 leads at 76.8%, but now Minimax M2.5 (75.8%, $0.07) and Gemini 3 Flash (75.8%, $0.06) are right behind — at a fraction of the cost. Claude Haiku 4.5 jumped from 48% to 67% under high reasoning mode, making it a viable mid-range option. <strong>Note: Gemini 3 Pro has been deprecated (March 9, 2026); replaced by Gemini 3.1 Pro</strong> (69.6%).
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
| Grok 4 (high) | 79.6% | - |
| DeepSeek V3.2 Exp Reasoner | 74.2% | - |
| Claude Haiku 4.5 | 73.5% | 0.33× |
| GPT-4o | 72.9% | 0× |
| o4-mini | 72.0% | - |
| Claude Opus 4.5 | 70.7% | 3× |
| DeepSeek V3.2 Chat | 70.2% | - |
| GPT-4.1 | 52.4% | 0× |
| Gemini 2.5 Flash (thinking) | 55.1% | - |
| Kimi K2 | 59.1% | - |
| Gemini 2.0 Flash | 58.0% | - |
| GPT-4o-mini | 55.6% | - |
| GPT-5 mini | 50.2% | 0× |

<div class="callout tip">
<strong>Takeaway:</strong> GPT-5 high reasoning dominates at 88%, followed by o3-pro (84.9%) and Gemini 2.5 Pro thinking (83.1%). Claude Sonnet 4.5 (82.4%) is the practical choice at 1× Copilot cost. Grok 4 enters the picture at 79.6% with no Copilot cost. Surprisingly, Claude Opus 4.5 underperforms here (70.7%) despite topping SWE-bench—different benchmarks favor different strengths.
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
| GPT-5.4 Thinking xHigh | 80.3 | 88.1 | 77.5 | 70.0 | 94.2 | 79.3 | 82.6 | 70.2 |
| Gemini 3.1 Pro | 79.9 | 84.0 | 76.5 | 65.0 | 91.0 | 78.5 | 85.4 | 79.1 |
| Claude 4.6 Opus Thinking | 76.3 | 88.7 | 78.2 | 61.7 | 89.3 | 69.9 | 83.3 | 63.3 |
| Claude 4.5 Opus Thinking High | 76.0 | 80.1 | 79.7 | 63.3 | 90.4 | 74.4 | 81.3 | 62.6 |
| Claude 4.6 Sonnet Thinking | 75.5 | 84.8 | 79.3 | 60.0 | 87.0 | 78.0 | 76.1 | 63.2 |
| GPT-5.2 high reasoning | 74.8 | 83.2 | 76.1 | 51.7 | 93.2 | 78.2 | 79.8 | 61.8 |
| GPT-5.1 Codex Max | 74.0 | - | - | - | - | - | - | - |
| GPT-5.1 | 72.0 | - | - | - | - | - | - | - |
| Gemini 3 Flash | 72.4 | 76.3 | 71.8 | 56.7 | 86.6 | 75.6 | 81.2 | 58.5 |
| Kimi K2.5 Thinking | 69.1 | - | - | - | - | - | - | - |
| GLM-5 | 68.9 | - | - | - | - | - | - | - |
| GPT-5 | 70.5 | 77.5 | 68.9 | 45.0 | 86.4 | 75.1 | 77.2 | 63.4 |
| DeepSeek V3.2 Reasoner | 62.2 | 65.3 | 58.4 | 41.7 | 78.0 | 65.9 | 75.4 | 51.1 |
| Grok 4 | 62.0 | - | - | - | - | - | - | - |
| Kimi K2 Thinking Turbo | 61.6 | 66.1 | 64.9 | 40.0 | 73.6 | 63.0 | 66.3 | 56.8 |
| Minimax M2.5 | 60.1 | - | - | - | - | - | - | - |
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
• <strong>New #1:</strong> GPT-5.4 Thinking (80.3) edges out Gemini 3.1 Pro (79.9) and Claude 4.6 Opus Thinking (76.3) at the top<br>
• <strong>Gemini 3.1 Pro replaces deprecated 3.0:</strong> Gemini 3 Pro was shut down March 9, 2026; 3.1 Pro (79.9) actually scores higher<br>
• <strong>New Claude 4.6 series:</strong> Opus 4.6 Thinking (76.3) and Sonnet 4.6 Thinking (75.5) slot just below the old Opus 4.5<br>
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
| 2 | GPT-5.2 high reasoning | 1470 | $0.23 | 1× | High reasoning mode |
| 3 | Claude Opus 4.5 | 1468 | $0.50 | 3× | Standard (non-thinking) |
| 4 | GLM-4.7 | 1440 | $0.05 | - | |
| 5 | Gemini 3 Flash | 1443 | $0.06 | 0.33× | |
| 6 | GPT-5.2 | 1432 | $0.23 | 1× | |
| 7 | Claude Opus 4.1 | 1431 | $1.50 | 10× | |
| 8 | o3 | 1417 | $0.18 | - | |
| 9 | Minimax M2.1 preview | 1408 | $0.03 | - | |
| 10 | GPT-5 | 1407 | $0.16 | 1× | |
| 11 | Grok 4.1 Fast | 1393 | - | 0.25× | |
| 12 | Claude Sonnet 4.5 | 1383 | $0.30 | 1× | |
| 13 | GPT-4o | 1372 | $0.23 | 0× | |
| 14 | Gemini 2.5 Pro | 1372 | $0.16 | 1× | |
| 15 | Devstral 2 | 1363 | - | - | |
| 16 | Kimi K2 Thinking Turbo | 1356 | $0.06 | - | |
| 17 | DeepSeek V3.2 Reasoner | 1350 | $0.02 | - | |
| 18 | o4-mini | 1310 | $0.10 | - | |
| 19 | GPT-4.1 | 1305 | $0.18 | 0× | |
| 20 | Claude Haiku 4.5 | 1290 | $0.10 | 0.33× | |
| 21 | DeepSeek V3.2 Chat | 1287 | $0.02 | - | |

*Note: Arena Code data not refreshed this update (access issues). Data as of February 2026. Gemini 3 Pro removed — deprecated March 9, 2026.*

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

## Appendix: GitHub Copilot cost column

The **Copilot** column shows the premium request multiplier for GitHub Copilot (VS Code, etc.):

| Multiplier | What it means |
|------------|---------------|
| **0×** | Included free (GPT-4.1, GPT-4o, GPT-5 mini) - no premium requests used |
| **0.25×** | Very cheap (Grok Code Fast) - 4 requests for the price of 1 |
| **0.33×** | Cheap (Haiku 4.5, Gemini 3 Flash, GPT-5.1-Codex-Mini) - 3 requests for the price of 1 |
| **1×** | Standard (Sonnet 4/4.5/4.6, GPT-5/5.1/5.2/5.4, Gemini 2.5 Pro/3 Pro/3.1 Pro) - 1 premium request per use |
| **3×** | Expensive (Opus 4.5, Opus 4.6) - costs 3 premium requests per use |
| **10×** | Very expensive (Opus 4.1) - costs 10 premium requests per use |
| **30×** | Extreme (Opus 4.6 fast mode preview) - costs 30 premium requests per use |
| **-** | Not available in GitHub Copilot |

Paid plans get 300-1500 premium requests/month depending on tier. Extra requests cost $0.04 each.

<div class="source-box">
<strong>Source:</strong> <a href="https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/about-premium-requests">GitHub Copilot premium requests docs</a>
</div>

← Back to [AI Guide](/ai-coding-guide/)
