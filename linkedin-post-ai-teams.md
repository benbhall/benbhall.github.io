# LinkedIn Post — AI & Engineering Teams

**Purpose:** Prompt discussion. Not follow-the-line. Not another "AI is a junior dev" take.

---

## Option A: The Middle Loop (provocation angle)

There's a category of engineering work forming right now that nobody has a name for.

It sits between writing code (inner loop) and shipping software (outer loop). Call it the middle loop: decomposing problems for AI agents, calibrating trust in their output, spotting plausible-but-wrong results, and keeping architecture coherent across parallel streams.

It's not coding. It's not management. It's supervisory engineering — and it requires different skills than either.

Here's the uncomfortable part: many developers were hired specifically to turn tickets into code. That work is evaporating. The new work demands delegation thinking, architecture instincts, and the ability to assess quality at speed.

A Thoughtworks retreat of senior practitioners drew a blunt parallel: in 1992, graphics engineers hand-coded polygon rendering. Two years later, it was in hardware. The engineers who insisted they were "hired to render polygons" were left behind.

Every abstraction shift has this moment. We're in it.

The question I'm sitting with: how do we help people who love writing code find professional meaning in the work that's actually emerging? Career ladders don't have a rung for "middle loop engineer" yet. Should they?

Curious what others are seeing.

---

## Option B: TDD as prompt engineering (surprising-hook angle)

The single highest-leverage practice for AI-assisted coding might be one that's 20 years old.

TDD.

Here's why: when you write tests first, AI agents can't cheat. They can't write a test that confirms their own broken implementation. The tests become deterministic validation for non-deterministic generation.

One practitioner at a recent senior engineering retreat put it this way: "I've gotten better results from TDD and agent coding than anything else, because it stops the mental error where the agent writes a test that verifies the broken behaviour."

Meanwhile, GitClear's analysis of 211M lines of code shows refactoring dropping and copy/paste rising in AI-assisted codebases. The default AI pattern is append-only. Without tests that enforce behaviour contracts, codebases grow faster than they improve.

The twist: TDD adoption was always limited because writing tests first felt slow. Now it's the thing that makes fast code generation actually safe.

Old practice. New reason. Still not popular enough.

What's the practice from your pre-AI playbook that turned out to be more relevant, not less?

---

## Option C: The batch size regression (contrarian angle)

Here's a pattern I'm watching: AI is making software delivery worse by making code production easier.

Sounds backwards. Let me explain.

DORA has spent a decade proving that smaller batch sizes correlate with higher stability. Small, frequent releases beat big, infrequent ones.

Now AI agents can generate 2,000-line changesets effortlessly. And teams are merging them. PRs are getting bigger. Release cadence is slowing. The ease of production is pushing teams — unconsciously — back toward waterfall-like patterns.

A senior engineering retreat flagged this as an "active regression that needs industry attention."

Add to this: Berkeley Haas found that AI doesn't reduce work, it intensifies it. Workers handle more tasks, not fewer. Cognitive load goes up. Decision fatigue becomes the real bottleneck — agents produce faster than humans can evaluate.

The teams that are actually getting results aren't the ones writing more code. They're the ones investing in verification infrastructure: test suites, constraints, risk tiering, and keeping their batch sizes small despite the temptation.

More output ≠ more progress.

Anyone else noticing the batch size creep?
