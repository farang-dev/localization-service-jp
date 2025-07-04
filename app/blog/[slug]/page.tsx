import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Post } from '@/lib/types';

import { getPost, getAllPostSlugs } from '@/lib/wordpress';

export async function generateStaticParams() {
  const allPosts = await getAllPostSlugs();
  return allPosts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <article>
          <h1 
            className="text-4xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div 
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}