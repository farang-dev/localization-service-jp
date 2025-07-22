# Notion Integration Setup

This project now uses Notion as a headless CMS for the blog. Follow these steps to set it up:

## 1. Create a Notion Integration

1. Go to [Notion Developers](https://www.notion.so/my-integrations)
2. Click "+ New integration"
3. Give it a name (e.g., "Blog CMS")
4. Select the workspace where your blog content will be
5. Click "Submit"
6. Copy the "Internal Integration Token" - this is your `NOTION_TOKEN`

## 2. Create a Notion Page for Your Blog

1. Create a new page in Notion that will serve as your blog container
2. This page will contain child pages, where each child page represents a blog post
3. Copy the page ID from the URL:
   - URL format: `https://www.notion.so/Your-Page-Title-{PAGE_ID}`
   - The PAGE_ID is the long string after the last dash
   - Example: if URL is `https://www.notion.so/My-Blog-123abc456def789`, then PAGE_ID is `123abc456def789`

## 3. Share the Page with Your Integration

1. Open your blog container page in Notion
2. Click "Share" in the top right
3. Click "Invite" and search for your integration name
4. Select your integration and give it "Can edit" permissions
5. Click "Invite"

## 4. Update Environment Variables

Update your `.env.local` file with:

```
NOTION_TOKEN=your_actual_integration_token
NOTION_PAGE_ID=your_actual_page_id
```

## 5. Create Blog Posts

1. In your blog container page, create child pages
2. Each child page will become a blog post
3. The page title becomes the blog post title
4. The page content becomes the blog post content
5. Supported content types:
   - Paragraphs
   - Headings (H1, H2, H3)
   - Bullet lists
   - Numbered lists
   - Quotes
   - Code blocks
   - Dividers

## 6. Test the Integration

Run your development server:

```bash
npm run dev
```

Visit `/blog` to see your Notion pages displayed as blog posts.

## Notes

- The blog post URL slug is automatically generated from the page title
- The excerpt is automatically created from the first 150 characters of content
- Make sure your Notion integration has access to the page and all child pages
- Changes in Notion will be reflected immediately (no caching implemented)