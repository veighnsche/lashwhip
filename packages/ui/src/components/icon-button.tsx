import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

export interface IconButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  "size"
> {
  icon?: React.ReactNode
  tooltip?: React.ReactNode
  tooltipSide?: "top" | "right" | "bottom" | "left"
  size?:
    | "xs"
    | "sm"
    | "default"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
}

function getIconSize(
  size?:
    | "xs"
    | "sm"
    | "default"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
): "icon" | "icon-xs" | "icon-sm" | "icon-lg" {
  if (size === "xs" || size === "icon-xs") {
    return "icon-xs"
  }
  if (size === "sm" || size === "icon-sm") {
    return "icon-sm"
  }
  if (size === "lg" || size === "icon-lg") {
    return "icon-lg"
  }
  return "icon"
}

export function IconButton({
  icon,
  children,
  tooltip,
  tooltipSide = "top",
  size = "default",
  variant = "ghost",
  className,
  ...props
}: IconButtonProps): React.JSX.Element {
  const iconSize = getIconSize(size)
  const content = icon ?? children

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              size={iconSize}
              variant={variant}
              className={className}
              {...props}
            />
          }
        >
          {content}
        </TooltipTrigger>
        <TooltipContent side={tooltipSide}>{tooltip}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Button size={iconSize} variant={variant} className={className} {...props}>
      {content}
    </Button>
  )
}
