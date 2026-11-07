---
permalink: /ai-coding-guide/compare/
title: "AI coding model comparison"
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

/* ==================== BASE (works in both modes) ==================== */
#model-table { border-collapse: collapse !important; width: 100% !important; }
#model-table thead th { padding: 12px 10px !important; font-weight: 600; white-space: nowrap; cursor: pointer; border: none !important; }
#model-table tbody td { padding: 10px 12px !important; border: none !important; background: transparent !important; }
.filter-buttons { margin: 1em 0 1.5em 0; display: flex; flex-wrap: wrap; gap: 8px; }
.filter-btn { border-radius: 20px; padding: 6px 14px; cursor: pointer; font-size: 0.9em; transition: all 0.2s; border-width: 1px; border-style: solid; }
.update-badge { display: inline-block; padding: 0.3em 0.8em; border-radius: 20px; font-size: 0.85em; margin-bottom: 1em; }
.callout { border-left: 4px solid #00adb5; padding: 1em 1.2em; margin: 1em 0; border-radius: 0 8px 8px 0; }
.source-box { border-radius: 8px; padding: 0.75em 1em; margin: 1em 0; font-size: 0.9em; border-width: 1px; border-style: solid; }
.model-name { font-weight: 600; }
.family-anthropic { border-left: 3px solid #d97706 !important; padding-left: 8px !important; }
.family-openai { border-left: 3px solid #10b981 !important; padding-left: 8px !important; }
.family-google { border-left: 3px solid #3b82f6 !important; padding-left: 8px !important; }
.family-deepseek { border-left: 3px solid #8b5cf6 !important; padding-left: 8px !important; }
.family-zhipu { border-left: 3px solid #ec4899 !important; padding-left: 8px !important; }
.family-minimax { border-left: 3px solid #14b8a6 !important; padding-left: 8px !important; }
.family-moonshot { border-left: 3px solid #f59e0b !important; padding-left: 8px !important; }
.family-meta { border-left: 3px solid #1877f2 !important; padding-left: 8px !important; }
.family-alibaba { border-left: 3px solid #ff6a00 !important; padding-left: 8px !important; }
.family-mistral { border-left: 3px solid #6366f1 !important; padding-left: 8px !important; }
.family-xai { border-left: 3px solid #ef4444 !important; padding-left: 8px !important; }
.family-xiaomi { border-left: 3px solid #f97316 !important; padding-left: 8px !important; }
#model-table tbody td.not-tested { font-size: 0.8em; font-style: italic; }

/* ==================== DARK MODE (default for dark skin) ==================== */
#model-table thead th { background: #1a1d23 !important; color: #e05d45 !important; border-bottom: 2px solid #e05d45 !important; }
#model-table thead th:hover { background: #2d333b !important; }
#model-table tbody tr { background: #252a34 !important; }
#model-table tbody tr:nth-child(odd) { background: #1e222a !important; }
#model-table tbody tr:hover { background: #3d4144 !important; }
#model-table tbody td { color: #e8e8e8 !important; border-bottom: 1px solid #3d4144 !important; }
#model-table thead .sorting:after, #model-table thead .sorting_asc:after, #model-table thead .sorting_desc:after { opacity: 0.5 !important; }
#model-table thead .sorting_asc:after, #model-table thead .sorting_desc:after { opacity: 1 !important; color: #00adb5 !important; }
.dataTables_wrapper { color: #e8e8e8 !important; }
.dataTables_length label, .dataTables_filter label { color: #a8a8a8 !important; }
.dataTables_filter input { background: #2d333b !important; border: 1px solid #3d4144 !important; border-radius: 6px !important; color: #e8e8e8 !important; padding: 8px 12px !important; }
.dataTables_length select { background: #2d333b !important; border: 1px solid #3d4144 !important; border-radius: 6px !important; color: #e8e8e8 !important; }
.dataTables_info { color: #a8a8a8 !important; }
.dataTables_paginate { display: flex; gap: 6px; align-items: center; justify-content: flex-end; margin-top: 1em; }
.dataTables_paginate .paginate_button { background: #2d333b !important; border: 1px solid #3d4144 !important; color: #e8e8e8 !important; padding: 6px 12px !important; border-radius: 6px !important; cursor: pointer !important; transition: all 0.2s !important; text-decoration: none !important; }
.dataTables_paginate .paginate_button:hover:not(.disabled) { background: #373b44 !important; color: #00adb5 !important; border-color: #00adb5 !important; }
.dataTables_paginate .paginate_button.current { background: #e05d45 !important; color: white !important; border-color: #e05d45 !important; }
.dataTables_paginate .paginate_button.disabled { opacity: 0.4 !important; cursor: not-allowed !important; }
.model-name { color: #e8e8e8 !important; }
.copilot-free { color: #4ade80 !important; font-weight: 600; }
.copilot-cheap { color: #00adb5 !important; font-weight: 600; }
.copilot-standard { color: #e8e8e8 !important; }
.copilot-expensive { color: #f59e0b !important; font-weight: 600; }
.copilot-none { color: #6b7280 !important; }
.score-high { color: #4ade80 !important; font-weight: 600; }
.score-mid { color: #22d3ee !important; }
.score-low { color: #9ca3af !important; }
#model-table tbody td.not-tested { color: #6b7280 !important; }
.filter-btn { background: #2d333b; border-color: #3d4144; color: #a8a8a8; }
.filter-btn:hover { border-color: #00adb5; color: #00adb5; }
.filter-btn.active { background: #00adb5 !important; border-color: #00adb5 !important; color: #1a1d23 !important; }
.update-badge { background: #373b44; color: #e8e8e8; }
.callout { background: #1a1d23; }
.callout strong { color: #00adb5; }
.source-box { background: #1a1d23; border-color: #3d4144; }

/* ==================== LIGHT MODE (via .light-theme class) ==================== */
body.light-theme #model-table thead th { background: #f3f4f6 !important; color: #dc2626 !important; border-bottom: 2px solid #dc2626 !important; }
body.light-theme #model-table thead th:hover { background: #e5e7eb !important; }
body.light-theme #model-table tbody tr { background: #ffffff !important; }
body.light-theme #model-table tbody tr:nth-child(odd) { background: #f9fafb !important; }
body.light-theme #model-table tbody tr:hover { background: #e5e7eb !important; }
body.light-theme #model-table tbody td { color: #1f2937 !important; border-bottom: 1px solid #e5e7eb !important; }
body.light-theme .dataTables_wrapper { color: #4b5563 !important; }
body.light-theme .dataTables_length label, body.light-theme .dataTables_filter label { color: #4b5563 !important; }
body.light-theme .dataTables_info { color: #4b5563 !important; }
body.light-theme .dataTables_filter input { background: #fff !important; border: 1px solid #d1d5db !important; color: #1f2937 !important; }
body.light-theme .dataTables_length select { background: #fff !important; border: 1px solid #d1d5db !important; color: #1f2937 !important; }
body.light-theme .dataTables_paginate .paginate_button { background: #f3f4f6 !important; border: 1px solid #d1d5db !important; color: #1f2937 !important; padding: 6px 12px !important; border-radius: 6px !important; }
body.light-theme .dataTables_paginate .paginate_button:hover:not(.disabled) { background: #e5e7eb !important; color: #0891b2 !important; border-color: #0891b2 !important; }
body.light-theme .dataTables_paginate .paginate_button.current { background: #dc2626 !important; color: white !important; border-color: #dc2626 !important; }
body.light-theme .dataTables_paginate .paginate_button.disabled { opacity: 0.4 !important; }
body.light-theme .model-name { color: #1f2937 !important; }
body.light-theme .copilot-free { color: #16a34a !important; }
body.light-theme .copilot-cheap { color: #0891b2 !important; }
body.light-theme .copilot-standard { color: #1f2937 !important; }
body.light-theme .copilot-expensive { color: #d97706 !important; }
body.light-theme .copilot-none { color: #9ca3af !important; }
body.light-theme .score-high { color: #16a34a !important; }
body.light-theme .score-mid { color: #0891b2 !important; }
body.light-theme .score-low { color: #9ca3af !important; }
body.light-theme #model-table tbody td.not-tested { color: #9ca3af !important; }
body.light-theme .filter-btn { background: #f3f4f6 !important; border-color: #d1d5db !important; color: #4b5563 !important; }
body.light-theme .filter-btn:hover { border-color: #0891b2 !important; color: #0891b2 !important; }
body.light-theme .filter-btn.active { background: #0891b2 !important; border-color: #0891b2 !important; color: white !important; }
body.light-theme .update-badge { background: #e5e7eb !important; color: #1f2937 !important; }
body.light-theme .callout { background: #f3f4f6 !important; }
body.light-theme .callout strong { color: #0891b2 !important; }
body.light-theme .source-box { background: #f3f4f6 !important; border-color: #d1d5db !important; }

/* Adjust search box width to match table */
#model-search {
  max-width: calc(100% - 320px); /* Matches table width minus sidebar */
}

/* Style pagination and info text */
.dataTables_info, .dataTables_paginate {
  font-size: 0.85em;
  color: #a8a8a8;
}

/* Further reduce font size for search placeholder text */
#model-search::placeholder {
  font-size: 0.75em;
  color: #a8a8a8;
}

/* Further reduce font size for preset filter buttons */
.filter-btn {
  font-size: 0.75em;
}

/* Match font size for number dropdown text */
#model-count {
  font-size: 0.75em;
}
</style>

<span class="update-badge">📅 Data snapshot: November 2026</span>

<div class="callout">
<strong>Using GitHub Copilot?</strong> Hit the <strong>Copilot</strong> filter above to see models listed as available there. Copilot uses per-token AI credit billing; the $/task column estimates a separate direct-API task cost. See <a href="https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing">GitHub's rate card</a> for Copilot-specific rates.
</div>

<div class="callout">
<strong>Why some cells say "not tested".</strong> Each benchmark only scores the models its maintainers choose to run. LiveBench 2.0 started in October 2026 and has tested 32 models so far. Arena Code covers almost everything because anyone can vote. SWE-bench Verified has published one independent run since February 2026, so only older models have a score there. "Not tested" means the source has no result for that model, not that the model scored badly. The table sorts by LiveBench 2.0, then by Arena.
</div>

<div class="filter-buttons">
  <button class="filter-btn active" data-filter="">All models</button>
  <button class="filter-btn" data-filter="copilot-available">Copilot</button>
  <button class="filter-btn" data-filter="Anthropic">Claude</button>
  <button class="filter-btn" data-filter="OpenAI">GPT/o-series</button>
  <button class="filter-btn" data-filter="Google">Gemini</button>
  <button class="filter-btn" data-filter="xAI">Grok</button>
  <button class="filter-btn" data-filter="DeepSeek">DeepSeek</button>
  <button class="filter-btn" data-filter="Zhipu">GLM</button>
  <button class="filter-btn" data-filter="Minimax">Minimax</button>
  <button class="filter-btn" data-filter="Moonshot">Kimi</button>
  <button class="filter-btn" data-filter="Meta">Meta</button>
  <button class="filter-btn" data-filter="Alibaba">Qwen</button>
  <button class="filter-btn" data-filter="Xiaomi">MiMo</button>
</div>

<div style="display: flex; align-items: center; gap: 1em;">
  <label for="model-count" style="display: none;">Show</label>
  <select id="model-count" name="model-count">
    <option value="10">10</option>
    <option value="25" selected>25</option>
    <option value="50">50</option>
    <option value="100">100</option>
  </select>
  <input type="text" id="model-search" placeholder="Search models" style="flex-grow: 1;" />
</div>

<table id="model-table" class="display" style="width:100%">
  <thead>
    <tr>
      <th>Model</th>
      <th>Family</th>
      <th>Copilot</th>
      <th>$/task</th>
      <th>LiveBench 2.0</th>
      <th>Arena Code</th>
      <th>SWE-bench</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="model-name family-anthropic">Claude Fable 5.1</td><td>Anthropic</td><td class="copilot-standard">✓</td><td data-order="1.0">$1.00</td><td class="score-high" data-order="85.7">85.7</td><td class="score-high" data-order="1537" title="Claude Fable 5.1 (Max), 3,403 votes">1537</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-6 Astra</td><td>OpenAI</td><td class="copilot-standard">✓</td><td data-order="1.0">$1.00</td><td class="score-high" data-order="85.6">85.6</td><td class="score-high" data-order="1542" title="GPT-6 Astra (Max), 3,393 votes">1542</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-anthropic">Claude Opus 5.5</td><td>Anthropic</td><td class="copilot-standard">✓</td><td data-order="0.4">$0.40</td><td class="score-high" data-order="85.1">85.1</td><td class="score-high" data-order="1551" title="Claude Opus 5.5 (High), 2,555 votes">1551</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-6.1 Sol</td><td>OpenAI</td><td class="copilot-standard">✓</td><td data-order="0.2">$0.20</td><td class="score-high" data-order="84.1">84.1</td><td class="score-high" data-order="1541" title="GPT-6.1 Sol (Max), 1,896 votes">1541</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-anthropic">Claude Sonnet 5.5</td><td>Anthropic</td><td class="copilot-standard">✓</td><td data-order="0.2">$0.20</td><td class="score-high" data-order="80.0">80.0</td><td class="score-mid" data-order="1529" title="Claude Sonnet 5.5 (xHigh), 2,339 votes">1529</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-google">Gemini 4 Argon</td><td>Google</td><td class="copilot-standard">✓</td><td data-order="0.2">$0.20‡</td><td class="score-mid" data-order="79.3">79.3</td><td class="score-high" data-order="1550" title="Gemini 4 Argon (High), 2,813 votes">1550</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-6.1 Terra</td><td>OpenAI</td><td class="copilot-standard">✓</td><td data-order="0.1">$0.10</td><td class="score-mid" data-order="77.8">77.8</td><td class="not-tested" data-order="-1">not tested</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-meta">Muse Wonder 1.0</td><td>Meta</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="score-mid" data-order="74.2">74.2</td><td class="score-high" data-order="1545" title="Muse Wonder (Max), 1,902 votes">1545</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-deepseek">DeepSeek V4.1 Flash</td><td>DeepSeek</td><td class="copilot-none">-</td><td data-order="0.027">$0.03*</td><td class="score-mid" data-order="72.9">72.9</td><td class="score-mid" data-order="1523" title="DeepSeek-V4.1-Flash-20260910 (Max), 3,745 votes">1523</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-moonshot">Kimi K3.1 Pro</td><td>Moonshot</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="score-mid" data-order="71.3">71.3</td><td class="not-tested" data-order="-1">not tested</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-xai">Grok 4.7</td><td>xAI</td><td class="copilot-standard">✓</td><td data-order="0.16">$0.16</td><td class="score-mid" data-order="70.1">70.1</td><td class="score-low" data-order="1494" title="Grok 4.7 (xHigh), 3,617 votes">1494</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-anthropic">Claude Haiku 5.5</td><td>Anthropic</td><td class="copilot-standard">✓</td><td data-order="0.01">$0.01</td><td class="score-mid" data-order="69.8">69.8</td><td class="score-low" data-order="1489" title="Claude Haiku 5.5 (High), 1,813 votes">1489</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-xiaomi">MiMo V2.6 Pro</td><td>Xiaomi</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="score-mid" data-order="68.5">68.5</td><td class="score-high" data-order="1538" title="MiMo-V2.6-Pro, 1,091 votes">1538</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-5.6 Terra</td><td>OpenAI</td><td class="copilot-standard">✓</td><td data-order="0.22">$0.22</td><td class="score-mid" data-order="67.8">67.8</td><td class="score-mid" data-order="1517" title="GPT-5.6 Terra (xHigh), 12,713 votes">1517</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-xai">Grok 4.6</td><td>xAI</td><td class="copilot-standard">✓</td><td data-order="0.16">$0.16</td><td class="score-mid" data-order="67.8">67.8</td><td class="score-mid" data-order="1509" title="Grok 4.6 (High), 8,394 votes">1509</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-minimax">MiniMax M3.1 Flash</td><td>Minimax</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="score-mid" data-order="66.9">66.9</td><td class="not-tested" data-order="-1">not tested</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-6 Luna</td><td>OpenAI</td><td class="copilot-standard">✓</td><td data-order="0.01">$0.01</td><td class="score-low" data-order="64.6">64.6</td><td class="score-mid" data-order="1506" title="GPT-6 Luna (Max), 19,790 votes">1506</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-moonshot">Kimi K3</td><td>Moonshot</td><td class="copilot-standard">✓</td><td data-order="99">-</td><td class="score-low" data-order="64.6">64.6</td><td class="score-high" data-order="1540" title="Kimi K3 (Max), 9,235 votes">1540</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-meta">Muse Spark 1.3</td><td>Meta</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="score-low" data-order="63.0">63.0</td><td class="score-high" data-order="1534" title="Muse Spark 1.3 (Max), 5,707 votes">1534</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-zhipu">GLM-5.3 Flash</td><td>Zhipu</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="score-low" data-order="62.1">62.1</td><td class="score-mid" data-order="1526" title="GLM-5.3-Flash, 10,603 votes">1526</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-alibaba">Qwen3.8 Max</td><td>Alibaba</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="score-low" data-order="61.6">61.6</td><td class="score-mid" data-order="1525" title="Qwen3.8-Max, 8,708 votes">1525</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-google">Gemini 3.8 Flash</td><td>Google</td><td class="copilot-standard">✓</td><td data-order="0.075">$0.075†</td><td class="score-low" data-order="59.2">59.2</td><td class="score-high" data-order="1530" title="Gemini 3.8 Flash (High), 12,376 votes">1530</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-alibaba">Qwen3.8 27B</td><td>Alibaba</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="score-low" data-order="58.4">58.4</td><td class="score-low" data-order="1498" title="Qwen3.8-27B, 7,536 votes">1498</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-anthropic">Claude Fable 5</td><td>Anthropic</td><td class="copilot-standard">✓</td><td data-order="1.0">$1.00</td><td class="not-tested" data-order="-1">not tested</td><td class="score-high" data-order="1550" title="Claude Fable 5 (High), 11,629 votes">1550</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-anthropic">Claude Opus 5</td><td>Anthropic</td><td class="copilot-standard">✓</td><td data-order="0.5">$0.50</td><td class="not-tested" data-order="-1">not tested</td><td class="score-high" data-order="1534" title="Claude Opus 5 (High), 18,778 votes">1534</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-anthropic">Claude Sonnet 5</td><td>Anthropic</td><td class="copilot-standard">✓</td><td data-order="0.2">$0.20</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1520" title="Claude Sonnet 5 (High), 14,080 votes">1520</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-anthropic">Claude Opus 4.8</td><td>Anthropic</td><td class="copilot-standard">✓</td><td data-order="0.5">$0.50</td><td class="not-tested" data-order="-1">not tested</td><td class="score-high" data-order="1534" title="Claude Opus 4.8 (High), 17,403 votes">1534</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-anthropic">Claude Opus 4.7</td><td>Anthropic</td><td class="copilot-none">-</td><td data-order="0.5">$0.50</td><td class="not-tested" data-order="-1">not tested</td><td class="score-high" data-order="1551" title="Claude Opus 4.7 (High), 18,587 votes">1551</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-anthropic">Claude Opus 4.6</td><td>Anthropic</td><td class="copilot-none">-</td><td data-order="0.5">$0.50</td><td class="not-tested" data-order="-1">not tested</td><td class="score-high" data-order="1548" title="Claude Opus 4.6 (High), 21,789 votes">1548</td><td class="score-high" data-order="75.6">75.6%</td></tr>
    <tr><td class="model-name family-anthropic">Claude Opus 4.5</td><td>Anthropic</td><td class="copilot-none">-</td><td data-order="0.5">$0.50</td><td class="not-tested" data-order="-1">not tested</td><td class="score-high" data-order="1530" title="Claude Opus 4.5 (High, 32K, 20251101), 7,777 votes">1530</td><td class="score-high" data-order="76.8">76.8%</td></tr>
    <tr><td class="model-name family-anthropic">Claude Sonnet 4.6</td><td>Anthropic</td><td class="copilot-standard">✓</td><td data-order="0.3">$0.30</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1528" title="Claude Sonnet 4.6, 19,723 votes">1528</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-anthropic">Claude Sonnet 4.5</td><td>Anthropic</td><td class="copilot-none">-</td><td data-order="0.3">$0.30</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1519" title="Claude Sonnet 4.5 (High, 32K, 20250929), 19,921 votes">1519</td><td class="score-high" data-order="71.4">71.4%</td></tr>
    <tr><td class="model-name family-anthropic">Claude Haiku 4.5</td><td>Anthropic</td><td class="copilot-standard">✓</td><td data-order="0.1">$0.10</td><td class="not-tested" data-order="-1">not tested</td><td class="score-low" data-order="1482" title="Claude Haiku 4.5 (20251001), 39,628 votes">1482</td><td class="score-mid" data-order="66.6">66.6%</td></tr>
    <tr><td class="model-name family-openai">GPT-6 Sol</td><td>OpenAI</td><td class="copilot-standard">✓</td><td data-order="0.2">$0.20</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1519" title="GPT-6 Sol (Max), 3,647 votes">1519</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-5.6 Sol</td><td>OpenAI</td><td class="copilot-standard">✓</td><td data-order="0.4">$0.40‡</td><td class="not-tested" data-order="-1">not tested</td><td class="score-high" data-order="1533" title="GPT-5.6 Sol (xHigh), 11,636 votes">1533</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-5.6 Luna</td><td>OpenAI</td><td class="copilot-standard">✓</td><td data-order="0.022">$0.02</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1502" title="GPT-5.6 Luna (xHigh), 11,209 votes">1502</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-5.5</td><td>OpenAI</td><td class="copilot-none">-</td><td data-order="0.55">$0.55</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1519" title="GPT-5.5 (High), 19,166 votes">1519</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-5.4</td><td>OpenAI</td><td class="copilot-none">-</td><td data-order="0.275">$0.28</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1520" title="GPT-5.4 (High), 17,603 votes">1520</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-5.4 mini</td><td>OpenAI</td><td class="copilot-none">-</td><td data-order="0.083">$0.08</td><td class="not-tested" data-order="-1">not tested</td><td class="score-low" data-order="1495" title="GPT-5.4 mini (High), 17,248 votes">1495</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-5.4 nano</td><td>OpenAI</td><td class="copilot-standard">✓</td><td data-order="0.023">$0.02</td><td class="not-tested" data-order="-1">not tested</td><td class="score-low" data-order="1460" title="GPT-5.4 nano (High), 17,640 votes">1460</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-openai">GPT-5.2</td><td>OpenAI</td><td class="copilot-none">-</td><td data-order="0.228">$0.23</td><td class="not-tested" data-order="-1">not tested</td><td class="score-low" data-order="1489" title="GPT-5.2 (High), 12,225 votes">1489</td><td class="score-high" data-order="72.8">72.8%</td></tr>
    <tr><td class="model-name family-openai">GPT-5 mini</td><td>OpenAI</td><td class="copilot-none">-</td><td data-order="0.033">$0.03</td><td class="not-tested" data-order="-1">not tested</td><td class="score-low" data-order="1432" title="GPT-5 mini (High), 5,514 votes">1432</td><td class="score-low" data-order="56.2">56.2%</td></tr>
    <tr><td class="model-name family-google">Gemini 3.6 Flash</td><td>Google</td><td class="copilot-none">-</td><td data-order="0.075">$0.075†</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1518" title="Gemini 3.6 Flash (High), 10,361 votes">1518</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-google">Gemini 3.1 Pro</td><td>Google</td><td class="copilot-none">-</td><td data-order="0.22">$0.22</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1521" title="Gemini 3.1 Pro Preview, 36,254 votes">1521</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-google">Gemini 3.5 Flash-Lite</td><td>Google</td><td class="copilot-none">-</td><td data-order="0.04">$0.04</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1502" title="Gemini 3.5 Flash-Lite, 9,922 votes">1502</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-google">Gemini 3 Flash</td><td>Google</td><td class="copilot-none">-</td><td data-order="0.06">$0.06</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1505" title="Gemini 3 Flash, 6,578 votes">1505</td><td class="score-high" data-order="75.8">75.8%</td></tr>
    <tr><td class="model-name family-google">Gemini 2.5 Pro (retiring Dec 1)</td><td>Google</td><td class="copilot-none">-</td><td data-order="0.1625">$0.16</td><td class="not-tested" data-order="-1">not tested</td><td class="score-low" data-order="1464" title="Gemini 2.5 Pro, 26,935 votes">1464</td><td class="score-low" data-order="53.6">53.6%</td></tr>
    <tr><td class="model-name family-google">Gemini 2.5 Flash (retiring Dec 1)</td><td>Google</td><td class="copilot-none">-</td><td data-order="0.04">$0.04</td><td class="not-tested" data-order="-1">not tested</td><td class="score-low" data-order="1424" title="Gemini 2.5 Flash, 26,352 votes">1424</td><td class="score-low" data-order="28.7">28.7%</td></tr>
    <tr><td class="model-name family-xai">Grok 4.5</td><td>xAI</td><td class="copilot-standard">✓</td><td data-order="0.16">$0.16</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1514" title="Grok 4.5, 11,123 votes">1514</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-deepseek">DeepSeek V4 Pro 0813</td><td>DeepSeek</td><td class="copilot-none">-</td><td data-order="0.1056">$0.106*</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1505" title="DeepSeek-V4-Pro (High, 20260813), 2,809 votes">1505</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-meta">Muse Spark 1.2</td><td>Meta</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="not-tested" data-order="-1">not tested</td><td class="score-high" data-order="1543" title="Muse Spark 1.2 (xHigh), 2,987 votes">1543</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-zhipu">GLM-5.3</td><td>Zhipu</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1520" title="GLM-5.3 (Max), 6,323 votes">1520</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-zhipu">GLM-5.2</td><td>Zhipu</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1514" title="GLM-5.2 (Max), 14,324 votes">1514</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-zhipu">GLM-5</td><td>Zhipu</td><td class="copilot-none">-</td><td data-order="0.05">$0.05</td><td class="not-tested" data-order="-1">not tested</td><td class="score-low" data-order="1498" title="GLM-5, 7,624 votes">1498</td><td class="score-high" data-order="72.8">72.8%</td></tr>
    <tr><td class="model-name family-zhipu">GLM-4.7</td><td>Zhipu</td><td class="copilot-none">-</td><td data-order="0.05">$0.05</td><td class="not-tested" data-order="-1">not tested</td><td class="score-low" data-order="1484" title="GLM-4.7, 2,478 votes">1484</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-moonshot">Kimi K2.5</td><td>Moonshot</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="not-tested" data-order="-1">not tested</td><td class="score-mid" data-order="1504" title="Kimi K2.5 (Instant), 1,868 votes">1504</td><td class="score-high" data-order="70.8">70.8%</td></tr>
    <tr><td class="model-name family-minimax">MiniMax M3</td><td>Minimax</td><td class="copilot-none">-</td><td data-order="99">-</td><td class="not-tested" data-order="-1">not tested</td><td class="score-low" data-order="1495" title="MiniMax-M3, 19,379 votes">1495</td><td class="not-tested" data-order="-1">not tested</td></tr>
    <tr><td class="model-name family-minimax">MiniMax M2.5</td><td>Minimax</td><td class="copilot-none">-</td><td data-order="0.07">$0.07</td><td class="not-tested" data-order="-1">not tested</td><td class="score-low" data-order="1446" title="MiniMax-M2.5, 11,338 votes">1446</td><td class="score-high" data-order="75.8">75.8%</td></tr>
  </tbody>
</table>

## Column guide

| Column | What it means |
|--------|---------------|
| **Copilot** | Available in GitHub Copilot (✓ = listed, - = not listed). Copilot usage is billed in AI credits based on tokens used. |
| **$/task** | Estimated direct-API cost for 50K input + 10K output tokens; it is not a Copilot bill estimate. |
| **LiveBench 2.0** | Weighted overall score (0-100) across seven suites: long agentic work, coding, design, browser use, data analysis, research and reasoning. Release 2026-10-25 ([source](https://livebench.ai/)). Not comparable with the old LiveBench 1 scores this page showed until October. |
| **Arena Code** | Rating from blind human votes on coding prompts, with Arena's default style control. Published October 28, 2026 ([source](https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset)). Where Arena lists several effort settings for a model, the highest-rated one is shown; hover a score to see which, and how many votes it has. Current models sit between about 1490 and 1550, and the 95% confidence intervals are roughly ±6 to ±18 points, so many neighbouring models are statistically tied. |
| **SWE-bench** | % of 500 real GitHub issues fixed in the SWE-bench Verified standardized runs ([source](https://www.swebench.com/)). Most runs date from February 2026; none of the models released since then has a run. |

*DeepSeek V4.1 Flash and V4 Pro have peak and off-peak rates; this estimate uses peak pricing. Arena's DeepSeek V4.1 Flash score is for the September 10 build, LiveBench's for the October 17 build. †Gemini 3.6/3.8 Flash promotional API pricing runs through Dec 31, 2026; after that it doubles to $0.15/task. ‡Promotional pricing until Nov 30, 2026: Gemini 4 Argon then rises to $0.40/task; OpenAI has not published GPT-5.6 Sol's rate after the promotion. Claude Haiku 5.5's $0.01 applies to prompts up to 100K tokens. Gemini 2.5 Pro and 2.5 Flash are deprecated; from Dec 1, 2026 Google routes their requests to Gemini 3.8 Flash and 3.5 Flash-Lite.*

Aider's polyglot scores are no longer in this table: its leaderboard hasn't added a model since October 2025. The archived results are on the [benchmarks page](/ai-coding-guide/benchmarks/#aider-polyglot), along with ProgramBench and the LiveBench per-suite scores.

<div class="source-box">
<strong>Data sources:</strong> 
<a href="https://livebench.ai/">LiveBench 2.0</a> (release 2026-10-25) ·
<a href="https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset">Arena Code</a> (published Oct 28, 2026) ·
<a href="https://www.swebench.com/">SWE-bench Verified</a> (standardized runs to Feb 2026, plus one on Sep 1, 2026) ·
<a href="https://programbench.com/">ProgramBench</a> (leaderboard updated Oct 22, 2026) ·
<a href="https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing">GitHub Copilot</a> (AI credit billing since Jun 2026)<br>
<strong>API pricing:</strong> 
<a href="https://platform.claude.com/docs/en/about-claude/pricing">Anthropic</a> · 
<a href="https://developers.openai.com/api/docs/pricing">OpenAI</a> · 
<a href="https://aistudio.google.com/docs/pricing">Google</a> · 
<a href="https://api-docs.deepseek.com/quick_start/pricing">DeepSeek</a> · 
<a href="https://docs.x.ai/docs/models">xAI</a> · 
<a href="https://open.bigmodel.cn/pricing">Zhipu (GLM)</a>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/js/jquery.dataTables.min.js"></script>
<script>
jQuery.noConflict();
jQuery(document).ready(function($) {
  var table = $('#model-table').DataTable({
    pageLength: parseInt($('#model-count').val()) || 25,
    order: [[4, 'desc'], [5, 'desc']],
    language: {
      search: "🔍",
      lengthMenu: "Show _MENU_ models",
      info: "Showing _START_ to _END_ of _TOTAL_ models",
      infoEmpty: "No models found",
      infoFiltered: "(filtered from _MAX_ total)"
    },
    dom: 'rtip' // Remove default dropdown and search box
  });

  // Update table when dropdown changes
  $('#model-count').on('change', function() {
    var newLength = parseInt($(this).val());
    table.page.len(newLength).draw();
  });

  // Update table when search box changes
  $('#model-search').on('keyup', function() {
    table.search($(this).val()).draw();
  });

  $('.filter-btn').on('click', function() {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    var filter = $(this).data('filter');

    // Clear all filters first
    table.search('').columns().search('').draw();

    // Apply new filter
    if (filter === '') {
      // "All models" - already cleared above
    } else if (filter === 'copilot-available') {
      table.column(2).search('^✓$', true, false).draw();
    } else {
      // Family filter (Anthropic, OpenAI, Google)
      table.column(1).search('^' + filter + '$', true, false).draw();
    }
  });
});
</script>
