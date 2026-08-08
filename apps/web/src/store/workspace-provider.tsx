import React, { useReducer, useCallback, useMemo } from "react"
import { WorkspaceContext, reducer, initialState } from "./workspace-context"

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const createProject = useCallback(
    (name: string) => dispatch({ type: "CREATE_PROJECT", name }),
    []
  )
  const renameProject = useCallback(
    (id: string, name: string) =>
      dispatch({ type: "RENAME_PROJECT", id, name }),
    []
  )
  const deleteProject = useCallback(
    (id: string) => dispatch({ type: "DELETE_PROJECT", id }),
    []
  )
  const createConversation = useCallback(
    (projectId?: string) =>
      dispatch({ type: "CREATE_CONVERSATION", projectId }),
    []
  )
  const renameConversation = useCallback(
    (id: string, title: string) =>
      dispatch({ type: "RENAME_CONVERSATION", id, title }),
    []
  )
  const deleteConversation = useCallback(
    (id: string) => dispatch({ type: "DELETE_CONVERSATION", id }),
    []
  )
  const pinConversation = useCallback(
    (id: string) => dispatch({ type: "PIN_CONVERSATION", id }),
    []
  )
  const archiveConversation = useCallback(
    (id: string) => dispatch({ type: "ARCHIVE_CONVERSATION", id }),
    []
  )
  const markUnreadConversation = useCallback(
    (id: string) => dispatch({ type: "MARK_UNREAD_CONVERSATION", id }),
    []
  )
  const setActiveConversation = useCallback(
    (id: string | null) => dispatch({ type: "SET_ACTIVE_CONVERSATION", id }),
    []
  )

  const value = useMemo(
    () => ({
      projects: state.projects,
      conversations: state.conversations,
      activeConversationId: state.activeConversationId,
      createProject,
      renameProject,
      deleteProject,
      createConversation,
      renameConversation,
      deleteConversation,
      pinConversation,
      archiveConversation,
      markUnreadConversation,
      setActiveConversation,
    }),
    [
      state.projects,
      state.conversations,
      state.activeConversationId,
      createProject,
      renameProject,
      deleteProject,
      createConversation,
      renameConversation,
      deleteConversation,
      pinConversation,
      archiveConversation,
      markUnreadConversation,
      setActiveConversation,
    ]
  )

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
