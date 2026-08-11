import { LucideIcon } from "lucide-react";

interface MediaShowcaseCardProps {
  icon: LucideIcon;
  kind: string;
  title: string;
  description: string;
  tags: string[];
}

export function MediaShowcaseCard({
  icon: Icon,
  kind,
  title,
  description,
  tags,
}: MediaShowcaseCardProps) {
  return (
    <div className="group border border-line bg-card transition-colors hover:border-rust/50">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-line bg-secondary">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--rust)/0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--rust)/0.08)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <Icon className="relative h-10 w-10 text-rust transition-transform group-hover:scale-110" />
      </div>
      <div className="p-6">
        <p className="eyebrow">{kind}</p>
        <h3 className="mt-2 font-display text-xl font-medium text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-line bg-secondary px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-rust"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
