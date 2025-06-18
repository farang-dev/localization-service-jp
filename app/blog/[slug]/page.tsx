// app/blog/[slug]/page.tsx
import Header from '@/components/Header';

async function getPost(slug: string) {
  // TODO: Fetch individual post from WordPress API using the slug
  // For now, return some dummy data
  return {
    title: `Post: ${slug}`,
    content: 'This is the content of the blog post. It will be fetched from WordPress.',
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
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