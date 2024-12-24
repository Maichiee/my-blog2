import { contentfulClient } from './client';
import { BlogPost } from './types';
import { mapEntryToBlogPost } from './mappers';

export async function getAllPosts(): Promise<BlogPost[]> {
  const entries = await contentfulClient.getEntries({
    content_type: 'blog3',
    order: '-sys.createdAt',
  });

  return entries.items.map(mapEntryToBlogPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = await contentfulClient.getEntries({
    content_type: 'blog3',
    'fields.slug': slug,
    limit: 1,
  });

  if (!entries.items.length) {
    return null;
  }

  return mapEntryToBlogPost(entries.items[0]);
}