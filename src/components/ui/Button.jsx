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
        "bg-gradient-to-r from-bronze-500 to-bronze-600 text-black hover:from-bronze-400 hover:to-bronze-500 shadow-[0_0_20px_rgba(217,119,6,0.2)] hover:shadow-[0_0_30px_rgba(217,119,6,0.4)] border border-transparent",
      outline:
        "border border-bronze-500 text-bronze-500 hover:bg-bronze-500/10",
      ghost: "text-white/70 hover:text-white hover:bg-white/5",
      link: "text-bronze-500 hover:underline px-0 py-0 h-auto",
    };

    const sizes = {
      default: "h-10 px-6 py-2",
      sm: "h-9 px-4 text-xs",
      lg: "h-12 px-8 text-lg font-medium",
      xl: "h-14 px-10 text-lg font-bold tracking-wide",
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
