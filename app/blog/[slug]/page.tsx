// app/blog/[slug]/page.tsx
import Header from '@/components/Header';

type BlogPostParams = Promise<{
  slug: string;
}>

async function getPost(slug: string) {
  // TODO: Fetch individual post from WordPress API using the slug
  // For now, return some dummy data
  return {
    title: `Post: ${slug}`,
    content: 'This is the content of the blog post. It will be fetched from WordPress.',
  };
}

// Generate static params for all blog posts
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // In a real app, you would fetch all post slugs from your CMS
  // For now, return some dummy slugs
  return [
    { slug: 'first-post' },
    { slug: 'second-post' },
    { slug: 'third-post' },
  ];
}

export default async function BlogPostPage({ 
  params
}: { 
  params: BlogPostParams;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

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