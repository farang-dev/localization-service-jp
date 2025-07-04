// blog-scraper.mjs
import axios from 'axios';
import * as cheerio from 'cheerio';
import { marked } from 'marked';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure dotenv to load .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_BLOG_URL = "https://nihonium.io/blog/";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'google/gemma-3n-e4b-it:free'; // User specified, or from .env, or default

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;
const WORDPRESS_USER = process.env.WORDPRESS_USER;
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

const wordpressEnabled = WORDPRESS_API_URL && WORDPRESS_USER && WORDPRESS_APP_PASSWORD;

console.log(`WordPress Enabled: ${wordpressEnabled}`);
if (wordpressEnabled) {
    console.log(`WordPress URL: ${WORDPRESS_API_URL}`);
    console.log(`WordPress User: ${WORDPRESS_USER}`);
    console.log(`WordPress App Password: ${WORDPRESS_APP_PASSWORD ? '********' : 'Not Set'}`);
} else {
    console.log("WordPress credentials not fully configured. Will save to local JSON.");
}

if (!OPENROUTER_API_KEY) {
    console.error("Error: OPENROUTER_API_KEY is not set in .env.local. AI rewriting will fail.");
}

// --- Helper Functions ---

/**
 * Fetches HTML content from a URL.
 * @param {string} url - The URL to fetch.
 * @returns {Promise<string|null>} HTML content or null on error.
 */


async function discoverArticleLinks(url) {
    try {
        console.log(`Discovering article links from: ${url}`);
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const links = [];
        $('div.loop__item h3.entry-title a').each((i, element) => {
            const link = $(element).attr('href');
            if (link) {
                links.push(link);
            }
        });
        return [...new Set(links)];
    } catch (error) {
        console.error('Error discovering article links:', error);
        return [];
    }
}

async function extractArticleContent(url) {
    try {
        console.log(`Extracting content from: ${url}`);
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $('h1').text();
        const content = $('div.entry-content').html();
        return { title, content };
    } catch (error) {
        console.error(`Error extracting content from ${url}:`, error);
        return null;
    }
}

/**
 * Rewrites content using OpenRouter AI.
 * @param {string} title - The article title.
 * @param {string} textContent - The text content to rewrite.
 * @returns {Promise<string|null>} Rewritten content in Markdown or null.
 */
async function rewriteWithAi(title, textContent) {
    if (!OPENROUTER_API_KEY) {
        console.warn("OPENROUTER_API_KEY not set. Skipping AI rewrite.");
        return `## ${title}\n\n${textContent}`; // Fallback to original if API key is missing
    }
    console.log(`Rewriting content for "${title}" using ${OPENROUTER_MODEL}...`);

    const prompt = `Please rewrite the following blog post content. Enhance its formatting and readability for a blog. The output MUST be in well-structured Markdown format. Make it engaging and SEO-friendly. Ensure all code blocks are properly formatted in Markdown. Do not include any preamble or introductory text, just the rewritten Markdown content itself.

Original Title: ${title}
Original Content:\n${textContent}

Rewritten Content (Markdown):`;

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: OPENROUTER_MODEL,
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
            return response.data.choices[0].message.content.trim();
        }
        console.error('Error: AI response format unexpected.', response.data);
        return null;
    } catch (error) {
        console.error(`Error during AI rewrite: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
        return null;
    }
}

/**
 * Posts an article to WordPress.
 * @param {Object} articleData - Article data including title and HTML content.
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
async function postToWordPress(articleData) {
    if (!wordpressEnabled) {
        console.log("WordPress posting is disabled or not configured.");
        return;
    }
    console.log(`Posting "${articleData.title}" to WordPress...`);

    const credentials = Buffer.from(`${WORDPRESS_USER}:${WORDPRESS_APP_PASSWORD}`).toString('base64');
    const endpoint = `${WORDPRESS_API_URL.replace(/\/$/, '')}/wp-json/wp/v2/posts`;

    const payload = {
        title: articleData.title,
        content: articleData.htmlContent, // Expecting HTML content here
        status: 'publish', // or 'draft'
    };

    try {
        const response = await axios.post(endpoint, payload, {
            headers: {
                'Authorization': `Basic ${credentials}`,
            },
        });
        console.log(`Article "${articleData.title}" posted successfully to WordPress. URL: ${response.data.link}`);
    } catch (error) {
        console.error(`Error posting to WordPress: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
}

/**
 * Saves article data to a local JSON file.
 * @param {Object} articleData - The article data to save.
 */


// --- Main Execution ---
async function main() {
    console.log('Starting blog scraper...');
    try {
        const articleLinks = await discoverArticleLinks(SOURCE_BLOG_URL);

        if (!articleLinks || articleLinks.length === 0) {
            console.log("No articles found to process.");
            return;
        }

        console.log(`Processing ${Math.min(2, articleLinks.length)} articles out of ${articleLinks.length} found...`);

        for (const link of articleLinks.slice(0, 2)) {
            const extractedData = await extractArticleContent(link);
                if (!extractedData) continue;

            let rewrittenMarkdown = await rewriteWithAi(extractedData.title, extractedData.content);
            if (!rewrittenMarkdown) {
                console.warn(`AI rewriting failed for "${extractedData.title}". Using original content.`);
                rewrittenMarkdown = `# ${extractedData.title}\n\n${extractedData.content}`;
            }

            const htmlContent = marked(rewrittenMarkdown);

            const finalArticleData = {
                title: extractedData.title,
                originalUrl: link,
                publicationDate: new Date().toISOString(),
                rawTextContent: extractedData.content,
                contentMarkdown: rewrittenMarkdown,
                htmlContent,
                scrapedDate: new Date().toISOString(),
            };

            if (wordpressEnabled) {
                await postToWordPress(finalArticleData);
            }

            console.log('---');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    } catch (error) {
        console.error('Unhandled error in main execution:', error);
    } finally {
        console.log('Blog scraping process finished.');
    }
}

main().catch(error => {
    console.error("Unhandled error in main execution:", error);
});