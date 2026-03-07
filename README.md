# Fabulous App — Research Agent

A self-contained Claude Code sub-agent with deep indexed knowledge of the **Fabulous** habit-building app. Drop this folder anywhere and ask it anything.

## What's inside

- Full reverse engineering research (behavioral science, UX, journeys, dark patterns)
- All 21 screen specifications
- 5 complete user flows with analytics events
- 376 image URLs from Mobbin
- Design system (colors, typography, components)
- Pricing and monetization breakdown
- India market data, Reddit sentiment, social data
- Blueprint for building a Fabulous-like app

## How to use

1. Clone or download this folder
2. Open **Claude Code** with this folder as your working directory
3. Ask anything about Fabulous

```bash
git clone https://github.com/your-username/fabulous-agent
cd fabulous-agent
# Open Claude Code here
```

## Example questions

- *"What are all the journeys in Fabulous and how do they work?"*
- *"How does the commitment contract mechanic work psychologically?"*
- *"Show me the onboarding flow step by step"*
- *"What dark patterns does Fabulous use and how severe are they?"*
- *"How do I build the opening screen for a habit app?"*
- *"What behavioral science frameworks does Fabulous apply?"*
- *"What's the full pricing and monetization strategy?"*
- *"How do I build a Fabulous-like app? Give me the full blueprint."*

## File structure

```
fabulous-agent/
├── CLAUDE.md          ← Agent instructions + full inline knowledge base
├── README.md          ← This file
├── package.json       ← Scripts + LLM SDKs for the Q&A API
├── vercel.json        ← Rewrites so / serves web/ and /api runs serverless
├── api/
│   └── ask.js         ← Serverless Q&A: reads research, calls LLM, returns answer
├── web/               ← Q&A website (ask any question, answer from research only)
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── research/          ← All source documents (12+ .md files)
```

## Hosting the Q&A website

The site lets you **ask any question** about the Fabulous architecture and content; answers are generated from the research docs only (no made-up info).

**Local (with Q&A working):**
```bash
npm install
vercel dev
```
Then open http://localhost:3000. You need an API key in the environment (see below). Without `vercel dev`, `npm run serve` only serves static files and `/api/ask` won’t exist.

**Deploy to Vercel (recommended):**
1. Push the repo to GitHub and import it at [vercel.com](https://vercel.com).
2. In the project, go to **Settings → Environment Variables** and add:
   - **ANTHROPIC_API_KEY** (recommended), or  
   - **OPENAI_API_KEY**  
   so the server can call the LLM. Keys stay on the server; the browser never sees them.
3. Deploy. The included `vercel.json` serves the app from `web/` at `/` and runs `api/ask.js` at `/api/ask`.

**Static-only (no Q&A):** To host just the static UI without the API (e.g. Netlify or GitHub Pages), use the `web/` folder as the publish directory. The ask form will show an error until the backend is available.

## Running multiple agents

Yes. You can run multiple agents in parallel:

- **Multiple Cursor/Composer sessions:** Open another Composer tab or window and start a new agent with the same repo. Each has its own context; they don’t share state.
- **Claude Code in the terminal:** You can run a second `claude` session in another terminal (e.g. a new tab) in the same project. One can work on the comprehensive doc while another builds the habit visualization or the web UI.
- **Subagents (mcp_task / dispatching):** From one agent you can dispatch parallel tasks (e.g. “explore” and “shell” or “generalPurpose”) so several subagents work at once. Results are reported back to the parent.

Best when tasks are independent: e.g. Agent A = comprehensive doc, Agent B = habit viz + web page, Agent C = hosting and docs.

## Research coverage

| Area | Depth |
|------|-------|
| Journey system | ✅ Verified — 6 journeys documented |
| Behavioral science | ✅ Verified — 8 frameworks mapped |
| Onboarding flow | ✅ Verified — all 11+ steps |
| Screens | ✅ Verified — all 21 screens |
| Dark patterns | ✅ Verified — 10 patterns with severity |
| Pricing | ✅ Verified — all tiers + conversion data |
| Images | 376 URLs indexed from Mobbin |

**Research date:** March 2026 | **Confidence:** 88% verified from 50+ sources
