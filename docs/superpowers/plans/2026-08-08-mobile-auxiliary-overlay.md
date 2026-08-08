# Mobile Auxiliary Overlay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent the auxiliary pane from squeezing the mobile chat area while preserving desktop behavior.

**Architecture:** Reuse the existing `AppLayout` state and toggle. CSS makes the auxiliary pane fixed on narrow screens and static from `md` upward.

**Tech Stack:** React 19, Tailwind CSS, Vitest/jsdom, Vite+.

## Global Constraints

- Add no dependencies, components, state, backdrop, or unrelated refactor.
- Preserve the desktop 18rem third pane and existing sidebar behavior.

---

### Task 1: Make the auxiliary pane a mobile overlay

**Files:**

- Modify: `apps/web/src/components/app-layout.tsx`
- Test: `apps/web/src/components/app-layout.test.tsx`

**Interfaces:**

- Consumes: existing `auxiliaryPane`, `isAuxiliaryPaneOpen`, and toggle behavior.
- Produces: a fixed narrow-screen auxiliary overlay and unchanged `md` desktop pane.

- [ ] **Step 1: Write the failing test**

Assert that `[data-slot="auxiliary-pane"]` includes `fixed`, `right-0`, `max-w-[calc(100vw-3rem)]`, `md:static`, and `md:w-72`.

- [ ] **Step 2: Verify the test fails**

Run `vp test run apps/web/src/components/app-layout.test.tsx` and confirm the missing responsive classes fail the assertion.

- [ ] **Step 3: Implement the minimal CSS change**

Replace the static-only auxiliary classes with mobile fixed positioning and `md` static positioning. Keep the existing conditional rendering and state.

- [ ] **Step 4: Verify automated and rendered behavior**

Run the focused test, `vp test run`, `vp run typecheck`, and `git diff --check`. In the browser, verify desktop static layout and 390px overlay open/close behavior with no console errors.

- [ ] **Step 5: Commit, push, and merge**

Commit only the design, plan, component, and test; push to `agent/issue-20-three-pane-layout`; re-fetch exact-head checks and threads; merge PR #36 only when clean.
