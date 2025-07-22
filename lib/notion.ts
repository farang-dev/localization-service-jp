import { Client } from '@notionhq/client';
import { Post } from './types';
import type { 
  BlockObjectResponse, 
  PartialBlockObjectResponse,
  ParagraphBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  QuoteBlockObjectResponse,
  CodeBlockObjectResponse,
  ChildPageBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

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
      return `<p>${(block as ParagraphBlockObjectResponse).paragraph.rich_text.map((text: RichText) => text.plain_text).join('')}</p>`;
    case 'heading_1':
      return `<h1>${(block as Heading1BlockObjectResponse).heading_1.rich_text.map((text: RichText) => text.plain_text).join('')}</h1>`;
    case 'heading_2':
      return `<h2>${(block as Heading2BlockObjectResponse).heading_2.rich_text.map((text: RichText) => text.plain_text).join('')}</h2>`;
    case 'heading_3':
      return `<h3>${(block as Heading3BlockObjectResponse).heading_3.rich_text.map((text: RichText) => text.plain_text).join('')}</h3>`;
    case 'bulleted_list_item':
      return `<li>${(block as BulletedListItemBlockObjectResponse).bulleted_list_item.rich_text.map((text: RichText) => text.plain_text).join('')}</li>`;
    case 'numbered_list_item':
      return `<li>${(block as NumberedListItemBlockObjectResponse).numbered_list_item.rich_text.map((text: RichText) => text.plain_text).join('')}</li>`;
    case 'quote':
      return `<blockquote>${(block as QuoteBlockObjectResponse).quote.rich_text.map((text: RichText) => text.plain_text).join('')}</blockquote>`;
    case 'code':
      return `<pre><code>${(block as CodeBlockObjectResponse).code.rich_text.map((text: RichText) => text.plain_text).join('')}</code></pre>`;
    case 'divider':
      return '<hr>';
    default:
      return '';
  }
}

// Helper function to process a child page block
async function processChildPage(block: ChildPageBlockObjectResponse, postCounter: number): Promise<Post | null> {
  try {
    const pageId = block.id;
    const title = block.child_page.title;
    
    // Get page content
    const pageBlocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    const content = pageBlocks.results
      .map(blockToHtml)
      .join('\n');

    // Create excerpt from first paragraph or first 150 characters
    const excerpt = content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

    return {
      id: postCounter,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: { rendered: title },
      content: { rendered: content },
      excerpt: { rendered: `<p>${excerpt}</p>` },
    };
  } catch (pageError) {
    console.error(`Error processing page ${block.id}:`, pageError);
    return null;
  }
}

// Get child pages from the main Notion page
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: NOTION_PAGE_ID as string,
      page_size: 100,
    });

    const posts: Post[] = [];
    let postCounter = 1;

    // Process child pages
    for (const block of response.results) {
      if ('type' in block && block.type === 'child_page') {
        const typedBlock = block as ChildPageBlockObjectResponse;
        const post = await processChildPage(typedBlock, postCounter++);
        if (post) {
          posts.push(post);
        }
      }
    }

    // Handle pagination if needed
    if (response.has_more && response.next_cursor) {
      const nextResponse = await notion.blocks.children.list({
        block_id: NOTION_PAGE_ID as string,
        start_cursor: response.next_cursor,
        page_size: 100,
      });
      
      for (const block of nextResponse.results) {
        if ('type' in block && block.type === 'child_page') {
          const typedBlock = block as ChildPageBlockObjectResponse;
          const post = await processChildPage(typedBlock, postCounter++);
          if (post) {
            posts.push(post);
          }
        }
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