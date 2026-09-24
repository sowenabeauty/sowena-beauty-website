# Sowena SEO Automation Workflow

This folder defines the operating workflow for GPT-assisted SEO content.

The goal is to turn real keyword data into useful blog pages for Sowena Beauty Global, while avoiding unsupported medical claims and keeping every article focused on conversion through WhatsApp quotation requests.

## What this workflow does

1. Collect keyword data from Google Keyword Planner, Google Search Console, Semrush, Ahrefs, or another SEO data source.
2. Filter keywords by relevance, intent, country, search volume, and conversion value.
3. Turn selected keywords into article briefs.
4. Use GPT to write SEO-ready article drafts.
5. Review drafts with the checklist.
6. Publish approved drafts as static HTML blog pages.
7. Update `blog/index.html` and `sitemap.xml`.

## Data required from the site owner

To make keyword selection accurate, provide one of these:

1. Google Keyword Planner export CSV.
2. Google Search Console query export CSV.
3. Semrush or Ahrefs keyword export CSV.
4. A manually prepared keyword sheet using `keyword-intake-template.csv`.

Minimum useful columns:

- keyword
- country
- monthly_searches
- intent
- difficulty
- cpc
- notes

If you do not have all metrics, provide keyword, country, and monthly_searches first.

## Recommended keyword sources

- Google Search Console: best for keywords where the site already has impressions.
- Google Keyword Planner: best for estimated search volume and new keyword ideas.
- Google Trends: best for trend direction, not exact monthly search volume.
- Semrush or Ahrefs: best for SEO difficulty, SERP competition, and competitor discovery.

## Article approval rule

Do not publish an article unless it passes:

- It targets one primary keyword.
- It answers a clear buyer intent.
- It has one H1.
- It has SEO title and meta description.
- It includes internal links.
- It includes a WhatsApp CTA.
- It avoids medical claims and guaranteed outcomes.
- It includes Article schema and FAQ schema when relevant.

## GPT usage

Use `gpt-seo-article-prompt.md` as the master prompt for drafting.

When API automation is added later, keep the OpenAI API key out of frontend code and store it in environment variables only.

