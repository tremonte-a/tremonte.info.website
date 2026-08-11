import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col border-b border-line py-8 first:pt-0"
    >
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
        <span className="text-rust">{post.category}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>
      <h3 className="mt-3 font-display text-2xl font-medium text-ink transition-colors group-hover:text-rust sm:text-3xl">
        {post.title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{post.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink group-hover:text-rust">
        Read the post
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
