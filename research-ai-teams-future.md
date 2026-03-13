# Research: The Future of Software Development Teams with AI

**Compiled: February 2026**
**Purpose:** Complete research synthesis from top commentators and evidence-based sources on how AI is reshaping software teams, workflows, and engineering practice.

---

## Sources Reviewed

| Source | Type | Date |
|--------|------|------|
| Thoughtworks Future of Software Engineering Retreat | Multi-day retreat synthesis (Chatham House Rule) | Feb 2026 |
| Dan Shapiro | Five Levels of AI Coding (blog) | Jan 2026 |
| StrongDM "Software Factory" | Simon Willison write-up of production deployment | Jan 2026 |
| Mitchell Hashimoto | AI Adoption Journey - 6 steps (blog) | Jan 2026 |
| Addy Osmani | "Agents Need a Manager" / Agentic Engineering (blog) | Jan 2026 |
| HBR / Berkeley Haas | "AI Doesn't Reduce Work — It Intensifies It" (study, 200 employees) | Late 2025 |
| GitClear | AI Code Quality Research (211M lines analysed) | 2024–2025 |
| DORA | AI Capabilities Model, 2025 Accelerate State of DevOps Report | 2025 |
| Tom Dale (Ember.js) | Mental health impact commentary | 2025 |

---

## Theme 1: The "Junior Dev" Framing is Obsolete

Almost every early take on AI coding settled on the same metaphor: treat it like a junior developer. This framing is now limiting. It undersells what AI agents can do (parallel execution, zero onboarding, instant duplication) and ignores genuine new risks (epistemic debt, drift, decision bottlenecks).

### Old framing vs New framing

| Old Framing | New Framing |
|-------------|-------------|
| AI is a junior dev | AI is an entire class of agent worker with different physics |
| Review its code | Invest in specs, tests, and constraints so code review becomes secondary |
| Pair with it | Orchestrate parallel streams and calibrate trust per task |
| It makes mistakes | Non-determinism requires verification infrastructure, not just eyeballs |
| Use it for boilerplate | Delegate entire work packages with acceptance criteria |
| Measure lines of code | Measure coherence, comprehension, and system stability |

---

## Theme 2: Where Does the Rigor Go? (Thoughtworks Retreat)

The single most important question from the retreat. If AI takes over code production, engineering discipline doesn't disappear — it migrates. The retreat identified **five destinations**:

### 1. Upstream to specification review
- Teams shifting review from code to the plan preceding it: "pre-reviewing plans and post-reviewing engineering"
- Specs need new formats — traditional user stories too vague for AI agents
- Teams rediscovering EARS (Easy Approach to Requirements Syntax), state machines, decision tables
- **Implication:** Bad specs produce bad code at scale

### 2. Into test suites as first-class artifacts
- **TDD produces dramatically better results from AI agents** — the retreat's most shareable insight
- Mechanism: TDD prevents agents writing tests that verify broken behaviour
- Tests become "deterministic validation for non-deterministic generation"
- Some practitioners treating generated code as expendable — if tests pass, code is acceptable regardless of how it looks
- **Reframe: TDD is a form of prompt engineering**

> "I've gotten better results from TDD and agent coding than I've ever gotten anywhere else, because it stops a particular mental error where the agent writes a test that verifies the broken behaviour."

### 3. Into type systems and constraints
- Make incorrect code unrepresentable rather than reviewing code after generation
- Separate specifications (what should change) from constraints (what must not be touched)
- Constraints limit blast radius — when a constraint must be broken, it signals a new system boundary

### 4. Into risk mapping
- Tier code by business blast radius: internal tools vs external-facing vs safety-critical
- New core engineering discipline: "What is the blast radius if this code is wrong, and is our verification proportional to that risk?"
- Shift from craft model (every line hand-reviewed) to risk management model (verification investment matches exposure)

### 5. Into continuous comprehension
- Code review historically served as a learning mechanism — mentorship, shared understanding, codebase familiarity
- Alternatives: weekly architecture retrospectives, ensemble programming, AI-assisted code comprehension tools
- Losing review-as-learning without replacing it creates a comprehension gap that compounds

