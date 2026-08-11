import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      category: data.category as string,
      readTime: data.readTime as string,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    category: data.category as string,
    readTime: data.readTime as string,
    content,
  };
}
