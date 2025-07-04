import { Post } from './types';

const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const res = await fetch(`${API_URL}/${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json;
}

export async function getPosts(): Promise<Post[]> {
  const data = await fetchAPI('posts', {});
  return data;
}

export async function getPost(slug: string): Promise<Post> {
  const data = await fetchAPI(`posts?slug=${slug}`, {});
  return data[0];
}

export async function getAllPostSlugs() {
  const data = await fetchAPI('posts?_fields=slug', {});
  return data;
}