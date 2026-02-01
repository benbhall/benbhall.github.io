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
.family-mistral { border-left: 3px solid #6366f1 !important; padding-left: 8px !important; }
.family-xai { border-left: 3px solid #ef4444 !important; padding-left: 8px !important; }

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
.dataTables_paginate .paginate_button { background: #2d333b !important; border: 1px solid #3d4144 !important; color: #e8e8e8 !important; }
.dataTables_paginate .paginate_button:hover { background: #373b44 !important; color: #00adb5 !important; }
.dataTables_paginate .paginate_button.current { background: #e05d45 !important; color: white !important; }
.model-name { color: #e8e8e8 !important; }
.copilot-free { color: #4ade80 !important; font-weight: 600; }
.copilot-cheap { color: #00adb5 !important; font-weight: 600; }
.copilot-standard { color: #e8e8e8 !important; }
.copilot-expensive { color: #f59e0b !important; font-weight: 600; }
.copilot-none { color: #6b7280 !important; }
.score-high { color: #4ade80 !important; font-weight: 600; }
.score-mid { color: #22d3ee !important; }
.score-low { color: #9ca3af !important; }
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
body.light-theme .dataTables_paginate .paginate_button { background: #f3f4f6 !important; border: 1px solid #d1d5db !important; color: #1f2937 !important; }
body.light-theme .dataTables_paginate .paginate_button:hover { background: #e5e7eb !important; color: #0891b2 !important; }
body.light-theme .dataTables_paginate .paginate_button.current { background: #dc2626 !important; color: white !important; }
body.light-theme .model-name { color: #1f2937 !important; }
body.light-theme .copilot-free { color: #16a34a !important; }
body.light-theme .copilot-cheap { color: #0891b2 !important; }
body.light-theme .copilot-standard { color: #1f2937 !important; }
body.light-theme .copilot-expensive { color: #d97706 !important; }
body.light-theme .copilot-none { color: #9ca3af !important; }
body.light-theme .score-high { color: #16a34a !important; }
body.light-theme .score-mid { color: #0891b2 !important; }
body.light-theme .score-low { color: #9ca3af !important; }
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

<span class="update-badge">📅 Data snapshot: February 2026</span>

<div class="filter-buttons">
  <button class="filter-btn active" data-filter="">All models</button>
  <button class="filter-btn" data-filter="copilot-available">Copilot only</button>
  <button class="filter-btn" data-filter="Anthropic">Claude</button>
  <button class="filter-btn" data-filter="OpenAI">GPT/o-series</button>
  <button class="filter-btn" data-filter="Google">Gemini</button>
  <button class="filter-btn" data-filter="DeepSeek">DeepSeek</button>
  <button class="filter-btn" data-filter="Zhipu">GLM</button>
  <button class="filter-btn" data-filter="Minimax">Minimax</button>
  <button class="filter-btn" data-filter="Moonshot">Kimi</button>
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
      <th>SWE-bench</th>
      <th>Aider</th>
      <th>Arena</th>
      <th>LiveBench</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="model-name family-anthropic">Claude Opus 4.5 thinking-32k</td><td>Anthropic</td><td class="copilot-none">-</td><td>$0.50</td><td class="score-high">74.4%</td><td class="score-mid">70.7%</td><td class="score-high">1497</td><td class="score-high">76.0</td></tr>
    <tr><td class="model-name family-anthropic">Claude Opus 4.5</td><td>Anthropic</td><td class="copilot-expensive">3×</td><td>$0.50</td><td class="score-high">74.4%</td><td class="score-mid">70.7%</td><td class="score-high">1468</td><td class="score-mid">59.1</td></tr>
    <tr><td class="model-name family-google">Gemini 3 Pro</td><td>Google</td><td class="copilot-standard">1×</td><td>$0.22</td><td class="score-high">74.2%</td><td>-</td><td class="score-high">1454</td><td class="score-high">73.4</td></tr>
    <tr><td class="model-name family-openai">GPT-5.2 high reasoning</td><td>OpenAI</td><td class="copilot-standard">1×</td><td>$0.53</td><td class="score-high">71.8%</td><td class="score-high">88.0%</td><td class="score-high">1470</td><td class="score-high">74.8</td></tr>
    <tr><td class="model-name family-anthropic">Claude Sonnet 4.5</td><td>Anthropic</td><td class="copilot-standard">1×</td><td>$0.30</td><td class="score-high">70.6%</td><td class="score-high">82.4%</td><td class="score-mid">1383</td><td class="score-mid">53.7</td></tr>
    <tr><td class="model-name family-openai">GPT-5.2</td><td>OpenAI</td><td class="copilot-standard">1×</td><td>$0.23</td><td class="score-mid">69.0%</td><td class="score-high">88.0%</td><td class="score-mid">1432</td><td class="score-low">48.9</td></tr>
    <tr><td class="model-name family-anthropic">Claude Opus 4.1</td><td>Anthropic</td><td class="copilot-expensive">10×</td><td>$1.50</td><td class="score-mid">67.6%</td><td class="score-high">82.1%</td><td class="score-mid">1431</td><td class="score-mid">54.5</td></tr>
    <tr><td class="model-name family-openai">GPT-5</td><td>OpenAI</td><td class="copilot-standard">1×</td><td>$0.16</td><td class="score-mid">65.0%</td><td class="score-high">88.0%</td><td class="score-mid">1407</td><td class="score-high">70.5</td></tr>
    <tr><td class="model-name family-google">Gemini 3 Flash</td><td>Google</td><td class="copilot-cheap">0.33×</td><td>$0.08</td><td class="score-mid">63.8%</td><td>-</td><td class="score-high">1443</td><td class="score-high">72.4</td></tr>
    <tr><td class="model-name family-moonshot">Kimi K2 Thinking Turbo</td><td>Moonshot</td><td class="copilot-none">-</td><td>$0.06</td><td class="score-mid">63.4%</td><td class="score-mid">59.1%</td><td class="score-mid">1356</td><td class="score-mid">61.6</td></tr>
    <tr><td class="model-name family-minimax">Minimax M2</td><td>Minimax</td><td class="copilot-none">-</td><td>$0.03</td><td class="score-mid">61.0%</td><td>-</td><td class="score-mid">1408</td><td>-</td></tr>
    <tr><td class="model-name family-deepseek">DeepSeek V3.2 Reasoner</td><td>DeepSeek</td><td class="copilot-none">-</td><td>$0.02</td><td class="score-mid">60.0%</td><td class="score-high">74.2%</td><td class="score-mid">1350</td><td class="score-mid">62.2</td></tr>
    <tr><td class="model-name family-openai">o3</td><td>OpenAI</td><td class="copilot-none">-</td><td>$0.18</td><td class="score-mid">58.4%</td><td class="score-high">84.9%</td><td class="score-mid">1417</td><td>-</td></tr>
    <tr><td class="model-name family-zhipu">GLM-4.6</td><td>Zhipu</td><td class="copilot-none">-</td><td>$0.05</td><td class="score-mid">55.4%</td><td>-</td><td>-</td><td class="score-mid">55.2</td></tr>
    <tr><td class="model-name family-mistral">Devstral 2</td><td>Mistral</td><td class="copilot-none">-</td><td>-</td><td class="score-mid">53.8%</td><td>-</td><td class="score-mid">1363</td><td class="score-low">41.2</td></tr>
    <tr><td class="model-name family-google">Gemini 2.5 Pro</td><td>Google</td><td class="copilot-standard">1×</td><td>$0.16</td><td class="score-mid">53.6%</td><td class="score-high">83.1%</td><td class="score-mid">1372</td><td class="score-mid">58.3</td></tr>
    <tr><td class="model-name family-xai">Grok 4.1 Fast</td><td>xAI</td><td class="copilot-cheap">0.25×</td><td>-</td><td>-</td><td>-</td><td class="score-mid">1393</td><td class="score-mid">60.0</td></tr>
    <tr><td class="model-name family-openai">GPT-4o</td><td>OpenAI</td><td class="copilot-free">0×</td><td>$0.23</td><td class="score-low">48.9%</td><td class="score-high">72.9%</td><td class="score-mid">1372</td><td>-</td></tr>
    <tr><td class="model-name family-zhipu">GLM-4.7</td><td>Zhipu</td><td class="copilot-none">-</td><td>$0.05</td><td>-</td><td>-</td><td class="score-high">1440</td><td class="score-mid">58.1</td></tr>
    <tr><td class="model-name family-minimax">Minimax M2.1 preview</td><td>Minimax</td><td class="copilot-none">-</td><td>$0.03</td><td>-</td><td>-</td><td class="score-mid">1408</td><td>-</td></tr>
    <tr><td class="model-name family-anthropic">Claude Haiku 4.5</td><td>Anthropic</td><td class="copilot-cheap">0.33×</td><td>$0.10</td><td class="score-low">48.4%</td><td class="score-mid">73.5%</td><td class="score-low">1290</td><td class="score-low">45.3</td></tr>
    <tr><td class="model-name family-openai">o4-mini</td><td>OpenAI</td><td class="copilot-none">-</td><td>$0.10</td><td class="score-low">45.0%</td><td class="score-mid">75.4%</td><td class="score-mid">1310</td><td>-</td></tr>
    <tr><td class="model-name family-openai">GPT-4.1</td><td>OpenAI</td><td class="copilot-free">0×</td><td>$0.18</td><td class="score-low">39.6%</td><td class="score-mid">66.4%</td><td class="score-low">1305</td><td>-</td></tr>
    <tr><td class="model-name family-deepseek">DeepSeek V3.2 Chat</td><td>DeepSeek</td><td class="copilot-none">-</td><td>$0.02</td><td class="score-low">39.0%</td><td class="score-high">70.2%</td><td class="score-low">1287</td><td class="score-mid">51.8</td></tr>
    <tr><td class="model-name family-google">Gemini 2.5 Flash</td><td>Google</td><td class="copilot-none">-</td><td>$0.04</td><td class="score-low">28.7%</td><td class="score-mid">68.0%</td><td class="score-low">1233</td><td class="score-low">47.7</td></tr>
    <tr><td class="model-name family-google">Gemini 2.0 Flash</td><td>Google</td><td class="copilot-none">-</td><td>$0.01</td><td class="score-low">22.0%</td><td class="score-mid">58.0%</td><td class="score-low">1214</td><td>-</td></tr>
    <tr><td class="model-name family-openai">GPT-4o-mini</td><td>OpenAI</td><td class="copilot-none">-</td><td>$0.01</td><td class="score-low">18.6%</td><td class="score-mid">55.6%</td><td class="score-low">1176</td><td>-</td></tr>
    <tr><td class="model-name family-openai">GPT-5 mini</td><td>OpenAI</td><td class="copilot-free">0×</td><td>$0.03</td><td class="score-low">14.2%</td><td class="score-mid">50.2%</td><td class="score-low">1145</td><td>-</td></tr>
  </tbody>
</table>

## Column guide

| Column | What it means |
|--------|---------------|
| **Copilot** | GitHub Copilot premium request multiplier (0× = free, 1× = standard, 3× = expensive, - = not available) |
| **$/task** | Estimated cost per task if using APIs directly (50K in + 10K out tokens). Useful for comparing relative model costs - Copilot users pay via the multiplier instead. |
| **SWE-bench** | % of real GitHub issues the model can fix autonomously ([source](https://www.swebench.com/)) - December 2025 data |
| **Aider** | % correct on multi-language code editing ([source](https://aider.chat/docs/leaderboards/)) - October 2025 data |
| **Arena** | Elo rating from human preference voting on Code category ([source](https://lmarena.ai/)) - February 2026 data |
| **LiveBench** | Global average score across 23 diverse tasks ([source](https://livebench.ai/)) - January 2026 data, contamination-free |

<div class="source-box">
<strong>Data sources:</strong> 
<a href="https://www.swebench.com/">SWE-bench</a> (Dec 2025) · 
<a href="https://aider.chat/docs/leaderboards/">Aider</a> (Oct 2025) · 
<a href="https://lmarena.ai/">Arena Code</a> (Feb 2026) · 
<a href="https://livebench.ai/">LiveBench</a> (Jan 2026) · 
<a href="https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/about-premium-requests">GitHub Copilot</a><br>
<strong>API pricing:</strong> 
<a href="https://platform.claude.com/docs/en/about-claude/pricing">Anthropic</a> · 
<a href="https://platform.openai.com/docs/pricing">OpenAI</a> · 
<a href="https://ai.google.dev/gemini-api/docs/pricing">Google</a> · 
<a href="https://api-docs.deepseek.com/quick_start/pricing">DeepSeek</a> · 
<a href="https://open.bigmodel.cn/pricing">Zhipu (GLM)</a>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/js/jquery.dataTables.min.js"></script>
<script>
jQuery.noConflict();
jQuery(document).ready(function($) {
  var table = $('#model-table').DataTable({
    pageLength: parseInt($('#model-count').val()) || 25,
    order: [[4, 'desc']],
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
      table.column(2).search('^[0-9]', true, false).draw();
    } else {
      // Family filter (Anthropic, OpenAI, Google)
      table.column(1).search('^' + filter + '$', true, false).draw();
    }
  });
});
</script>
