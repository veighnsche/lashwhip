// @vitest-environment jsdom

import { act, createElement, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test"

import { AppLayout } from "./app-layout"

function renderLayout(
  withAuxiliaryPane = true,
  auxiliaryPane: ReactNode = createElement("aside", null, "Inspector")
) {
  const container = document.createElement("div")
  const root = createRoot(container)
  const props = {
    auxiliaryPane,
    chatView: createElement("main", null, "Chat"),
    sidebar: createElement("nav", null, "Sidebar"),
  }
  const layoutProps = withAuxiliaryPane
    ? props
    : { chatView: props.chatView, sidebar: props.sidebar }

  act(() => {
    root.render(createElement(AppLayout, layoutProps))
  })

  return {
    container,
    unmount: () => {
      act(() => {
        root.unmount()
      })
    },
  }
}

describe("AppLayout", () => {
  beforeEach(() => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true)
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("places supplied content in the three fixed layout slots", () => {
    const { container, unmount } = renderLayout()
    const sidebar = container.querySelector('[data-slot="sidebar-container"]')
    const chatView = container.querySelector("main")
    const auxiliaryPane = container.querySelector(
      '[data-slot="auxiliary-pane"]'
    )

    expect(sidebar?.className).toContain("w-64")
    expect(sidebar?.className).toContain("shrink-0")
    expect(chatView?.className).toContain("flex-1")
    expect(chatView?.className).toContain("min-w-0")
    expect(auxiliaryPane?.className).toContain("w-72")
    expect(auxiliaryPane?.className).toContain("shrink-0")

    unmount()
  })

  it("omits the auxiliary slot when no auxiliary content is supplied", () => {
    const { container, unmount } = renderLayout(false)

    expect(container.querySelector('[data-slot="auxiliary-pane"]')).toBeNull()

    unmount()
  })

  it("omits the auxiliary slot when auxiliary content is null", () => {
    const { container, unmount } = renderLayout(true, null)

    expect(container.querySelector('[data-slot="auxiliary-pane"]')).toBeNull()
    expect(
      container.querySelector('[aria-label="Hide auxiliary pane"]')
    ).toBeNull()

    unmount()
  })

  it("provides controls to collapse each side pane", () => {
    const { container, unmount } = renderLayout()
    const sidebarToggle = container.querySelector<HTMLButtonElement>(
      '[aria-label="Toggle sidebar"]'
    )
    const auxiliaryToggle = container.querySelector<HTMLButtonElement>(
      '[aria-label="Hide auxiliary pane"]'
    )

    if (!sidebarToggle || !auxiliaryToggle) {
      throw new Error("Expected both pane controls to be rendered.")
    }

    act(() => {
      sidebarToggle.click()
    })
    expect(
      container
        .querySelector('[data-slot="sidebar"]')
        ?.getAttribute("data-state")
    ).toBe("collapsed")

    act(() => {
      auxiliaryToggle.click()
    })
    expect(container.querySelector('[data-slot="auxiliary-pane"]')).toBeNull()
    expect(
      container.querySelector('[aria-label="Show auxiliary pane"]')
    ).not.toBeNull()

    unmount()
  })
})
