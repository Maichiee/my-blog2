import { createClient } from 'contentful';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID environment variable is not set');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN environment variable is not set');
}

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: {
    url: string;
    title: string;
  };
  author: {
    name: string;
    picture: {
      url: string;
    };
  };
  date: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries({
    content_type: 'post', // Changed from 'blogPost' to 'post'
    order: '-sys.createdAt', // Changed from '-fields.date' to '-sys.createdAt'
  });

  return entries.items.map((item: any) => ({
    title: item.fields.title || '',
    slug: item.fields.slug || '',
    content: item.fields.content || '',
    excerpt: item.fields.excerpt || '',
    coverImage: {
      url: item.fields.coverImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&auto=format&fit=crop',
      title: item.fields.coverImage?.fields?.title || 'Default Image',
    },
    author: {
      name: item.fields.author?.fields?.name || 'Anonymous',
      picture: {
        url: item.fields.author?.fields?.picture?.fields?.file?.url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop',
      },
    },
    date: item.sys.createdAt,
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = await client.getEntries({
    content_type: 'post', // Changed from 'blogPost' to 'post'
    'fields.slug': slug,
    limit: 1,
  });

  if (!entries.items.length) {
    return null;
  }

  const item = entries.items[0];
  return {
    title: item.fields.title || '',
    slug: item.fields.slug || '',
    content: item.fields.content || '',
    excerpt: item.fields.excerpt || '',
    coverImage: {
      url: item.fields.coverImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&auto=format&fit=crop',
      title: item.fields.coverImage?.fields?.title || 'Default Image',
    },
    author: {
      name: item.fields.author?.fields?.name || 'Anonymous',
      picture: {
        url: item.fields.author?.fields?.picture?.fields?.file?.url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop',
      },
    },
    date: item.sys.createdAt,
  };
}