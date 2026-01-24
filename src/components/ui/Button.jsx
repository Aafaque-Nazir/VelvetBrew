"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  (
    { className, variant = "primary", size = "default", children, ...props },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-bronze-500 text-black hover:bg-bronze-600 shadow-[0_0_15px_rgba(207,176,137,0.3)]",
      outline:
        "border border-bronze-500 text-bronze-500 hover:bg-bronze-500/10",
      ghost: "text-white/70 hover:text-white hover:bg-white/5",
      link: "text-bronze-500 hover:underline px-0 py-0 h-auto",
    };

    const sizes = {
      default: "h-10 px-6 py-2",
      sm: "h-9 px-4 text-xs",
      lg: "h-12 px-8 text-lg font-medium",
      icon: "h-10 w-10 p-2",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
Button.displayName = "Button";

export { Button };
