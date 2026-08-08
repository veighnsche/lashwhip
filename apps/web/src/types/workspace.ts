export interface Project {
  id: string
  name: string
  createdAt: string
  rootPath?: string
}

export interface Conversation {
  id: string
  title: string
  projectId?: string // Undefined if unassigned (generic)
  pinned?: boolean
  archived?: boolean
  unread?: boolean
  updatedAt: string // ISO timestamp string for relative time calculation
  model?: string
}

export interface ToolCall {
  id: string
  name: string
  args: Record<string, unknown>
  status: "pending" | "success" | "error"
  output?: string
}

export interface Message {
  id: string
  conversationId: string
  role: "user" | "assistant" | "system" | "tool"
  content: string
  thinking?: string
  toolCalls?: ToolCall[]
  toolCallId?: string
  timestamp: string
}

export interface OllamaModel {
  name: string
  size?: string
  modifiedAt?: string
}
