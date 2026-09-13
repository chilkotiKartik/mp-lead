"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

export type HoverPreviewItem = {
  key: string;
  image: string;
  title: string;
  subtitle: string;
};

function HoverLink({
  item,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  children,
}: {
  item: HoverPreviewItem;
  onHoverStart: (item: HoverPreviewItem, e: React.MouseEvent) => void;
  onHoverMove: (e: React.MouseEvent) => void;
  onHoverEnd: () => void;
  children: React.ReactNode;
}) {
  return (
    <span
      className="group/hoverlink relative inline-block cursor-pointer font-serif font-semibold text-ink"
      onMouseEnter={(e) => onHoverStart(item, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-linear-to-r from-saffron via-amber to-green transition-all duration-400 ease-out group-hover/hoverlink:w-full" />
    </span>
  );
}

const CARD_W = 280;
const CARD_H = 230;

export function HoverPreview({
  paragraphs,
  className,
}: {
  /** Each paragraph is an array of string | HoverPreviewItem segments. */
  paragraphs: (string | HoverPreviewItem)[][];
  className?: string;
}) {
  const [active, setActive] = useState<HoverPreviewItem | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const items = paragraphs
      .flat()
      .filter((seg): seg is HoverPreviewItem => typeof seg !== "string");
    items.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- preload runs once on mount; paragraphs is static per usage
  }, []);

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const offsetY = 20;
    let x = e.clientX - CARD_W / 2;
    let y = e.clientY - CARD_H - offsetY;

    if (x + CARD_W > window.innerWidth - 20) x = window.innerWidth - CARD_W - 20;
    if (x < 20) x = 20;
    if (y < 20) y = e.clientY + offsetY;

    setPosition({ x, y });
  }, []);

  const handleHoverStart = useCallback(
    (item: HoverPreviewItem, e: React.MouseEvent) => {
      setActive(item);
      setVisible(true);
      updatePosition(e);
    },
    [updatePosition]
  );

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (visible) updatePosition(e);
    },
    [visible, updatePosition]
  );

  const handleHoverEnd = useCallback(() => setVisible(false), []);

  return (
    <div className={className}>
      <div className="max-w-3xl space-y-7 text-[clamp(1.25rem,2.6vw,1.75rem)] leading-relaxed text-ink-soft">
        {paragraphs.map((segments, pIdx) => (
          <p key={pIdx}>
            {segments.map((seg, sIdx) =>
              typeof seg === "string" ? (
                <span key={sIdx}>{seg}</span>
              ) : (
                <HoverLink
                  key={sIdx}
                  item={seg}
                  onHoverStart={handleHoverStart}
                  onHoverMove={handleHoverMove}
                  onHoverEnd={handleHoverEnd}
                >
                  {seg.title}
                </HoverLink>
              )
            )}
          </p>
        ))}
      </div>

      <AnimatePresence>
        {visible && active && (
          <motion.div
            className="pointer-events-none fixed z-100"
            style={{ left: position.x, top: position.y, width: CARD_W }}
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="overflow-hidden rounded-2xl bg-ink p-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08),0_0_60px_rgba(255,153,51,0.12)]">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
              <div className="px-2 pt-3 font-serif text-sm font-semibold text-paper">
                {active.title}
              </div>
              <div className="px-2 pb-2 text-xs text-paper/55">{active.subtitle}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
