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

**IMPORTANT: New pages must be added as child pages (sub-pages) under your main blog container page.**

### How to Add a New Blog Post:

1. **Open your main blog container page** (the one with the PAGE_ID you configured)
2. **Inside this page**, click the "+" button or type "/page" to create a new page
3. **Give the page a title** - this becomes your blog post title
4. **Add content** to the page - this becomes your blog post content
5. **Make sure the page appears as a sub-page** under your main container page

### Verification Steps:

- Your main blog page should show the new pages as indented sub-pages
- The URL structure should be: `notion.so/Main-Blog-Page-ID/New-Post-Title-ID`
- If you see your new page at the same level as the main blog page, it's NOT a child page

### Supported Content Types:
   - Paragraphs
   - Headings (H1, H2, H3)
   - Bullet lists
   - Numbered lists
   - Quotes
   - Code blocks
   - Dividers

### Troubleshooting:

- **New posts not showing?** Make sure they are child pages, not sibling pages
- **Permission errors?** Re-share the main page with your integration
- **Still not working?** Check the server logs for detailed error messages

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