"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatedCounter({
    from = 0,
    to,
    duration = 2,
    suffix = "",
    prefix = "",
    className = "",
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const spring = useSpring(from, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) =>
        `${prefix}${Math.round(current)}${suffix}`
    );

    useEffect(() => {
        if (isInView) {
            spring.set(to);
        }
    }, [isInView, spring, to]);

    return <motion.span ref={ref} className={className}>{display}</motion.span>;
}
