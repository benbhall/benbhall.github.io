# AI-Assisted Development: Practical Adoption Plan

**Context:** You lead one team. You have influence potential across a tribe. This plan starts with your team and expands only after demonstrating results. No bloat — achievable steps with clear gates.

**Tech stack:** GitHub Copilot, VS Code (some Visual Studio), Bitbucket, Pipelines, Jenkins, Datadog, AKS/K8s, Vercel

---

## Principles

1. **Start with your team. Prove it. Then expand.** No org-wide rollout fantasy.
2. **Invest in the harness, not the prompts.** Reusable infrastructure > individual tricks.
3. **Measure what matters.** Comprehension and stability, not just velocity.
4. **Small batches.** AI makes big changesets easy — that's the trap.
5. **Security from day one.** Don't bolt it on later.

---

## Phase 1: Foundation (Weeks 1–4) — Your team only

### Goal: Everyone using AI inside the IDE on real work, with guardrails.

**Week 1–2: Setup and baseline**

- [ ] Ensure all team members have GitHub Copilot active in VS Code / Visual Studio
- [ ] Establish baseline metrics from existing tools:
  - PR size (lines changed, files touched) — pull from Bitbucket API
  - PR cycle time — Bitbucket
  - Build pass rate — Pipelines / Jenkins
  - Deployment frequency — track via Pipelines/Vercel deploy logs
  - Incident rate — Datadog
  - Code churn if available (commits that revert/overwrite recent changes)
- [ ] Create `AGENTS.md` in each active repo:
  - Project context, architecture overview, key conventions
  - Which areas are safety-critical vs internal tooling (risk tiers)
  - Testing requirements and patterns
  - "Do not touch" boundaries (constraints)
- [ ] Set up `.github/copilot-instructions.md` (or equivalent) with project-specific rules

**Week 3–4: Hashimoto Step 1–3 rollout**

- [ ] Team standup: 15-min session on "re-do a task you already completed using Copilot agentic mode"
  - Purpose: build trust calibration by verifying against known-good work
- [ ] Introduce end-of-day agent pattern: queue a well-defined task (e.g., write tests for an existing module, draft a migration, update docs), review results next morning
- [ ] Each person documents one "this worked well" and one "this failed" per week → shared channel/doc

**Approval checkpoint:**
- [ ] Brief your manager/skip-level: "We're using GitHub Copilot more deliberately. Here's the baseline. We'll compare in 4 weeks."
- [ ] No budget ask yet — Copilot is already licensed

---

## Phase 2: Workflow Integration (Weeks 5–10) — Your team only

### Goal: AI embedded in daily workflow with quality protections.

**TDD-first approach**

- [ ] Team agreement: AI-generated code must have tests written *before* generation (or at minimum, tests written by a human, not the same agent that wrote the code)
- [ ] For existing untested code: use Copilot to generate test scaffolding, then human-review the tests before using them as agent constraints
- [ ] Track: ratio of test-first vs test-after in PRs

**PR discipline**

- [ ] Set soft PR size limits: flag PRs over 400 lines for mandatory human architecture review
- [ ] Bitbucket PR template update: add "AI Involvement" field (None / Assisted / Agent-generated)
- [ ] Use Copilot for first-pass PR review (surface-level: style, obvious bugs, test coverage gaps) — human review focuses on intent, risk, and system impact

**Risk tiering**

- [ ] Classify repos/services into tiers:
  - **Tier 1 (high blast radius):** Customer-facing services on AKS, payment flows → mandatory human review, no agent-only PRs
  - **Tier 2 (moderate):** Internal APIs, data pipelines → AI-assisted review with human sign-off
  - **Tier 3 (low):** Internal tools, docs, config, test infrastructure → agent-generated with automated verification sufficient
- [ ] Document this in a `REVIEW-POLICY.md` at the org level

**Observability of AI impact**

- [ ] Datadog: create a dashboard tracking post-deploy error rates, comparing AI-flagged PRs vs non-AI
- [ ] Jenkins/Pipelines: track build failure rates — watch for increase as AI-generated code enters CI
- [ ] Weekly 15-min retro item: "What did AI help with this week? What did it get wrong?"

**Approval checkpoint:**
- [ ] 6-week comparison: PR size, cycle time, build pass rate, incident rate vs baseline
- [ ] Prepare a one-page summary for tribe leads

---

## Phase 3: Harness Engineering (Weeks 11–16) — Your team, shared with tribe

### Goal: Build reusable AI infrastructure. Start influencing across teams.

**AGENTS.md maturity**

- [ ] Evolve AGENTS.md into structured context files per repo:
  - Architecture decision records (ADRs) that agents can reference
  - Dependency maps
  - Known failure modes and historical incident context (the "agent subconscious")
- [ ] Template the format so other teams can adopt it easily

**Copilot custom instructions & workspace setup**

