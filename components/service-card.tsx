import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
}

export function ServiceCard({
  id,
  number,
  icon: Icon,
  title,
  description,
  bullets,
}: ServiceCardProps) {
  return (
    <div
      id={id}
      className="group relative flex flex-col scroll-mt-24 bg-card p-8 transition-all duration-300 hover:bg-rust-light hover:shadow-[inset_0_0_0_1px_hsl(var(--rust)/0.5)]"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-muted-foreground">{number}</span>
        <Icon className="h-5 w-5 text-rust transition-transform group-hover:scale-110" />
      </div>

      <h3 className="mt-6 font-display text-2xl font-medium text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <ul className="mt-6 space-y-2 border-t border-line pt-6 text-sm text-ink">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-rust" />
            {bullet}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors group-hover:text-rust"
      >
        Discuss a project
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