> "Paired programming solves all of this. If it's important to understand the system, then do it all the time."

---

## Theme 3: The Middle Loop — A New Category of Work (Thoughtworks Retreat)

**Nobody in the industry has named this yet.**

Software development has two recognised loops:
- **Inner loop:** Developer's personal cycle (write, test, debug)
- **Outer loop:** Delivery cycle (CI/CD, deployment, operations)

The retreat identified a **third: the middle loop** — supervisory engineering work sitting between them.

### What middle loop work involves:
- Directing, evaluating, and fixing AI agent output
- Decomposing problems into agent-sized work packages
- Calibrating trust in agent output
- Recognising plausible-looking but incorrect results
- Maintaining architectural coherence across parallel agent streams

### Who excels at it:
- Think in delegation/orchestration rather than direct implementation
- Strong mental models of system architecture
- Can rapidly assess output quality without reading every line
- These are skills experienced engineers already have — but rarely explicitly developed or recognised in career ladders

### Career identity crisis:
- Genuine crisis for developers who fell in love with programming
- Many hired specifically to translate tickets into code — that work is disappearing
- Historical parallel: computer graphics engineers in 1992 hand-coded polygon rendering → 1994 pushed into hardware → job became animation/lighting → now custom physics. Each time abstraction rose, those who insisted they were hired to render polygons were left behind.

### PM convergence:
- Developers now thinking about *what* to build and *why* — work that belonged to PMs
- One large tech company actively researching whether PM role needs a new name
- Another training all PMs to work in Markdown inside developer tools

---

## Theme 4: Maturity Models and Adoption Journeys

### Dan Shapiro's Five Levels of AI Coding

| Level | Name | Description |
|-------|------|-------------|
| 1 | Spicy Autocomplete | Tab-complete on steroids |
| 2 | Chat Pair Programmer | Conversational back-and-forth |
| 3 | The Trap | Agents write lots of code, humans lose comprehension — "the uncanny valley of AI coding" |
| 4 | AI-Native Development | Rearchitected workflows where AI writes and humans specify/verify |
| 5 | Dark Factory | Full autonomous operation (theoretical) |

**Key insight:** Level 3 is where most teams stall. Productivity numbers look great but system understanding erodes. Teams that don't deliberately move to Level 4 practices accumulate epistemic debt.

### Mitchell Hashimoto's 6-Step Adoption Journey

1. **Drop the chatbot.** Stop using ChatGPT in a browser tab. Use AI inside the IDE.
2. **Reproduce your existing work.** Use AI to redo tasks you already know how to do. You can verify quality because you know the answer.
3. **End-of-day agents.** Queue up agent tasks at end of day. Review results next morning. Builds trust calibration.
4. **Outsource slam dunks.** Give agents the straightforward, well-defined work. Free human time for hard problems.
5. **Engineer the harness.** Build AGENTS.md, custom rules, project context files. The harness is more valuable than any single prompt.
6. **Always have an agent running.** Continuous background agent work on lower-priority tasks. You review and redirect.

**Key insight:** "Invest in the harness, not the prompts."

### Addy Osmani's "Agents Need a Manager"

- Two modes: **high-touch** (complex, ambiguous work) and **async** (well-defined, parallelisable)
- **Three-part delegation split:** 70% well-scoped agent tasks / 20% ambiguous requiring human judgment / 10% fully manual
- **Two-agent pattern:** One agent generates, another reviews — mimics human pair programming
- **WIP limits for agents:** Treat agent tasks like kanban cards. Too many parallel streams = review bottleneck
- **Operating loop:** Plan → Delegate → Monitor → Review → Integrate

---

## Theme 5: The Evidence — What's Actually Happening

### HBR / Berkeley Haas Study (200 employees, real workplace)
- **AI doesn't reduce work — it intensifies it**
- Workers reported handling more tasks, not fewer
- Cognitive load increased as workers became supervisors of AI output
- Organisations assumed AI would free capacity; instead it raised the bar for what was expected

### GitClear Research (211M lines of code analysed)
- Code churn doubled in AI-assisted codebases
- Refactoring dropped from ~25% to ~10% of changes
- Copy/paste patterns rose from 8.3% to 12.3%
- "Moved" code (proxy for refactoring) declining
- **Signal:** AI produces append-only code by default. Without explicit refactoring guidance, codebases grow faster than they improve.

