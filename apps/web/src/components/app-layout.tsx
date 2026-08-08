import * as React from "react"
import { PanelRightIcon } from "lucide-react"

import { IconButton } from "@workspace/ui/components/icon-button"
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"

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
  const isMobile = useIsMobile()
  const [isAuxiliaryPaneOpen, setIsAuxiliaryPaneOpen] = React.useState(true)
  const auxiliaryToggleId = React.useId()
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
              id={auxiliaryToggleId}
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
      {hasAuxiliaryPane &&
        (isMobile ? (
          <Sheet
            open={isAuxiliaryPaneOpen}
            onOpenChange={(open) => {
              setIsAuxiliaryPaneOpen(open)
              if (!open) {
                queueMicrotask(() => {
                  document.getElementById(auxiliaryToggleId)?.focus()
                })
              }
            }}
          >
            <SheetContent
              data-slot="auxiliary-pane"
              className="w-72 max-w-[calc(100vw-3rem)] overflow-y-auto p-0 [&>button]:hidden"
              side="right"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Auxiliary pane</SheetTitle>
                <SheetDescription>
                  Displays the auxiliary pane.
                </SheetDescription>
              </SheetHeader>
              {auxiliaryPane}
            </SheetContent>
          </Sheet>
        ) : (
          isAuxiliaryPaneOpen && (
            <aside
              data-slot="auxiliary-pane"
              className="hidden w-72 shrink-0 overflow-y-auto border-l bg-background md:block"
            >
              {auxiliaryPane}
            </aside>
          )
        ))}
    </SidebarProvider>
  )
}
