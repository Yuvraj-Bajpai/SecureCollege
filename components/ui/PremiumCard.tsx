import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

export type PremiumCardProps = React.ComponentProps<typeof Card>

export const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "rounded-lg text-text shadow-sm border border-white/10 bg-white/5 backdrop-blur-xl",
          className
        )}
        {...props}
      />
    )
  }
)

PremiumCard.displayName = "PremiumCard"
