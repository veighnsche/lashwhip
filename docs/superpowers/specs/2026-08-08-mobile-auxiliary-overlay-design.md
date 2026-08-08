# Mobile Auxiliary Overlay Design

## Goal

Keep the chat area full-width on narrow screens while preserving access to the auxiliary pane through the existing toggle.

## Design

- Below the `md` breakpoint, render the open auxiliary pane as a fixed right-side overlay with its existing 18rem width and a viewport-safe maximum width.
- At `md` and wider, retain the current static 18rem third pane without behavioral or visual changes.
- Keep the existing open/close state and button; add no component, dependency, backdrop, or new state.
- Preserve the sidebar's existing responsive behavior.

## Verification

- A focused component test asserts the responsive positioning classes.
- Full tests and typecheck remain green.
- Browser QA proves a 390px viewport leaves the main pane full-width, the auxiliary pane overlays it, and the toggle hides it; desktop remains a static three-pane layout.
