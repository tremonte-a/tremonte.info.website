// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPostSlugs() {
  try {
    return fs.readdirSync(postsDirectory).map((file) => file.replace(/\.mdx?$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

// ---- NEW: Lightweight function for metadata only (used by OG images) ----
export function getPostMetadata(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      title: data.title || slug,
      excerpt: data.excerpt || data.description || '',
      publishedAt: data.publishedAt || data.date || new Date().toISOString(),
      updatedAt: data.updatedAt || data.publishedAt || '',
      coverImage: data.coverImage || null,
    };
  } catch (error) {
    console.error(`Error reading metadata for ${slug}:`, error);
    return null;
  }
}

// ---- Full function with MDX compilation (used by the blog page) ----
export async function getPost(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const { content: compiledContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
    });

    return {
      title: data.title || slug,
      excerpt: data.excerpt || data.description || '',
      publishedAt: data.publishedAt || data.date || new Date().toISOString(),
      updatedAt: data.updatedAt || data.publishedAt || '',
      coverImage: data.coverImage || null,
      content: compiledContent,
      ...data,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}