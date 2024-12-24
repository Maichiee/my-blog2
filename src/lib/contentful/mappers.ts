import { Entry } from "contentful";
import { BlogPost } from "./types";
import { DEFAULT_AUTHOR, DEFAULT_COVER_IMAGE } from "./defaults";

export function mapEntryToBlogPost(item: Entry<any>): BlogPost {
  return {
    title: item.fields.title || "",
    slug: item.fields.slug || "",
    content: item.fields.content || "",
    excerpt: item.fields.excerpt || "",
    coverImage: {
      url: item.fields.coverImage?.fields?.file?.url || DEFAULT_COVER_IMAGE.url,
      title: item.fields.coverImage?.fields?.title || DEFAULT_COVER_IMAGE.title,
    },
    author: {
      name: item.fields.author?.fields?.name || DEFAULT_AUTHOR.name,
      picture: {
        url:
          item.fields.author?.fields?.picture?.fields?.file?.url ||
          DEFAULT_AUTHOR.picture.url,
      },
    },
    date: item.sys.createdAt,
  };
}
