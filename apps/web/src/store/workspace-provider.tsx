import React, { useCallback, useMemo, useReducer } from "react"
import { WorkspaceContext, initialState, reducer } from "./workspace-context"

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const createProject = useCallback((name: string) => {
    dispatch({ name, type: "CREATE_PROJECT" })
  }, [])
  const renameProject = useCallback((id: string, name: string) => {
    dispatch({ id, name, type: "RENAME_PROJECT" })
  }, [])
  const deleteProject = useCallback((id: string) => {
    dispatch({ id, type: "DELETE_PROJECT" })
  }, [])
  const createConversation = useCallback((projectId?: string) => {
    dispatch({ projectId, type: "CREATE_CONVERSATION" })
  }, [])
  const renameConversation = useCallback((id: string, title: string) => {
    dispatch({ id, title, type: "RENAME_CONVERSATION" })
  }, [])
  const deleteConversation = useCallback((id: string) => {
    dispatch({ id, type: "DELETE_CONVERSATION" })
  }, [])
  const pinConversation = useCallback((id: string) => {
    dispatch({ id, type: "PIN_CONVERSATION" })
  }, [])
  const archiveConversation = useCallback((id: string) => {
    dispatch({ id, type: "ARCHIVE_CONVERSATION" })
  }, [])
  const markUnreadConversation = useCallback((id: string) => {
    dispatch({ id, type: "MARK_UNREAD_CONVERSATION" })
  }, [])
  const setActiveConversation = useCallback((id: string | null) => {
    dispatch({ id, type: "SET_ACTIVE_CONVERSATION" })
  }, [])

  const value = useMemo(
    () => ({
      activeConversationId: state.activeConversationId,
      archiveConversation,
      conversations: state.conversations,
      createConversation,
      createProject,
      deleteConversation,
      deleteProject,
      markUnreadConversation,
      pinConversation,
      projects: state.projects,
      renameConversation,
      renameProject,
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
