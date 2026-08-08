import type {
  Project,
  Conversation,
  Message,
  OllamaModel,
} from "../types/workspace"

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    name: "Goose Ollama Integration",
    createdAt: "2026-08-01T10:00:00Z",
    rootPath: "/Users/vince/Projects/lashwhip",
  },
  {
    id: "proj-2",
    name: "UI Components Redesign",
    createdAt: "2026-08-03T14:30:00Z",
    rootPath: "/Users/vince/Projects/lashwhip/packages/ui",
  },
  {
    id: "proj-3",
    name: "Flue Framework Backend",
    createdAt: "2026-08-05T09:15:00Z",
    rootPath: "/Users/vince/Projects/lashwhip/apps/flue",
  },
]

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    title: "Local Ollama streaming client setup",
    projectId: "proj-1",
    pinned: true,
    archived: false,
    unread: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    model: "qwen2.5:35b",
  },
  {
    id: "conv-2",
    title: "Model discovery route test",
    projectId: "proj-1",
    pinned: false,
    archived: false,
    unread: true,
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    model: "llama3.3:70b",
  },
  {
    id: "conv-3",
    title: "Sidebar primitives layout",
    projectId: "proj-2",
    pinned: false,
    archived: false,
    unread: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    model: "qwen2.5:35b",
  },
  {
    id: "conv-4",
    title: "Quick code snippet generator",
    pinned: true,
    archived: false,
    unread: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    model: "deepseek-r1:32b",
  },
  {
    id: "conv-5",
    title: "General Q&A and notes",
    pinned: false,
    archived: false,
    unread: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    model: "qwen2.5:35b",
  },
  {
    id: "conv-6",
    title: "Archived refactoring thoughts",
    projectId: "proj-3",
    pinned: false,
    archived: true,
    unread: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(),
    model: "qwen2.5:35b",
  },
]

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      conversationId: "conv-1",
      role: "user",
      content:
        "How should we connect the web client to local Ollama via Flue framework backend?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: "msg-2",
      conversationId: "conv-1",
      role: "assistant",
      content:
        "The web client (`apps/web`) uses `@flue/react` to send prompts to the Flue backend (`apps/flue`). The Flue backend hosts the model client connected to local Ollama at `http://localhost:11434` and streams tokens back to the frontend.",
      thinking:
        "Analyzing Flue architecture: Web connects to Flue backend, Flue handles Ollama stream.",
      timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    },
  ],
  "conv-4": [
    {
      id: "msg-3",
      conversationId: "conv-4",
      role: "user",
      content: "Show me an example of the ActionFeedback primitive props.",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: "msg-4",
      conversationId: "conv-4",
      role: "assistant",
      content:
        'Here is the ActionFeedback primitive interface:\n\n```ts\nexport interface ActionFeedbackProps {\n  state: "idle" | "pending" | "success" | "error";\n  idleLabel: React.ReactNode;\n  successLabel?: React.ReactNode;\n  errorLabel?: React.ReactNode;\n  autoResetMs?: number;\n}\n```',
      timestamp: new Date(Date.now() - 1000 * 60 * 44).toISOString(),
    },
  ],
}

export const MOCK_OLLAMA_MODELS: OllamaModel[] = [
  { name: "qwen2.5:35b", size: "20 GB", modifiedAt: "2026-08-01T00:00:00Z" },
  { name: "llama3.3:70b", size: "40 GB", modifiedAt: "2026-07-28T00:00:00Z" },
  {
    name: "deepseek-r1:32b",
    size: "19 GB",
    modifiedAt: "2026-08-02T00:00:00Z",
  },
]