### Tom Dale (Ember.js creator) on Mental Health
- Described witnessing a "mental health crisis" among experienced developers
- The identity shift from "person who writes code" to "person who supervises code" is genuinely difficult
- Some senior engineers are leaving the profession rather than adapting

### DORA AI Capabilities Model (2025 Report)
- Identified 7 AI capabilities for software delivery
- Key finding: **"AI amplifies existing strengths and weaknesses"**
- Teams with good practices get better; teams with poor practices get worse faster
- AI does not fix broken processes — it accelerates them

---

## Theme 6: Agent Topologies and Enterprise Architecture (Thoughtworks Retreat)

**Conway's Law didn't retire. It got more complicated.**

### Speed mismatch
- Agents clear backlogs in days then hit cross-team dependencies, architecture reviews, human-speed decisions
- Result: same delivery speed, more frustration — bottleneck shifts from engineering capacity to everything else

### Agent drift
- Agents learning from context diverge over time (e.g., database agent on e-commerce vs ERP)
- Debate: manage drift (standardise) or embrace it (local optimisation)?

### Decision fatigue as new bottleneck
- Agents produce faster than leaders can review/approve
- Middle managers previously serving as coordination become approval bottlenecks
- Open question: fewer managers, differently-skilled managers, or fundamentally different coordination?

### The StrongDM "Software Factory" (via Simon Willison)
- **No human code review of AI-generated code whatsoever**
- Instead: "scenario holdout testing" — tests held back from agents, used only for verification
- "Digital Twin Universe" — full parallel environment for agent testing
- Spending ~$1,000/day/engineer on AI tokens
- 10% of engineers (3 people) doing "AI engineering" — maintaining agent harnesses, not writing product code
- Represents Dan Shapiro's Level 4/5 in practice

---

## Theme 7: Self-Healing Systems (Thoughtworks Retreat)

### Prerequisites that don't exist yet:
- Clear ledger of every change
- Operating system for agents with identity controls
- Strong generic mitigation (rollback, feature flags) working without code changes
- Fitness functions defining "healthy" in agent-evaluable terms

### The latent knowledge problem
- Senior engineers carry decades of pattern-matching for incidents (never documented)
- Need "agent subconscious": knowledge graph from post-mortems and incident data
- Human nuance step still essential

### Incident commander problem
- LLMs tend toward positive reinforcement and agreement
- Need "angry agents" designed to challenge dominant hypotheses

### Agent coordination risks
- Real example: agent told to keep files under 500 lines → made individual lines longer
- Multiple agents can create oscillating feedback loops

---

## Theme 8: Security, Governance, and Agile (Thoughtworks Retreat)

### Security is dangerously behind
- Security session had low attendance — reflects industry pattern
- Email access enables password resets and account takeovers
- Full machine access for dev tools = full machine access for anything
- **Recommendation:** Platform engineering drives secure defaults. Don't rely on individual devs.

### Agile is evolving, not dying
- Some teams compressing sprints to one week with AI automating ceremonies
- Others rediscovering XP practices (pair programming, ensemble dev, CI) for tight feedback loops
- **Active regression:** AI-generated large changesets pushing teams toward waterfall-like patterns
- Direct reversal of DORA findings on batch size and stability

### Batch size regression
- Ease of producing large changesets with AI = larger, less frequent releases
- Software stability declining as batch size increases
- Flagged as needing "industry attention"

---

## Theme 9: The Human Side — Roles, Skills, Experience (Thoughtworks Retreat)

### Productivity/experience paradox
- Developer productivity and developer experience are **decoupling**
- Orgs can get more output even where devs report lower satisfaction, more cognitive load, reduced flow
- Sharp reframe: "Call it **agent experience** instead — wallets open faster to invest in agent performance, and the overlap with conditions that help humans is nearly complete"

### Staff engineers under pressure
- More important and more stressed than ever
- Use AI tools less than juniors but save more time per session (broader context, deeper architecture knowledge)
- Should become "friction killers" — removing impediments for both humans and agents
- Many have learned helplessness after years of hearing "no budget for improvements"

