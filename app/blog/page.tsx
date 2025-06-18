// app/blog/page.tsx
import Link from 'next/link';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Post {
  slug: string;
  title: string;
  excerpt: string; // Added for card content
}

async function getPosts(): Promise<Post[]> {
  // TODO: Fetch posts from WordPress API
  // Remember to include excerpt in your API response
  console.log('Fetching posts from:', process.env.WORDPRESS_API_URL);
  console.log('Using Client ID:', process.env.WORDPRESS_CLIENT_ID);
  // IMPORTANT: Never log Client Secret in production or shared logs
  // console.log('Using Client Secret:', process.env.WORDPRESS_CLIENT_SECRET);

  // For now, return some dummy data
  return [
    { slug: 'first-post', title: 'My First Blog Post', excerpt: 'This is a short summary of the first blog post...' },
    { slug: 'second-post', title: 'Another Interesting Article', excerpt: 'A brief look into another fascinating topic discussed in this article.' },
    { slug: 'third-post', title: 'Exploring New Horizons', excerpt: 'Discover the latest advancements and explorations in this exciting field.' },
  ];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 pt-24">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Blog</h1>
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No blog posts found. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground mb-4">
                  {post.excerpt}
                </CardDescription>
                <Link href={`/blog/${post.slug}`} className="text-sm text-primary hover:underline font-medium">
                  Read More &rarr;
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    </>
  );
}