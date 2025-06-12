import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-primary/80 backdrop-blur-sm text-primary-foreground hover:bg-purple-700/90 border border-purple-700",
        destructive:
          "bg-destructive/80 backdrop-blur-sm text-destructive-foreground hover:bg-destructive/90 border border-destructive/90",
        outline:
          "border-2 border-purple-500 bg-transparent text-purple-600 hover:bg-purple-100 hover:text-purple-700 dark:text-purple-400 dark:hover:bg-purple-900 dark:border-purple-700",
        secondary:
          "bg-blue-600/80 backdrop-blur-sm text-blue-50 hover:bg-blue-700/90 border border-blue-700",
        ghost:
          "text-foreground hover:bg-silver-200 dark:hover:bg-silver-700 hover:text-accent-foreground",
        link: 
          "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-sm text-white hover:from-purple-700/90 hover:to-blue-700/90 shadow-md border-none",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-12 rounded-md px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
