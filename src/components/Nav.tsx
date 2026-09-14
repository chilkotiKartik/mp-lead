"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/fellowship", label: "Fellowship" },
  { href: "/journey", label: "Journey" },
  { href: "/institutions", label: "Institutions" },
  { href: "/fellows", label: "Fellows" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/stories", label: "Stories" },
];

const secondary = [
  { href: "/alumni", label: "Alumni" },
  { href: "/portal", label: "Fellow Portal" },
  { href: "/contact", label: "Contact" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav({ dark = false }: { dark?: boolean }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = dark && !solid && !open;

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 transition-[padding,box-shadow,background-color,color] duration-500 md:px-12 ${
          solid && !open
            ? "bg-paper/90 py-3.5 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
            : `py-5.5 ${light ? "text-paper" : open ? "text-paper" : "text-ink"}`
        }`}
      >
        <Link href="/" className="display relative z-10 text-2xl" onClick={() => setOpen(false)}>
          MP LEAD
        </Link>

        <div className="grotesque hidden gap-7 text-[13px] font-semibold tracking-wide uppercase lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="group relative">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-linear-to-r from-saffron via-amber to-green transition-all duration-400 ease-out group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-2.5">
          <Link
            href="/apply"
            onClick={() => setOpen(false)}
            className={`grotesque rounded-full px-5 py-2.5 text-[12px] font-bold tracking-wide uppercase transition-colors ${
              light || open
                ? "bg-paper text-ink hover:bg-saffron"
                : "bg-ink text-paper hover:bg-saffron-deep"
            }`}
          >
            Apply
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors lg:hidden ${
              light || open ? "border-paper/30 text-paper" : "border-line text-ink"
            }`}
          >
            {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile sheet — full-screen, staggered editorial list */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-6 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-1">
              {links.map((l, i) => (
                <span key={l.href} className="line-mask">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.6, delay: 0.16 + i * 0.045, ease: EASE }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="display block py-1 text-[clamp(34px,10vw,52px)] text-paper active:text-saffron"
                    >
                      {l.label}
                    </Link>
                  </motion.span>
                </span>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6"
            >
              {secondary.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="grotesque text-[12px] font-semibold tracking-wide text-paper/50 uppercase"
                >
                  {l.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
