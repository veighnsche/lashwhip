import { describe, expect, it } from "vite-plus/test"

import type { Conversation } from "../types/workspace"
import { reducer, type StateData } from "./workspace-context"

const conversations: Conversation[] = [
  {
    id: "target",
    title: "Target",
    unread: false,
    updatedAt: "2026-08-08T00:00:00Z",
  },
  {
    id: "other",
    title: "Other",
    unread: true,
    updatedAt: "2026-08-08T00:00:00Z",
  },
]

describe("workspace reducer", () => {
  it("marks a conversation unread idempotently", () => {
    const state: StateData = {
      activeConversationId: null,
      conversations,
      projects: [],
    }

    const marked = reducer(state, {
      id: "target",
      type: "MARK_UNREAD_CONVERSATION",
    })
    const repeated = reducer(marked, {
      id: "target",
      type: "MARK_UNREAD_CONVERSATION",
    })

    expect(repeated.conversations).toEqual([
      { ...conversations[0], unread: true },
      conversations[1],
    ])
  })
})
