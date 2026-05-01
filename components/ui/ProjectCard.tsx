'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/components/cn";

type ProjectCardProps = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  label?: string;
  className?: string;
};

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 15,
  mass: 0.8,
};

export function ProjectCard({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  label = "VIEW WORK",
  className,
}: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.99 }}
      transition={springTransition}
      className={cn(
        "group relative overflow-hidden border-2 border-p5-white/90 bg-p5-black text-p5-white shadow-p5",
        "[clip-path:polygon(3%_0%,100%_0%,96%_18%,100%_78%,94%_100%,0%_100%,0%_10%)]",
        "sm:[clip-path:polygon(2%_0%,100%_0%,97%_16%,100%_80%,98%_100%,0%_100%,0%_8%)]",
        className,
      )}
    >
      <Link href={href} className="block h-full w-full">
        <div className="relative aspect-[16/10] overflow-hidden" style={{ color: 'var(--brand-main)' }}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={cn(
              "object-cover transition-[filter,transform] duration-300",
              "grayscale contrast-125 brightness-[0.65] saturate-0",
              "group-hover:grayscale-0 group-hover:contrast-150 group-hover:brightness-100 group-hover:saturate-150",
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(13,13,13,0.92)_0%,rgba(13,13,13,0.38)_45%,var(--brand-main)_100%)] transition-opacity duration-300 group-hover:opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(235,230,230,0.16),transparent_32%),repeating-linear-gradient(135deg,rgba(13,13,13,0.12)_0_2px,transparent_2px_5px)] opacity-60 mix-blend-multiply" />

          <motion.div
            className="absolute left-4 top-4 z-10 inline-flex -skew-x-12 bg-p5-black px-3 py-1 font-hand text-xs uppercase tracking-[0.3em] text-p5-white"
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={springTransition}
          >
            {title}
          </motion.div>

          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-4 pb-4 pt-12"
            initial={false}
          >
            <div className="max-w-[70%]">
              <p className="font-display text-2xl uppercase tracking-[0.08em] text-p5-white sm:text-3xl">{title}</p>
              <p className="mt-2 text-xs leading-5 text-p5-white/80 sm:text-sm">{description}</p>
            </div>

            <motion.span
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ...springTransition, delay: 0.06 }}
              className="inline-flex flex-none items-center justify-center bg-p5-red px-3 py-2 font-display text-xs uppercase tracking-[0.22em] text-p5-white"
            >
              {label}
            </motion.span>
          </motion.div>

          <motion.div
            className="absolute inset-y-0 right-0 z-20 flex items-center justify-end px-4"
            initial={{ x: 28, opacity: 0 }}
            animate={{ x: 0, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={springTransition}
          >
            <div className="max-w-[10rem] text-right font-display text-2xl uppercase leading-none tracking-[0.16em] text-p5-red sm:text-3xl">
              <span className="block -translate-x-2 translate-y-0 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">{label}</span>
              <span className="block translate-x-6 translate-y-1 opacity-0 transition-all duration-200 delay-75 group-hover:translate-x-0 group-hover:opacity-100">{label}</span>
              <span className="block translate-x-10 translate-y-2 opacity-0 transition-all duration-200 delay-150 group-hover:translate-x-0 group-hover:opacity-100">{label}</span>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}