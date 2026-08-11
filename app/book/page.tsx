import type { Metadata } from "next";
import { BookOpen, Check, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Computer Aerobics — Angelo Tremonte",
  description:
    "A practical, habit-building guide to keyboard shortcuts and everyday productivity, coming soon to Amazon.",
};

const chapters = [
  "Why shortcuts compound: the hidden math of saved seconds",
  "Building shortcut habits that actually stick",
  "Cross-platform muscle memory — Windows, Mac & beyond",
  "Application-specific power moves for everyday software",
  "Designing your own personal productivity system",
];

export default function BookPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
        <div className="flex aspect-[3/4] items-center justify-center border border-rust/30 bg-card glow-ring">
          <BookOpen className="h-16 w-16 text-rust" />
        </div>

        <div>
          <p className="eyebrow">Coming soon to Amazon</p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink text-balance sm:text-5xl">
            Computer Aerobics
          </h1>
          <p className="mt-3 font-display text-xl text-muted-foreground">
            A field guide to keyboard shortcuts and everyday productivity
          </p>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Most shortcut references are exhaustive lists nobody actually
            memorizes. This book is different: it&apos;s a training system,
            built from 30 years of watching exactly where people lose time at
            a keyboard, that drills a small set of high-impact shortcuts into
            genuine muscle memory — the same approach I use when training
            clients directly.
          </p>

          <ul className="mt-8 space-y-3">
            {chapters.map((chapter) => (
              <li key={chapter} className="flex items-start gap-3 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-rust" />
                {chapter}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-rust px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground transition-all hover:glow-btn"
            >
              <Mail className="h-3.5 w-3.5" />
              Get notified at launch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
