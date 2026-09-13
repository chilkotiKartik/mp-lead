"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const links = [
  { href: "/fellowship", label: "Fellowship" },
  { href: "/journey", label: "Journey" },
  { href: "/fellows", label: "Fellows" },
  { href: "/projects", label: "Projects" },
  { href: "/alumni", label: "Alumni" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-12 transition-[padding,box-shadow,background-color] duration-500 ${
        solid ? "bg-paper/90 backdrop-blur-md py-3.5 shadow-[0_1px_0_var(--color-line)]" : "py-5.5"
      }`}
    >
      <Link href="/" className="font-serif text-xl">
        MP LEAD
      </Link>
      <div className="hidden md:flex gap-9 text-sm font-semibold">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="relative group">
            {l.label}
            <span className="absolute left-0 -bottom-1 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>
      <Link
        href="/apply"
        className="rounded-full bg-ink text-paper px-5 py-2.5 text-[13px] font-bold transition-colors hover:bg-saffron-deep"
      >
        Apply Now
      </Link>
    </motion.nav>
  );
}
