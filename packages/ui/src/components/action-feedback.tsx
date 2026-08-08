import * as React from "react"
import { CheckIcon, XCircleIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Spinner } from "@workspace/ui/components/spinner"

export type FeedbackState = "idle" | "pending" | "success" | "error"

export interface ActionFeedbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  state: FeedbackState
  idleLabel: React.ReactNode
  successLabel?: React.ReactNode
  errorLabel?: React.ReactNode
  pendingLabel?: React.ReactNode
  autoResetMs?: number
  onReset?: () => void
}

function renderContent(
  state: FeedbackState,
  idleLabel: React.ReactNode,
  successLabel?: React.ReactNode,
  errorLabel?: React.ReactNode,
  pendingLabel?: React.ReactNode
): React.ReactNode {
  switch (state) {
    case "pending":
      return (
        pendingLabel ?? (
          <span className="inline-flex items-center gap-1.5">
            <Spinner className="size-3.5" />
            <span>{idleLabel}</span>
          </span>
        )
      )
    case "success":
      return (
        successLabel ?? (
          <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckIcon className="size-3.5" />
            <span>Copied</span>
          </span>
        )
      )
    case "error":
      return (
        errorLabel ?? (
          <span className="inline-flex items-center gap-1.5 text-destructive">
            <XCircleIcon className="size-3.5" />
            <span>Failed</span>
          </span>
        )
      )
    case "idle":
    default:
      return idleLabel
  }
}

export function ActionFeedback({
  state,
  idleLabel,
  successLabel,
  errorLabel,
  pendingLabel,
  autoResetMs = 1200,
  onReset,
  className,
  ...props
}: ActionFeedbackProps): React.JSX.Element {
  React.useEffect(() => {
    if (state !== "success" && state !== "error") {
      return
    }

    if (!autoResetMs || autoResetMs <= 0) {
      return
    }

    const timer = setTimeout(() => {
      onReset?.()
    }, autoResetMs)

    return () => {
      clearTimeout(timer)
    }
  }, [state, autoResetMs, onReset])

  const content = renderContent(
    state,
    idleLabel,
    successLabel,
    errorLabel,
    pendingLabel
  )

  return (
    <span
      data-slot="action-feedback"
      data-state={state}
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center transition-colors", className)}
      {...props}
    >
      {content}
    </span>
  )
}
