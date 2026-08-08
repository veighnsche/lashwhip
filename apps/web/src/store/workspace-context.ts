import { createContext } from "react"
import type { Project, Conversation } from "../types/workspace"
import { MOCK_PROJECTS, MOCK_CONVERSATIONS } from "../data/mock-workspace"

export interface WorkspaceStore {
  projects: Project[]
  conversations: Conversation[]
  activeConversationId: string | null

  // Mutators
  createProject: (name: string) => void
  renameProject: (id: string, name: string) => void
  deleteProject: (id: string) => void
  createConversation: (projectId?: string) => void
  renameConversation: (id: string, title: string) => void
  deleteConversation: (id: string) => void
  pinConversation: (id: string) => void
  archiveConversation: (id: string) => void
  markUnreadConversation: (id: string) => void
  setActiveConversation: (id: string | null) => void
}

export type Action =
  | { type: "CREATE_PROJECT"; name: string }
  | { type: "RENAME_PROJECT"; id: string; name: string }
  | { type: "DELETE_PROJECT"; id: string }
  | { type: "CREATE_CONVERSATION"; projectId?: string }
  | { type: "RENAME_CONVERSATION"; id: string; title: string }
  | { type: "DELETE_CONVERSATION"; id: string }
  | { type: "PIN_CONVERSATION"; id: string }
  | { type: "ARCHIVE_CONVERSATION"; id: string }
  | { type: "MARK_UNREAD_CONVERSATION"; id: string }
  | { type: "SET_ACTIVE_CONVERSATION"; id: string | null }

export interface StateData {
  projects: Project[]
  conversations: Conversation[]
  activeConversationId: string | null
}

const now = () => new Date().toISOString()

export function reducer(state: StateData, action: Action): StateData {
  switch (action.type) {
    case "CREATE_PROJECT":
      return {
        ...state,
        projects: [
          ...state.projects,
          { id: `proj-${Date.now()}`, name: action.name, createdAt: now() },
        ],
      }

    case "RENAME_PROJECT":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.id ? { ...p, name: action.name } : p
        ),
      }

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.id),
        conversations: state.conversations.map((c) =>
          c.projectId === action.id ? { ...c, projectId: undefined } : c
        ),
      }

    case "CREATE_CONVERSATION": {
      const newConversation: Conversation = {
        id: `conv-${Date.now()}`,
        title: "New Conversation",
        projectId: action.projectId,
        pinned: false,
        archived: false,
        unread: false,
        updatedAt: now(),
      }
      return {
        ...state,
        conversations: [...state.conversations, newConversation],
        activeConversationId: newConversation.id,
      }
    }

    case "RENAME_CONVERSATION":
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === action.id
            ? { ...c, title: action.title, updatedAt: now() }
            : c
        ),
      }

    case "DELETE_CONVERSATION": {
      const remaining = state.conversations.filter((c) => c.id !== action.id)
      let nextActive = state.activeConversationId
      if (state.activeConversationId === action.id) {
        nextActive = remaining[0]?.id ?? null
      }
      return {
        ...state,
        conversations: remaining,
        activeConversationId: nextActive,
      }
    }

    case "PIN_CONVERSATION":
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === action.id ? { ...c, pinned: !c.pinned } : c
        ),
      }

    case "ARCHIVE_CONVERSATION":
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === action.id ? { ...c, archived: !c.archived } : c
        ),
      }

    case "MARK_UNREAD_CONVERSATION":
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === action.id ? { ...c, unread: !c.unread } : c
        ),
      }

    case "SET_ACTIVE_CONVERSATION": {
      if (action.id === null) {
        return { ...state, activeConversationId: null }
      }
      const updatedConversations = state.conversations.map((c) =>
        c.id === action.id ? { ...c, unread: false } : c
      )
      return {
        ...state,
        conversations: updatedConversations,
        activeConversationId: action.id,
      }
    }

    default:
      return state
  }
}

export const initialState: StateData = {
  projects: MOCK_PROJECTS,
  conversations: MOCK_CONVERSATIONS,
  activeConversationId: MOCK_CONVERSATIONS[0]?.id ?? null,
}

export const WorkspaceContext = createContext<WorkspaceStore | undefined>(
  undefined
)