- [ ] Develop a shared `.vscode/` workspace settings template with Copilot configuration tuned for your stack
- [ ] Create reusable prompt patterns for common tasks:
  - "Generate migration for [service] following our ADR-nnn pattern"
  - "Write integration tests for [endpoint] using our test harness at [path]"
  - "Review this PR diff for security concerns given our Tier 1 classification"

**Pipeline integration**

- [ ] Add automated checks to Pipelines/Jenkins:
  - PR size gate (warning at 400 lines, block at 800 without explicit override)
  - Test coverage threshold (no decrease allowed on AI-generated PRs)
  - Lint/format check (agents sometimes produce inconsistent style)
- [ ] If feasible: experiment with "scenario holdout tests" — tests not visible to agents, run only in CI as a verification backstop

**Security baseline**

- [ ] Audit current Copilot/agent permissions: what can agents access?
- [ ] Principle of least privilege: agents should not have access to secrets, production credentials, or email
- [ ] Bitbucket branch protection: ensure agent-generated commits can't bypass required reviews on Tier 1 repos
- [ ] Review Copilot content exclusion settings — exclude sensitive config, secrets, production environment files

**Tribe sharing:**

- [ ] Present results to tribe leads: here's what we measured, here's what worked, here are the templates and AGENTS.md format
- [ ] Offer to pair with one other team to help them through Phase 1–2
- [ ] Share the `REVIEW-POLICY.md` risk tiering approach — this is the easiest win for other teams to adopt

---

## Phase 4: Scale and Sustain (Weeks 17+) — Tribe-wide influence

### Goal: Proven approach spreading. You're the reference team.

**Expand to tribe**

- [ ] Supported rollout: each adopting team gets a 1-hour kickoff + your AGENTS.md template + review policy template
- [ ] Buddy system: pair one person from your team with each new team for the first 2 weeks
- [ ] Tribe-level metrics dashboard: aggregate PR size, cycle time, build pass rate, incident rate across teams

**Middle loop recognition**

- [ ] Propose to engineering management: recognise supervisory AI engineering skills in career ladder
- [ ] Specific skills to assess: problem decomposition for agents, trust calibration, architecture coherence under parallel streams, quality assessment at speed
- [ ] Reference: Thoughtworks retreat findings on the "middle loop"

**Continuous improvement**

- [ ] Monthly tribe retro on AI-assisted development (30 min, lightweight)
- [ ] Track the batch size regression: if average PR size is growing, intervene
- [ ] Maintain comprehension checks: can every team member explain what recently shipped?
- [ ] Update AGENTS.md and custom instructions quarterly as patterns evolve

**Mid-level development programme**

- [ ] Identify team members who may need deliberate upskilling in fundamentals (architecture thinking, testing discipline, system reasoning)
- [ ] Pair them with staff engineers for structured sessions — not mentoring about AI tools, but about the engineering judgment AI can't replace
- [ ] Use AI tools as the mechanism: "Here's an agent-generated solution. Walk me through what's wrong with it and why."

---

## What NOT to do

- **Don't mandate AI usage.** Make it easy and useful. Mandates create resistance.
- **Don't measure lines of code generated.** Measure outcomes: cycle time, stability, comprehension.
- **Don't skip the baseline.** Without before/after data, you can't prove anything to leadership.
- **Don't let PR sizes balloon.** This is the #1 silent regression.
- **Don't ignore the human side.** Some developers will grieve the loss of hands-on coding as their primary identity. Acknowledge it. The Thoughtworks retreat documented this as a real phenomenon.
- **Don't configure agent access without security review.** Email access = account takeover potential.
- **Don't do a Big Bang tribe rollout.** Your team first. Prove it. One team at a time.

---

## Quick reference: key evidence to cite when seeking approval

| Claim | Source |
|-------|--------|
| AI amplifies existing strengths AND weaknesses | DORA 2025 Report |
| Code churn doubled, refactoring dropped in AI codebases | GitClear (211M lines) |
| AI doesn't reduce work — it intensifies it | HBR / Berkeley Haas (200-employee study) |
| TDD produces dramatically better agent results | Thoughtworks Retreat 2026 |
| Staff engineers save more time with AI than juniors per-use | Thoughtworks Retreat 2026 |
| Larger batch sizes correlate with lower stability | DORA (decade of research) |
| Mid-level engineers are the retraining risk | Thoughtworks Retreat 2026 |
| "Invest in the harness, not the prompts" | Mitchell Hashimoto |

---

## Files to create in repos

1. **`AGENTS.md`** — project context, architecture, conventions, risk tiers, constraints
2. **`.github/copilot-instructions.md`** — Copilot-specific rules for the repo
3. **`REVIEW-POLICY.md`** — risk tiering and review requirements by service/repo classification
4. **`.vscode/settings.json`** updates — workspace-level Copilot configuration

---

*This plan assumes no additional budget beyond existing GitHub Copilot licenses. Phase 3 pipeline changes use existing Pipelines/Jenkins infrastructure. The primary investment is time: approximately 2 hours/week of deliberate practice and measurement during Phase 1–2, reducing to 1 hour/week from Phase 3 onward.*
