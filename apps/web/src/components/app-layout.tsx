import * as React from "react"
import { PanelRightIcon } from "lucide-react"

import { IconButton } from "@workspace/ui/components/icon-button"
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

export interface AppLayoutProps {
  sidebar: React.ReactNode
  chatView: React.ReactNode
  auxiliaryPane?: React.ReactNode
}

export function AppLayout({
  auxiliaryPane,
  chatView,
  sidebar,
}: AppLayoutProps): React.JSX.Element {
  const [isAuxiliaryPaneOpen, setIsAuxiliaryPaneOpen] = React.useState(true)
  const hasAuxiliaryPane = auxiliaryPane != null
  const auxiliaryPaneLabel = isAuxiliaryPaneOpen
    ? "Hide auxiliary pane"
    : "Show auxiliary pane"
  return (
    <SidebarProvider className="flex min-h-svh min-w-0 overflow-x-auto">
      <Sidebar collapsible="offcanvas" className="w-64 shrink-0 border-r">
        {sidebar}
      </Sidebar>
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div
          data-slot="app-layout-controls"
          className="flex shrink-0 items-center gap-1 border-b p-2"
        >
          <SidebarTrigger aria-label="Toggle sidebar" />
          {hasAuxiliaryPane && (
            <IconButton
              aria-label={auxiliaryPaneLabel}
              icon={<PanelRightIcon />}
              size="icon-sm"
              tooltip={auxiliaryPaneLabel}
              onClick={() => {
                setIsAuxiliaryPaneOpen((isOpen) => !isOpen)
              }}
            />
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{chatView}</div>
      </main>
      {hasAuxiliaryPane && isAuxiliaryPaneOpen && (
        <aside
          data-slot="auxiliary-pane"
          className="w-72 shrink-0 overflow-y-auto border-l"
        >
          {auxiliaryPane}
        </aside>
      )}
    </SidebarProvider>
  )
}
