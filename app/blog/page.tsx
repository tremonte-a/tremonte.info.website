import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing — Angelo Tremonte",
  description:
    "Notes on tech support, automation, training, and audio/video production from 30 years in the field.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <SectionHeading
        eyebrow="Writing"
        title="Notes from the field"
        description="Practical write-ups on tech support, automation, training, and production — drawn from real client work."
      />

      <div className="mt-12">
        {posts.length > 0 ? (
          posts.map((post) => <BlogCard key={post.slug} post={post} />)
        ) : (
          <p className="text-muted-foreground">No posts yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
