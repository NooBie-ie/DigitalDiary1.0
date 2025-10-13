import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:outline active:outline-2 active:outline-offset-2 active:outline-primary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const gyroButtonVariants = cva(
  "relative overflow-hidden transition-[transform] duration-300 ease-out [transform:perspective(800px)] will-change-transform",
  {
    variants: {
      gyro: {
        true: `
          hover:[transform:perspective(800px)_rotateX(var(--y,0))_rotateY(var(--x,0))_scale3d(1.05,1.05,1.05)]
          
          before:absolute before:inset-0 before:content-[''] before:bg-[radial-gradient(40%_60%_at_calc(var(--x-px,0)*1px)_calc(var(--y-px,0)*1px),theme(colors.white/20%),transparent)] before:opacity-0 before:transition-[opacity] before:duration-500 hover:before:opacity-100
          
          dark:before:bg-[radial-gradient(40%_60%_at_calc(var(--x-px,0)*1px)_calc(var(--y-px,0)*1px),theme(colors.white/10%),transparent)]
        `,
      },
    },
  }
)


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean,
  gyro?: boolean,
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, gyro = true, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const internalRef = React.useRef<HTMLButtonElement>(null)
    React.useImperativeHandle(ref, () => internalRef.current as HTMLButtonElement);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!internalRef.current || !gyro) return;
      const rect = internalRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / -2)
      
      const xPx = e.clientX - rect.left;
      const yPx = e.clientY - rect.top;

      internalRef.current.style.setProperty('--x', `${x * 10}deg`)
      internalRef.current.style.setProperty('--y', `${y * 10}deg`)
      internalRef.current.style.setProperty('--x-px', `${xPx}`)
      internalRef.current.style.setProperty('--y-px', `${yPx}`)
    }

    const handleMouseLeave = () => {
      if (!internalRef.current || !gyro) return;
      internalRef.current.style.setProperty('--x', `0deg`)
      internalRef.current.style.setProperty('--y', `0deg`)
    }


    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), gyroButtonVariants({ gyro }))}
        ref={internalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
