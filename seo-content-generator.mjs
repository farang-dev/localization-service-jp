// seo-content-generator.mjs
import axios from 'axios';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config({ path: '.env.local' });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const YOUR_SITE_NAME = process.env.YOUR_SITE_NAME || 'Your Website'; // Optional: Or your specific site name
const LLM_MODEL = process.env.LLM_MODEL || 'google/gemma-3n-e4b-it:free';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function generateSeoArticle(topic, keywords = []) {
  if (!OPENROUTER_API_KEY) {
    console.error('Error: OPENROUTER_API_KEY is not set in .env.local');
    return null;
  }

  console.log(`Generating SEO article for topic: "${topic}" using model ${LLM_MODEL}...`);
  let promptContent = `You are an expert SEO content writer specializing in B2B services, particularly for Japanese market entry and localization. Please write an engaging and SEO-friendly blog post about "${topic}".
  The target audience is businesses looking for Japanese localization services. 
  The article should be informative, well-structured with clear headings (H2, H3), and around 500-800 words.
  Naturally incorporate the following keywords if provided and relevant: ${keywords.join(', ')}.
  The tone should be professional yet approachable.
  Include a brief introduction, several body paragraphs discussing key aspects of the topic, and a conclusion with a subtle call to action related to seeking expert Japanese localization help.
  Ensure the content is original and provides value to the reader.
  Format the output in Markdown.
  Do not include a H1 title, as that will be the topic itself. Start directly with the content.`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: LLM_MODEL,
        messages: [
          { role: 'user', content: promptContent }
        ]
      },

      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': `${YOUR_SITE_NAME}`,
          'X-Title': `${YOUR_SITE_NAME}`
        }
      }
    );

    if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message && response.data.choices[0].message.content) {
      console.log('Article generated successfully!');
      return response.data.choices[0].message.content.trim();
    } else {
      console.error('Error: Unexpected response structure from OpenRouter API:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error generating article with AI:', error.response ? error.response.data : error.message);
    return null;
  }
}

async function main() {
  console.log('SEO Content Generator for Japanese Localization Services');
  console.log('Using LLM Model:', LLM_MODEL);
  console.log('---');

  rl.question('Enter the main topic for the SEO article: ', async (topic) => {
    if (!topic.trim()) {
      console.log('Topic cannot be empty. Exiting.');
      rl.close();
      return;
    }

    rl.question('Enter comma-separated keywords (optional, press Enter to skip): ', async (keywordsInput) => {
      const keywords = keywordsInput.split(',').map(k => k.trim()).filter(k => k);
      
      const articleContent = await generateSeoArticle(topic.trim(), keywords);

      if (articleContent) {
        console.log('\n--- Generated SEO Article ---');
        console.log(`Topic: ${topic.trim()}\n`);
        console.log(articleContent);
        console.log('\n--- End of Article ---');
        // Here you could add functionality to save the article to a file
        // e.g., fs.writeFileSync(`${topic.trim().toLowerCase().replace(/\s+/g, '-')}.md`, articleContent);
      } else {
        console.log('Failed to generate article.');
      }
      rl.close();
    });
  });
}

main().catch(err => {
  console.error('Unhandled error in main function:', err);
  rl.close();
});