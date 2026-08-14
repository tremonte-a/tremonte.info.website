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

export async function getPost(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Compile the MDX to JSX for the page
    const { content: compiledContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
    });

    return {
      title: data.title || slug,
      excerpt: data.excerpt || data.description || '',
      publishedAt: data.publishedAt || data.date || new Date().toISOString(),
      updatedAt: data.updatedAt || data.publishedAt || '',
      content: compiledContent, // This is the JSX your page renders
      ...data,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}