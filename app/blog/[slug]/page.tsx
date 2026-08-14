// app/blog/[slug]/page.tsx
import { getPost, getPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { format } from "date-fns";

//export async function generateStaticParams() {
//  const slugs = getPostSlugs();
//  return slugs.map((slug) => ({ slug }));
//}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `https://tremonte.info/blog/${slug}`;
  const description = post.excerpt || `Read ${post.title} on Tremonte.info`;

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: ["Tremonte"],
      url: postUrl,
      images: [
        {
          url: `/blog/${slug}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: [`/blog/${slug}/opengraph-image.png`],
    },
  };
}

// Your existing BlogPost component (keep as is)
export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug); // Make sure this is await

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: `/blog/${slug}/opengraph-image.png`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: "Tremonte",
    },
    publisher: {
      "@type": "Organization",
      name: "Tremonte.info",
      url: "https://tremonte.info",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tremonte.info/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="container max-w-3xl py-12">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          {post.title}
        </h1>
        <div className="mt-2 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {format(new Date(post.publishedAt), "MMMM d, yyyy")}
          </time>
        </div>
        <article className="prose prose-invert mt-8 max-w-none">
          {post.content}
        </article>
      </section>
    </>
  );
}