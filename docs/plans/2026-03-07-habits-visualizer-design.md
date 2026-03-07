# Fabulous Habits Visualizer — Design & Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a single local HTML page that visualizes all ~46 Fabulous habits with interactive detail panels.

**Architecture:** Single `index.html` file with embedded CSS and JS. All habit data is a JS object literal. No build tools, no dependencies — opens in any browser.

**Tech Stack:** Vanilla HTML, CSS, JavaScript (no frameworks)

---

## Task 1: Create index.html with data model and base structure

**Files:**
- Create: `index.html`

**Steps:**
1. Define the JS data model: array of habit objects, each with `name`, `category`, `timeOfDay[]`, `summary`, `journeys[]`, `challenges[]`, `behavioralScience`, `relatedHabits[]`, `stackingPosition`, `makeMeFabulous` (if applicable)
2. Build the HTML shell: header section (title, subtitle, stats), filter bar (time-of-day toggles + category dropdown), main grid container, detail side panel (hidden by default)
3. Write all CSS inline in a `<style>` block — Fabulous palette (#1ABC9C primary, coral accent, #F5F5F5 bg, white cards, 12-16px radius, system sans-serif)
4. Write all JS inline in a `<script>` block — render cards from data, wire up filters, wire up click-to-open panel with slide-in animation

**Acceptance:**
- Open `index.html` in browser
- See all habits as cards grouped by category
- Filter by time of day and category works
- Click any card to see detail panel slide in from right
- Detail panel shows: summary, component outline (routines, journey, stacking), full details (behavioral science, related habits)
- Click outside or X to close panel
- Responsive layout (works on desktop and tablet widths)
