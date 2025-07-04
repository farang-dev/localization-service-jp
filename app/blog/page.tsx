import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Post } from '@/lib/types';

import { getPosts } from '@/lib/wordpress';

const BlogPage = async () => {
  const posts: Post[] = await getPosts();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="border rounded-lg p-4 flex flex-col">
                <a href={`/blog/${post.slug}`} rel="noopener noreferrer">
                  <h2 
                    className="text-xl font-semibold mb-2 hover:underline"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </a>
                <div 
                  className="text-gray-600 text-sm mb-4 flex-grow"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <a href={`/blog/${post.slug}`} className="text-blue-500 hover:underline self-end">
                  Read more
                </a>
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