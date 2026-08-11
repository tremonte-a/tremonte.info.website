import type { Metadata } from "next";
import { GraduationCap, Wrench, BarChart3, Video } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";

export const metadata: Metadata = {
  title: "Services — Angelo Tremonte",
  description:
    "Training, tech support, data analytics & automation, and video/audio production services.",
};

const services = [
  {
    id: "training",
    number: "01",
    icon: GraduationCap,
    title: "Training",
    description:
      "Hands-on coaching for individuals and small teams — built around the software you actually use, not a generic curriculum.",
    bullets: [
      "One-on-one and small-group sessions",
      "Productivity & keyboard-shortcut coaching",
      "Software onboarding for new tools and platforms",
      "Custom training built around your team's real workflow",
    ],
  },
  {
    id: "tech-support",
    number: "02",
    icon: Wrench,
    title: "Tech Support",
    description:
      "30 years of frontline and enterprise troubleshooting experience, applied to your day-to-day technical problems.",
    bullets: [
      "Remote and on-site troubleshooting",
      "Networking setup and diagnostics",
      "Website maintenance and upkeep",
      "Ongoing technical support retainers",
    ],
  },
  {
    id: "automation",
    number: "03",
    icon: BarChart3,
    title: "Data Analytics & Automation",
    description:
      "Custom-built tools that remove repetitive manual work and give you a clearer picture of what's actually happening in your business.",
    bullets: [
      "Custom dashboards and reporting tools",
      "Python-based workflow automation",
      "Self-hosted, no ongoing subscription lock-in",
      "Data pipelines built around your existing tools",
    ],
  },
  {
    id: "production",
    number: "04",
    icon: Video,
    title: "Video & Audio Production",
    description:
      "Full-cycle production — from raw footage to a finished, graded, mixed deliverable.",
    bullets: [
      "Shooting, editing, and color grading",
      "Documentary-style and short-form social video",
      "Audio recording, mixing, and mastering",
      "Audio restoration for old or damaged recordings",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Services"
        title="Practical help, four ways"
        description="Every engagement starts with a conversation about the actual problem — not a fixed package. Here's the full detail on each area."
      />

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
}
