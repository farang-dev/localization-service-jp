import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/notion.css';

import { Post } from '@/lib/types';

import { getPosts } from '@/lib/notion';

const BlogPage = async () => {
  const posts: Post[] = await getPosts();

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 pt-24">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900">Blog</span>
            </li>
          </ol>
        </nav>
        
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">Ship To Japan</span> Blog
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="border rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow min-h-[300px]">
                <Link href={`/blog/${post.slug}`}>
                  <h2 
                    className="text-2xl font-semibold mb-4 hover:underline leading-tight"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </Link>
                <div 
                  className="text-gray-600 text-base mb-6 flex-grow line-clamp-4 prose prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-ul:list-disc prose-ol:list-decimal notion-content"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium hover:underline self-start">
                   Read more →
                 </Link>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;