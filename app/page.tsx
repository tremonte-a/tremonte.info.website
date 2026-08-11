import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Wrench,
  BarChart3,
  Video,
  BookOpen,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/blog";

const pillars = [
  {
    icon: GraduationCap,
    title: "Training",
    description:
      "One-on-one and small-group coaching on the tools your team already uses — plus productivity systems built on 30 years of daily-driver experience.",
  },
  {
    icon: Wrench,
    title: "Tech Support",
    description:
      "Hands-on troubleshooting, networking, and systems support for small businesses and nonprofits who need a dependable technical partner.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Automation",
    description:
      "Custom dashboards and Python-built automation that take repetitive work off your plate and put real numbers behind your decisions.",
  },
  {
    icon: Video,
    title: "Video & Audio Production",
    description:
      "Shooting, editing, grading, and audio restoration — full-cycle production for promotional, documentary, and archival work.",
  },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, hsl(var(--rust)), hsl(var(--violet)) 60%, transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pt-28">
          <p className="eyebrow flex items-center gap-2 animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-rust animate-pulse-glow" />
            30 years in the field
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance animate-fade-up [animation-delay:80ms] sm:text-6xl">
            <span className="text-ink">Technology that works, </span>
            <span className="glow-text">explained by someone who has fixed it</span>
            <span className="text-ink"> for three decades.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground animate-fade-up [animation-delay:160ms]">
            I help small businesses and nonprofits with training, tech support,
            data automation, and full-cycle video &amp; audio production — the
            practical work that keeps an organization running.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:240ms]">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-rust px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground transition-all hover:glow-btn"
            >
              Book a Consultation
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-sm border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:border-rust hover:text-rust"
            >
              View the Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="hairline mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="What I do"
          title="Four ways I can help your organization"
          description="Each service stands alone, but most clients end up combining two or three — a training engagement often surfaces an automation opportunity, for example."
        />
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative bg-card p-8 transition-colors hover:bg-rust-light"
            >
              <pillar.icon className="h-6 w-6 text-rust transition-transform group-hover:scale-110" />
              <h3 className="mt-5 font-display text-xl font-medium text-ink">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
        <Link
          href="/services"
          className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink hover:text-rust"
        >
          See full service details
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      {/* Book promo */}
      <section className="hairline">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="flex aspect-[3/4] max-w-xs items-center justify-center border border-rust/30 bg-card glow-ring md:max-w-sm">
            <BookOpen className="h-14 w-14 text-rust" />
          </div>
          <div>
            <p className="eyebrow">Now writing</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Computer Aerobics
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              A practical, habit-building guide to keyboard shortcuts and
              everyday productivity — built from three decades of watching
              exactly where people lose time at the keyboard. Coming soon to
              Amazon.
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink hover:text-rust"
            >
              Learn more about the book
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      {posts.length > 0 && (
        <section className="hairline mx-auto max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="Writing" title="Notes from the field" />
          <div className="mt-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink hover:text-rust"
          >
            Read all posts
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      )}

      {/* CTA band */}
      <section className="hairline relative overflow-hidden bg-card">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, hsl(var(--violet)), hsl(var(--rust)) 60%, transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Let&apos;s talk through what you need — no obligation, no
            pressure, just a straight conversation about what&apos;s possible.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-rust px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground transition-all hover:glow-btn"
          >
            Book a Consultation
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
