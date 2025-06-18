// app/blog/[slug]/page.tsx
import Header from '@/components/Header';
import { Metadata } from 'next';

interface BlogPostParams {
  slug: string;
}

interface BlogPostProps {
  params: BlogPostParams;
}

async function getPost(slug: string) {
  // TODO: Fetch individual post from WordPress API using the slug
  // For now, return some dummy data
  return {
    title: `Post: ${slug}`,
    content: 'This is the content of the blog post. It will be fetched from WordPress.',
  };
}

// Generate static params for all blog posts
export async function generateStaticParams(): Promise<BlogPostParams[]> {
  // In a real app, you would fetch all post slugs from your CMS
  // For now, return some dummy slugs
  return [
    { slug: 'first-post' },
    { slug: 'second-post' },
    { slug: 'third-post' },
  ];
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const post = await getPost(params.slug);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
    </>
  );
}