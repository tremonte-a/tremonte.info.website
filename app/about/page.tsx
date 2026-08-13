import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { Code2, Network, Video, Mic, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Angelo Tremonte",
  description:
    "30 years of self-taught technical expertise across tech support, programming, networking, and creative production.",
};

const skills = [
  { icon: Code2, label: "Self-taught in 5 programming languages" },
  { icon: Network, label: "Networking, hosting & systems troubleshooting" },
  { icon: GraduationCap, label: "Training & productivity coaching" },
  { icon: Video, label: "Video shooting, editing & color grading" },
  { icon: Mic, label: "Audio recording, mixing, mastering & restoration" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="eyebrow">About</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink text-balance sm:text-5xl">
        Thirty years of learning by fixing things.
      </h1>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          I started taking things apart — literally and figuratively — at age
          12. That curiosity never really stopped; it just found bigger
          problems to solve. Over three decades I&apos;ve worked frontline and
          enterprise tech support for major telecom providers in British
          Columbia, troubleshooting internet, cable, satellite, and hosting
          issues for customers ranging from individuals to large
          organizations.
        </p>
        <p>
          Along the way I taught myself five programming languages, because
          the fastest way to understand a system is usually to build one.
          That self-taught foundation now shows up in the custom dashboards,
          automation scripts, and small tools I build for clients who need
          something specific rather than something generic.
        </p>
        <p>
          I&apos;ve spent an equal amount of time behind a camera and at a
          mixing desk. Video and audio production — shooting, editing,
          grading, recording, mixing, mastering, and restoration — has been a
          parallel thread throughout my career, not a side hobby. I bring the
          same troubleshooter&apos;s instinct to a bad audio recording that I
          bring to a broken network connection: diagnose first, fix
          precisely, don&apos;t over-correct.
        </p>
        <p>
          Today I work independently, supporting nonprofits, small businesses,
          and larger organizations with training, tech support, data
          automation, and full-cycle production work. I&apos;m based in
          Ontario, Canada, and work with clients remotely and
          on-site.
        </p>
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="Core skills" title="What I bring to a project" />
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skills.map((skill) => (
            <li
              key={skill.label}
              className="group flex items-center gap-3 border border-line bg-card p-4 transition-colors hover:border-rust/50"
            >
              <skill.icon className="h-5 w-5 flex-shrink-0 text-rust transition-transform group-hover:scale-110" />
              <span className="text-sm text-ink">{skill.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
