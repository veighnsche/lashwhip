import { useContext } from "react"
import { WorkspaceContext, type WorkspaceStore } from "./workspace-context"

export function useWorkspaceStore(): WorkspaceStore {
  const context = useContext(WorkspaceContext)
  if (!context) {
    throw new Error("useWorkspaceStore must be used within a WorkspaceProvider")
  }
  return context
}

export type { WorkspaceStore } from "./workspace-context"
