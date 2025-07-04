import axios from 'axios';

export default async function handler(req, res) {
  console.log('API request received');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { WORDPRESS_API_URL, WORDPRESS_USER, WORDPRESS_APP_PASSWORD } = process.env;
  const postsUrl = `${WORDPRESS_API_URL}/posts`;

  console.log(`Fetching posts from: ${postsUrl}`);

  try {
    const response = await axios.get(postsUrl, {
      auth: {
        username: WORDPRESS_USER,
        password: WORDPRESS_APP_PASSWORD,
      },
    });

    console.log('Successfully fetched posts from WordPress API.');
    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching from WordPress:', {
        message: error.message,
        url: error.config.url,
        method: error.config.method,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    } else {
      console.error('Generic error fetching from WordPress:', error);
    }
    res.status(500).json({ error: 'Failed to fetch posts from WordPress' });
  }
}