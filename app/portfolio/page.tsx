import type { Metadata } from "next";
import { Video, Mic, BarChart3, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { MediaShowcaseCard } from "@/components/media-showcase-card";

export const metadata: Metadata = {
  title: "Portfolio — Angelo Tremonte",
  description:
    "Video production, audio restoration, and automation project examples.",
};

const videoWork = [
  {
    icon: Video,
    kind: "Promotional / Short-Form",
    title: "Instagram Reel Campaign",
    description:
      "An automated production pipeline generating branded promotional reels — shot, edited, and graded for consistent brand feel across a product catalog.",
    tags: ["Editing", "Color Grade", "Short-Form"],
  },
  {
    icon: Video,
    kind: "Documentary-Style",
    title: "Handheld Documentary Piece",
    description:
      "Ground-level and elevated coverage, smooth pans and tilts, cut between wide establishing shots and close-up detail for an authentic, observational feel.",
    tags: ["Shooting", "Editing", "Documentary"],
  },
];

const audioWork = [
  {
    icon: Mic,
    kind: "Restoration",
    title: "Archival Interview Recovery",
    description:
      "Recovered a decades-old interview tape suffering from tape hiss and electrical hum — de-noised, de-hummed, and re-mastered for clean playback without an over-processed, robotic feel.",
    tags: ["De-hum", "De-noise", "Mastering"],
  },
  {
    icon: Mic,
    kind: "Production",
    title: "Podcast Mix & Master",
    description:
      "Full recording-to-master pipeline for spoken-word content: leveling, EQ, compression, and a final master built for consistent loudness across episodes.",
    tags: ["Recording", "Mixing", "Mastering"],
  },
];

const automationWork = [
  {
    icon: BarChart3,
    kind: "Data Analytics",
    title: "Cryptocurrency Dashboard",
    description:
      "A Python-built tool tracking transaction history, vendor fees, and portfolio value over time, with a self-hosted dashboard — no third-party subscription required.",
    tags: ["Python", "Dashboards", "Self-hosted"],
  },
  {
    icon: Workflow,
    kind: "Automation",
    title: "Content Automation Pipeline",
    description:
      "An end-to-end script that turns a product catalog into ready-to-post short-form video content, cutting a 45-minute manual process down to minutes.",
    tags: ["Python", "Workflow", "Scheduling"],
  },
];

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Portfolio"
        title="Selected work"
        description="A sample of video, audio, and automation projects. Full case studies and reels available on request during a consultation."
      />

      <div className="mt-16">
        <p className="eyebrow">Video Production</p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {videoWork.map((item) => (
            <MediaShowcaseCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <p className="eyebrow">Audio Production &amp; Restoration</p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {audioWork.map((item) => (
            <MediaShowcaseCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <p className="eyebrow">Data &amp; Automation</p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {automationWork.map((item) => (
            <MediaShowcaseCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
