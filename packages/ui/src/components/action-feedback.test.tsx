// @vitest-environment jsdom

import { act } from "react"
import { createRoot } from "react-dom/client"
import { describe, expect, expectTypeOf, it, vi } from "vite-plus/test"

import {
  ActionFeedback,
  type ActionFeedbackProps,
} from "@workspace/ui/components/action-feedback"

describe("ActionFeedback", () => {
  it("requires a reset callback", () => {
    expectTypeOf<ActionFeedbackProps["onReset"]>().toEqualTypeOf<() => void>()
  })

  it("requests a reset after the default timeout", () => {
    vi.useFakeTimers()
    let resetCount = 0
    const container = document.createElement("div")
    const root = createRoot(container)

    act(() => {
      root.render(
        <ActionFeedback
          state="success"
          idleLabel="Copy"
          onReset={() => {
            resetCount += 1
          }}
        />
      )
    })

    act(() => {
      vi.advanceTimersByTime(1199)
    })
    expect(resetCount).toBe(0)

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(resetCount).toBe(1)

    act(() => {
      root.unmount()
    })
    vi.useRealTimers()
  })
})
