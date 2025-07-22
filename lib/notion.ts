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
  ChildPageBlockObjectResponse,
  ImageBlockObjectResponse,
  CalloutBlockObjectResponse,
  ToggleBlockObjectResponse,
  RichTextItemResponse
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
  href?: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
}

// Adapter function to convert RichTextItemResponse to RichText
function adaptRichTextArray(richTextArray: RichTextItemResponse[]): RichText[] {
  return richTextArray.map(item => ({
    plain_text: item.plain_text,
    href: item.href || undefined, // Convert null to undefined
    annotations: item.annotations
  }));
}

// Process rich text to HTML with formatting
function processRichText(richTextArray: RichText[]): string {
  return richTextArray.map((text: RichText) => {
    let content = text.plain_text;
    
    // Apply text annotations (formatting)
    if (text.annotations) {
      if (text.annotations.code) {
        content = `<code>${content}</code>`;
      }
      if (text.annotations.bold) {
        content = `<strong>${content}</strong>`;
      }
      if (text.annotations.italic) {
        content = `<em>${content}</em>`;
      }
      if (text.annotations.strikethrough) {
        content = `<del>${content}</del>`;
      }
      if (text.annotations.underline) {
        content = `<u>${content}</u>`;
      }
    }
    
    // Apply link if present
    if (text.href) {
      content = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${content}</a>`;
    }
    
    return content;
  }).join('');
}

// Convert Notion block to HTML-like content with async support for nested blocks
async function blockToHtmlAsync(block: BlockObjectResponse | PartialBlockObjectResponse): Promise<string> {
  if (!('type' in block)) return '';
  
  const { type } = block;
  
  switch (type) {
    case 'paragraph':
      return `<p>${processRichText(adaptRichTextArray((block as ParagraphBlockObjectResponse).paragraph.rich_text))}</p>`;
    case 'heading_1':
      return `<h1>${processRichText(adaptRichTextArray((block as Heading1BlockObjectResponse).heading_1.rich_text))}</h1>`;
    case 'heading_2':
      return `<h2>${processRichText(adaptRichTextArray((block as Heading2BlockObjectResponse).heading_2.rich_text))}</h2>`;
    case 'heading_3':
      return `<h3>${processRichText(adaptRichTextArray((block as Heading3BlockObjectResponse).heading_3.rich_text))}</h3>`;
    case 'bulleted_list_item':
      return `<li>${processRichText(adaptRichTextArray((block as BulletedListItemBlockObjectResponse).bulleted_list_item.rich_text))}</li>`;
    case 'numbered_list_item':
      return `<li>${processRichText(adaptRichTextArray((block as NumberedListItemBlockObjectResponse).numbered_list_item.rich_text))}</li>`;
    case 'quote':
      return `<blockquote>${processRichText(adaptRichTextArray((block as QuoteBlockObjectResponse).quote.rich_text))}</blockquote>`;
    case 'code':
      const codeBlock = block as CodeBlockObjectResponse;
      const language = codeBlock.code.language || '';
      return `<pre><code class="language-${language}">${processRichText(adaptRichTextArray(codeBlock.code.rich_text))}</code></pre>`;
    case 'divider':
      return '<hr>';
    case 'image':
      const imageBlock = block as ImageBlockObjectResponse;
      let imageUrl = '';
      let altText = 'Image';
      
      // Handle different image types
      if (imageBlock.image.type === 'external') {
        imageUrl = imageBlock.image.external.url;
      } else if (imageBlock.image.type === 'file') {
        imageUrl = imageBlock.image.file.url;
      }
      
      // Get caption if available
      if (imageBlock.image.caption && imageBlock.image.caption.length > 0) {
        altText = imageBlock.image.caption.map(text => text.plain_text).join('');
      }
      
      return `<figure class="notion-image"><img src="${imageUrl}" alt="${altText}" />${
        imageBlock.image.caption && imageBlock.image.caption.length > 0 
          ? `<figcaption>${processRichText(adaptRichTextArray(imageBlock.image.caption))}</figcaption>` 
          : ''
      }</figure>`;
    case 'callout':
      const calloutBlock = block as CalloutBlockObjectResponse;
      return `<div class="notion-callout">
        ${calloutBlock.callout.icon?.type === 'emoji' ? `<div class="notion-callout-icon">${calloutBlock.callout.icon.emoji}</div>` : ''}
        <div class="notion-callout-text">${processRichText(adaptRichTextArray(calloutBlock.callout.rich_text))}</div>
      </div>`;
    case 'toggle':
      const toggleBlock = block as ToggleBlockObjectResponse;
      
      // Fetch toggle children
      try {
        const toggleChildren = await notion.blocks.children.list({
          block_id: block.id,
        });
        
        // Process toggle children
        let toggleContent = '';
        let inBulletedList = false;
        let inNumberedList = false;
        
        for (let i = 0; i < toggleChildren.results.length; i++) {
          const currentBlock = toggleChildren.results[i];
          const nextBlock = i < toggleChildren.results.length - 1 ? toggleChildren.results[i + 1] : null;
          
          if ('type' in currentBlock) {
            // Handle list opening tags
            if (currentBlock.type === 'bulleted_list_item' && !inBulletedList) {
              toggleContent += '<ul>';
              inBulletedList = true;
            } else if (currentBlock.type === 'numbered_list_item' && !inNumberedList) {
              toggleContent += '<ol>';
              inNumberedList = true;
            }
            
            // Add the block content
            toggleContent += await blockToHtmlAsync(currentBlock);
            
            // Handle list closing tags
            if (inBulletedList && (!nextBlock || !('type' in nextBlock) || nextBlock.type !== 'bulleted_list_item')) {
              toggleContent += '</ul>';
              inBulletedList = false;
            } else if (inNumberedList && (!nextBlock || !('type' in nextBlock) || nextBlock.type !== 'numbered_list_item')) {
              toggleContent += '</ol>';
              inNumberedList = false;
            }
          }
        }
        
        return `<details class="notion-toggle">
          <summary>${processRichText(adaptRichTextArray(toggleBlock.toggle.rich_text))}</summary>
          <div class="notion-toggle-content">${toggleContent}</div>
        </details>`;
      } catch (error) {
        console.error(`Error fetching toggle children for block ${block.id}:`, error);
        return `<details class="notion-toggle">
          <summary>${processRichText(adaptRichTextArray(toggleBlock.toggle.rich_text))}</summary>
          <div class="notion-toggle-content">Error loading toggle content</div>
        </details>`;
      }
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

    // Process blocks with proper list handling
    let content = '';
    let inBulletedList = false;
    let inNumberedList = false;
    
    for (let i = 0; i < pageBlocks.results.length; i++) {
      const currentBlock = pageBlocks.results[i];
      const nextBlock = i < pageBlocks.results.length - 1 ? pageBlocks.results[i + 1] : null;
      
      if ('type' in currentBlock) {
        // Handle list opening tags
        if (currentBlock.type === 'bulleted_list_item' && !inBulletedList) {
          content += '<ul>';
          inBulletedList = true;
        } else if (currentBlock.type === 'numbered_list_item' && !inNumberedList) {
          content += '<ol>';
          inNumberedList = true;
        }
        
        // Add the block content - use async version for nested content support
        content += await blockToHtmlAsync(currentBlock);
        
        // Handle list closing tags
        if (inBulletedList && (!nextBlock || !('type' in nextBlock) || nextBlock.type !== 'bulleted_list_item')) {
          content += '</ul>';
          inBulletedList = false;
        } else if (inNumberedList && (!nextBlock || !('type' in nextBlock) || nextBlock.type !== 'numbered_list_item')) {
          content += '</ol>';
          inNumberedList = false;
        }
      }
    }

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