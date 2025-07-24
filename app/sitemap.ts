import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL of your website
  const baseUrl = 'https://shiptojapan.com';
  
  // Get all blog post slugs
  const blogPosts = await getAllPostSlugs();
  
  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/test`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
  
  // Dynamic routes for blog posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));
  
  return [...routes, ...blogRoutes];
}