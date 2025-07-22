import { Client } from '@notionhq/client';
import { Post } from './types';
import type { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;

if (!NOTION_PAGE_ID) {
  throw new Error('NOTION_PAGE_ID environment variable is required');
}

if (!process.env.NOTION_TOKEN) {
  throw new Error('NOTION_TOKEN environment variable is required');
}

interface RichText {
  plain_text: string;
}

// Convert Notion block to HTML-like content
function blockToHtml(block: BlockObjectResponse | PartialBlockObjectResponse): string {
  if (!('type' in block)) return '';
  
  const { type } = block;
  
  switch (type) {
    case 'paragraph':
      return `<p>${(block as any).paragraph.rich_text.map((text: RichText) => text.plain_text).join('')}</p>`;
    case 'heading_1':
      return `<h1>${(block as any).heading_1.rich_text.map((text: RichText) => text.plain_text).join('')}</h1>`;
    case 'heading_2':
      return `<h2>${(block as any).heading_2.rich_text.map((text: RichText) => text.plain_text).join('')}</h2>`;
    case 'heading_3':
      return `<h3>${(block as any).heading_3.rich_text.map((text: RichText) => text.plain_text).join('')}</h3>`;
    case 'bulleted_list_item':
      return `<li>${(block as any).bulleted_list_item.rich_text.map((text: RichText) => text.plain_text).join('')}</li>`;
    case 'numbered_list_item':
      return `<li>${(block as any).numbered_list_item.rich_text.map((text: RichText) => text.plain_text).join('')}</li>`;
    case 'quote':
      return `<blockquote>${(block as any).quote.rich_text.map((text: RichText) => text.plain_text).join('')}</blockquote>`;
    case 'code':
      return `<pre><code>${(block as any).code.rich_text.map((text: RichText) => text.plain_text).join('')}</code></pre>`;
    case 'divider':
      return '<hr>';
    default:
      return '';
  }
}

// Get child pages from the main Notion page
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: NOTION_PAGE_ID as string,
    });

    const posts: Post[] = [];
    let postCounter = 1;

    for (const block of response.results) {
      if ('type' in block && block.type === 'child_page' && 'child_page' in block) {
        const pageId = block.id;
        const title = (block as any).child_page.title;
        
        // Get page content
        const pageBlocks = await notion.blocks.children.list({
          block_id: pageId,
        });

        const content = pageBlocks.results
          .map(blockToHtml)
          .join('\n');

        // Create excerpt from first paragraph or first 150 characters
        const excerpt = content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

        posts.push({
          id: postCounter++,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          title: { rendered: title },
          content: { rendered: content },
          excerpt: { rendered: `<p>${excerpt}</p>` },
        });
      }
    }

    return posts;
  } catch (error) {
    console.error('Error fetching posts from Notion:', error);
    return [];
  }
}

// Get a specific post by slug
export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get all post slugs for static generation
export async function getAllPostSlugs() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}