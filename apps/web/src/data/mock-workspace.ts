import type {
  Conversation,
  Message,
  OllamaModel,
  Project,
} from "../types/workspace"

export const MOCK_PROJECTS: Project[] = [
  {
    createdAt: "2026-08-01T10:00:00Z",
    id: "proj-1",
    name: "Goose Ollama Integration",
    rootPath: "/Users/vince/Projects/lashwhip",
  },
  {
    createdAt: "2026-08-03T14:30:00Z",
    id: "proj-2",
    name: "UI Components Redesign",
    rootPath: "/Users/vince/Projects/lashwhip/packages/ui",
  },
  {
    createdAt: "2026-08-05T09:15:00Z",
    id: "proj-3",
    name: "Flue Framework Backend",
    rootPath: "/Users/vince/Projects/lashwhip/apps/flue",
  },
]

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    archived: false,
    id: "conv-1",
    model: "qwen2.5:35b",
    pinned: true,
    projectId: "proj-1",
    title: "Local Ollama streaming client setup",
    unread: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    archived: false,
    id: "conv-2",
    model: "llama3.3:70b",
    pinned: false,
    projectId: "proj-1",
    title: "Model discovery route test",
    unread: true,
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    archived: false,
    id: "conv-3",
    model: "qwen2.5:35b",
    pinned: false,
    projectId: "proj-2",
    title: "Sidebar primitives layout",
    unread: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    archived: false,
    id: "conv-4",
    model: "deepseek-r1:32b",
    pinned: true,
    title: "Quick code snippet generator",
    unread: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    archived: false,
    id: "conv-5",
    model: "qwen2.5:35b",
    pinned: false,
    title: "General Q&A and notes",
    unread: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    archived: true,
    id: "conv-6",
    model: "qwen2.5:35b",
    pinned: false,
    projectId: "proj-3",
    title: "Archived refactoring thoughts",
    unread: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(),
  },
]

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "conv-1": [
    {
      content:
        "How should we connect the web client to local Ollama via Flue framework backend?",
      conversationId: "conv-1",
      id: "msg-1",
      role: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      content:
        "The web client (`apps/web`) uses `@flue/react` to send prompts to the Flue backend (`apps/flue`). The Flue backend hosts the model client connected to local Ollama at `http://localhost:11434` and streams tokens back to the frontend.",
      conversationId: "conv-1",
      id: "msg-2",
      role: "assistant",
      thinking:
        "Analyzing Flue architecture: Web connects to Flue backend, Flue handles Ollama stream.",
      timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    },
  ],
  "conv-4": [
    {
      content: "Show me an example of the ActionFeedback primitive props.",
      conversationId: "conv-4",
      id: "msg-3",
      role: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      content:
        'Here is the ActionFeedback primitive interface:\n\n```ts\nexport interface ActionFeedbackProps {\n  state: "idle" | "pending" | "success" | "error";\n  idleLabel: React.ReactNode;\n  successLabel?: React.ReactNode;\n  errorLabel?: React.ReactNode;\n  autoResetMs?: number;\n}\n```',
      conversationId: "conv-4",
      id: "msg-4",
      role: "assistant",
      timestamp: new Date(Date.now() - 1000 * 60 * 44).toISOString(),
    },
  ],
}

export const MOCK_OLLAMA_MODELS: OllamaModel[] = [
  { modifiedAt: "2026-08-01T00:00:00Z", name: "qwen2.5:35b", size: "20 GB" },
  { modifiedAt: "2026-07-28T00:00:00Z", name: "llama3.3:70b", size: "40 GB" },
  {
    modifiedAt: "2026-08-02T00:00:00Z",
    name: "deepseek-r1:32b",
    size: "19 GB",
  },
]
