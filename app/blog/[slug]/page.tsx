import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Angelo Tremonte`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-rust"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All writing
      </Link>

      <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
        <span className="text-rust">{post.category}</span>
        <span>·</span>
        <span>{post.readTime}</span>
        <span>·</span>
        <span>{post.date}</span>
      </div>

      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink text-balance sm:text-5xl">
        {post.title}
      </h1>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:text-ink prose-p:leading-relaxed prose-p:text-muted-foreground prose-a:text-rust prose-li:text-muted-foreground prose-strong:text-ink">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
