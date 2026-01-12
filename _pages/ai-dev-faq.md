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

{% for item in site.data.faq %}
## {{ item.question }} {#{{ item.id }}}

{{ item.answer }}
{% endfor %}

