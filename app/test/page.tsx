import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/notion.css';

export default function TestPage() {
  const testContent = `
    <h1>Test Heading 1</h1>
    <p>This is a paragraph after heading 1.</p>
    
    <h2>Test Heading 2</h2>
    <p>This is a paragraph after heading 2.</p>
    
    <h3>Test Heading 3</h3>
    <p>This is a paragraph after heading 3.</p>
    
    <h2>Lists</h2>
    <h3>Bullet Points</h3>
    <ul>
      <li>Bullet point 1</li>
      <li>Bullet point 2</li>
      <li>Bullet point with <strong>bold</strong> and <em>italic</em> text</li>
      <li>Bullet point with nested list
        <ul>
          <li>Nested bullet 1</li>
          <li>Nested bullet 2</li>
        </ul>
      </li>
    </ul>
    
    <h3>Numbered Lists</h3>
    <ol>
      <li>Numbered item 1</li>
      <li>Numbered item 2</li>
      <li>Numbered item with <strong>bold</strong> and <em>italic</em> text</li>
      <li>Numbered item with nested list
        <ol>
          <li>Nested numbered 1</li>
          <li>Nested numbered 2</li>
        </ol>
      </li>
    </ol>
    
    <h2>Quotes and Code</h2>
    <blockquote>This is a quote block with <strong>bold</strong> and <em>italic</em> text</blockquote>
    
    <p>This is a paragraph with <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strikethrough</s>, and <code>inline code</code> formatting.</p>
    
    <pre><code class="language-javascript">// This is a code block
function hello() {
  console.log("Hello, world!");
}
</code></pre>
    
    <h2>Callouts and Toggles</h2>
    <div class="notion-callout">
      <div class="notion-callout-icon">💡</div>
      <div class="notion-callout-text">This is a callout with an emoji icon</div>
    </div>
    
    <details class="notion-toggle">
      <summary>Click to expand toggle</summary>
      <div class="notion-toggle-content">
        <p>This is the content inside a toggle block.</p>
        <ul>
          <li>You can have lists inside toggles</li>
          <li>And other formatting</li>
        </ul>
      </div>
    </details>
    
    <h2>Dividers and Images</h2>
    <hr>
    
    <figure class="notion-image">
      <img src="https://via.placeholder.com/800x400" alt="Placeholder image">
      <figcaption>This is an image caption</figcaption>
    </figure>
  `;

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-8">Test Page for Notion Styling</h1>
        <div 
          className="prose prose-headings:font-bold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-ul:list-disc prose-ol:list-decimal notion-content"
          dangerouslySetInnerHTML={{ __html: testContent }}
        />
      </main>
      <Footer />
    </>
  );
}