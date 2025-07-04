import dotenv from 'dotenv';
import axios from 'axios';

import wordpress from 'wordpress';

dotenv.config({ path: '.env.local' });



// Delay function to prevent rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to generate blog topics using OpenRouter API
async function generateTopics() {
  console.log('Generating 5 SEO-friendly blog topics...');
  const prompt = `Generate 5 SEO-friendly blog topics for a SaaS company that helps businesses launch in Japan. The topics should be relevant to market entry, localization, business culture, and digital marketing in Japan.`;
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-small-3.2-24b-instruct',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const topics = response.data.choices[0].message.content.trim().split('\n').filter(Boolean);
    console.log('Generated Topics:', topics);
    return topics;
  } catch (error) {
    console.error('Error generating topics:', error.response ? error.response.data : error.message);
    return [];
  }
}

// Function to generate a blog article using OpenRouter API
async function generateArticle(topic) {
  console.log(`Generating article for topic: "${topic}"...`);
  const prompt = `Generate a detailed, SEO-friendly blog article in HTML format, between 800-1200 words, on the topic: "${topic}". Ensure the article is well-structured with appropriate HTML tags (e.g., <p>, <h2>, <h3>, <ul>, <ol>, <strong>, <em>) and includes an engaging introduction, several body paragraphs, and a concise conclusion. The content should be informative and engaging for businesses looking to launch SaaS in Japan.`;
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-small-3.2-24b-instruct',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const articleContent = response.data.choices[0].message.content.trim();
    console.log(`Article for "${topic}" generated.`);
    return articleContent;
  } catch (error) {
    console.error('Error generating article:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Function to post the article to WordPress using WP-API
async function postArticle(title, content) {
  console.log(`Posting article "${title}" to WordPress using XML-RPC...`);
  try {
    const client = wordpress.createClient({
      url: process.env.WORDPRESS_API_URL, // Ensure this is the base URL of your WordPress site, e.g., https://your-blog.wordpress.com
      username: process.env.WORDPRESS_USER,
      password: process.env.WORDPRESS_APP_PASSWORD,
    });

    const postId = await new Promise((resolve, reject) => {
      client.newPost({
        title: title,
        content: content,
        status: 'publish',
      }, (error, id) => {
        if (error) {
          reject(error);
        } else {
          resolve(id);
        }
      });
    });

    console.log(`Article "${title}" posted successfully! Post ID: ${postId}`);
    return postId;
  } catch (error) {
    console.error('Error posting article to WordPress via XML-RPC:', error.message);
    return null;
  }
}

// Function to delete an article from WordPress
async function deletePost(postId) {
  console.log(`Deleting post with ID: ${postId} using XML-RPC...`);
  try {
    const client = wordpress.createClient({
      url: process.env.WORDPRESS_API_URL,
      username: process.env.WORDPRESS_USER,
      password: process.env.WORDPRESS_APP_PASSWORD,
    });

    await new Promise((resolve, reject) => {
      client.deletePost(postId, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    console.log(`Post with ID: ${postId} deleted successfully.`);
    return true;
  } catch (error) {
    console.error('Error deleting post from WordPress via XML-RPC:', error.message);
    return false;
  }
}

// Function to test WordPress connection and posting
  async function testWordPressConnection() {
    console.log('Testing WordPress connection using XML-RPC...');
    const apiUrl = process.env.WORDPRESS_API_URL; // This should be the base URL of your WordPress site, e.g., https://your-blog.wordpress.com
    console.log(`Attempting to connect to: ${apiUrl}`);
    console.log(`Using WordPress User: ${process.env.WORDPRESS_USER}`);
    try {
      const client = wordpress.createClient({
        url: apiUrl,
        username: process.env.WORDPRESS_USER,
        password: process.env.WORDPRESS_APP_PASSWORD,
      });

      // Attempt to get user blogs to verify connection
      await new Promise((resolve, reject) => {
        client.getPosts((error, posts) => {
          if (error) {
            reject(error);
          } else {
            console.log('Successfully connected to WordPress via XML-RPC. Found posts:', posts.length);
            resolve();
          }
        });
      });
      console.log('WordPress connection successful!');
      return true;
    } catch (error) {
      console.error('Error testing WordPress connection via XML-RPC:', error.message);
      console.error('WordPress connection failed. Aborting blog automation.');
      return false;
    }
  }

// Main function to automate blog creation and posting
async function automateBlogCreation() {
  console.log('Starting blog automation process...');

  if (!process.env.OPENROUTER_API_KEY || !process.env.WORDPRESS_API_URL || !process.env.WORDPRESS_USER || !process.env.WORDPRESS_APP_PASSWORD) {
    console.error('Error: Missing one or more environment variables. Please ensure OPENROUTER_API_KEY, WORDPRESS_API_URL, WORDPRESS_USER, and WORDPRESS_APP_PASSWORD are set.');
    return;
  }

  // First, test WordPress connection
  const isWordPressConnected = await testWordPressConnection();
  if (!isWordPressConnected) {
    console.error('WordPress connection failed. Aborting blog automation.');
    return;
  }

  // Test posting a dummy article
  console.log('Attempting to post a test article...');
  const testArticleTitle = 'Test Article from Automation Script';
  const testArticleContent = '<p>This is a test article posted by the automation script to verify WordPress posting functionality.</p>';
  const testPostId = await postArticle(testArticleTitle, testArticleContent);

  if (!testPostId) {
    console.error('Test article posting failed. Aborting blog automation.');
    return;
  }
  console.log(`Test article posted successfully with ID: ${testPostId}.`);
  // Delete the test post after successful verification
  const isDeleted = await deletePost(testPostId);
  if (!isDeleted) {
    console.error('Failed to delete test article. Aborting blog automation.');
    return;
  }


  const topics = await generateTopics();

  if (topics.length === 0) {
    console.log('No topics generated. Exiting.');
    return;
  }

  for (const topic of topics) {
    const articleContent = await generateArticle(topic);
    if (articleContent) {
      // Extract a title from the topic, or use the topic directly
      const articleTitle = topic.replace(/^[0-9]\.\s*/, '').trim(); // Remove numbering like '1. '
      await postArticle(articleTitle, articleContent);
      await delay(5000); // Delay to avoid rate limits
    }
  }
  console.log('Blog automation process completed.');
}

// Run the automation
automateBlogCreation();