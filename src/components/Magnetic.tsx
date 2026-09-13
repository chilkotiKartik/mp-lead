"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";

function useMagnetic() {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, springX, springY, onMouseMove, onMouseLeave };
}

export function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const { ref, springX, springY, onMouseMove, onMouseLeave } = useMagnetic();
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}

export function MagneticButton({
  onClick,
  className,
  children,
  type = "button",
}: {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
}) {
  const { ref, springX, springY, onMouseMove, onMouseLeave } = useMagnetic();
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <button type={type} onClick={onClick} className={className}>
        {children}
      </button>
    </motion.div>
  );
}
