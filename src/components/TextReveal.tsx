import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "../lib/utils";

interface Props {
    text: string;
    className?: string;
    delay?: number;
    as?: "h1" | "h2" | "h3" | "div" | "span";
}

export function TextReveal({ text, className, delay = 0, as: Tag = "div" }: Props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    const words = text.split(" ");

    const container = {
        hidden: { opacity: 1 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
        }),
    };

    const child = {
        hidden: {
            opacity: 1,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <Tag ref={ref} className={cn("inline-block", className)}>
            <motion.span
                variants={container}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-block"
            >
                {words.map((word, index) => (
                    <motion.span
                        key={index}
                        variants={child}
                        className="inline-block mr-[0.2em] last:mr-0"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.span>
        </Tag>
    );
}