### Juniors are more valuable, not less
- More profitable than ever — AI gets them past net-negative phase faster
- Call option on future productivity
- Better at AI tools than seniors (no pre-existing habits to unlearn)

### Mid-levels are the real concern
- Came up during decade-long hiring boom
- May not have developed fundamentals needed to thrive
- Represent bulk of industry by volume
- Retraining genuinely difficult — "no organization has solved it yet"

### University of Waterloo co-op model highlighted
- Deep theoretical foundations + 2.5 years industry internships (six 4-month rotations)
- Intern-to-hire pipelines outperforming traditional graduate recruiting

---

## Theme 10: Agent Swarms (Thoughtworks Retreat)

### First barrier is mental, not technical
- Engineers trained in sequential decomposition struggle with parallel agent work
- Asking agents to parallelise work explicitly and observing results teaches more than theory

### Collective convergence > individual accuracy
- Swarm of individually imperfect agents can produce valuable outcomes
- System architecture must guide convergence
- Design principle borrowed from distributed systems and biological swarm intelligence

### "Patrol workers on loops" — the more common pattern
- Agents running ETL transforms, data quality checks, business process monitors on continuous cycles
- "The unsexy work of data reliability running always-on"
- Organisations with strong, well-designed APIs significantly better positioned

---

## Theme 11: Technical Foundations (Thoughtworks Retreat)

### Programming languages for agents
- Every existing language designed for humans
- Principle: **"What is good for AI is good for humans"**
- Languages making incorrect code unrepresentable help both agents and humans
- Radical possibility: source code becomes transient artifact, generated on demand, never stored
- Counter-argument: deterministic validation requires stable artifact to test against

### Semantic layers and knowledge graphs
- Decades-old technologies suddenly relevant as grounding layer for domain-aware agents
- Large telecom's entire domain ontology captured in ~286 concepts
- Practical value in legacy modernisation: auto-generate event storming artifacts from code, humans validate

### The agentic operating system
- Agent identity and permission management
- Memory and context-window management
- Work ledger (future, current, past work) with skills, acceptance criteria, SLOs, cost constraints
- Agent = more than persona/goals/context — includes history of work performed
- Work ledger as core primitive — analogous to financial blockchain: searchable, auditable

---

## Key Open Questions (Retreat)

### On work and identity
- How do we help engineers who love writing code find meaning in supervisory work?
- What professional development pathways lead to the middle loop?
- If PM and developer roles converge, what is the resulting role?

### On organizational design
- If agents make middle management bottlenecks more visible, what's the response?
- How redesign enterprise architecture when agents cross team boundaries but governance can't?

### On trust and verification
- What would need to be true to stop reviewing AI-generated code entirely?
- Can test suites and constraints provide sufficient verification without human inspection?
- How build trust in fundamentally non-deterministic systems?

### On speed and stability
- Are productivity gains being offset by stability losses from larger batch sizes?
- Will development need to slow down because decision volume overwhelms human capacity?
- How measure the real cost of cognitive debt?

---

## Synthesis: What to Act On Now

1. **Invest in the harness, not the prompts.** AGENTS.md, test infrastructure, scenario holdouts, code quality metrics, WIP limits.
2. **Rigor migrates — track where yours is going.** Specs, tests, constraints, risk mapping, comprehension practices.
3. **Name the middle loop.** Recognise supervisory engineering as real work. Update career ladders.
4. **Watch batch size.** AI makes large changesets easy — this is a stability regression. Keep batches small.
5. **TDD is the strongest form of prompt engineering.** Tests before code is the single highest-leverage practice for AI-assisted development.
6. **Staff engineers are your leverage.** Reposition them as friction killers, not just architects.
7. **Mid-levels need a plan.** The retraining problem is real and unsolved. Don't ignore it.
8. **Security can't wait.** Agent access = full access. Platform engineering must drive secure defaults.
9. **Measure comprehension, not just output.** Epistemic debt is invisible until it's catastrophic.
10. **Start now, start small.** Hashimoto's step 1: stop using a browser chatbot. Move AI into the IDE.
