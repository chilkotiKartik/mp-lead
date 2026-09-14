"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export type Category = {
  href: string;
  label: string;
  caption: string;
  image: string;
};

/**
 * Signature MP LEAD navigation: a horizontal rail of image-led categories.
 * The active item's photograph lifts into a full editorial plate behind the rail,
 * so browsing the nav is itself an image experience.
 */
export function CategoryRail({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden bg-paper-dim py-16 md:py-24">
      {/* Backplate: the hovered category's photograph, cross-fading. */}
      <div className="pointer-events-none absolute inset-0">
        {categories.map((c, i) => (
          <motion.div
            key={c.href}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active === i ? 0.16 : 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={c.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              aria-hidden
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-paper-dim via-paper-dim/75 to-paper-dim" />
      </div>

      <div className="relative">
        <div className="mb-9 flex items-end justify-between gap-6 px-6 md:px-12">
          <div>
            <div className="eyebrow mb-2.5 text-saffron-deep">Explore MP LEAD</div>
            <h2 className="display text-[clamp(30px,4vw,54px)]">
              Eight ways in.
            </h2>
          </div>
          <p className="hidden max-w-xs text-[13.5px] leading-relaxed text-ink-soft md:block">
            The fellowship, the institutions, the people and the work — each its own
            way into MP LEAD.
          </p>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 px-6 pb-4 md:scroll-pl-12 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c, i) => (
            <RailItem
              key={c.href}
              category={c}
              index={i}
              onEnter={() => setActive(i)}
              onLeave={() => setActive((cur) => (cur === i ? null : cur))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RailItem({
  category,
  index,
  onEnter,
  onLeave,
}: {
  category: Category;
  index: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const spring = useSpring(mx, { stiffness: 180, damping: 20 });
  const imgX = useTransform(spring, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="snap-start"
    >
      <Link
        ref={ref}
        href={category.href}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (r) mx.set((e.clientX - r.left) / r.width);
        }}
        className="group/rail relative block w-[248px] shrink-0 md:w-[276px]"
      >
        <div className="relative aspect-4/5 overflow-hidden rounded-t-[130px] rounded-b-md">
          <motion.div className="absolute inset-[-8%]" style={{ x: imgX }}>
            <Image
              src={category.image}
              alt={category.label}
              fill
              sizes="(min-width: 768px) 276px, 248px"
              className="object-cover grayscale-[35%] transition-[filter,transform] duration-700 ease-out group-hover/rail:scale-105 group-hover/rail:grayscale-0"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-ink/45 via-transparent to-transparent" />
          {/* Crown scrim keeps the numeral legible over pale skies and domes. */}
          <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-ink/40 to-transparent" />

          {/* Index numeral, seated in the crown of the arch. */}
          <span
            aria-hidden
            className="grotesque absolute top-5 left-1/2 -translate-x-1/2 text-[13px] font-bold text-paper"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="pt-4">
          <div className="flex items-baseline gap-2">
            <h3 className="display text-[26px] transition-colors duration-300 group-hover/rail:text-saffron-deep">
              {category.label}
            </h3>
            <motion.span
              aria-hidden
              className="text-saffron-deep"
              initial={false}
              whileHover={{ x: 3 }}
            >
              ↗
            </motion.span>
          </div>
          <p className="mt-1 text-[12.5px] leading-snug text-ink-soft">
            {category.caption}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
