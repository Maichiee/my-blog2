export interface Author {
    name: string;
    picture: {
      url: string;
    };
  }
  
  export interface CoverImage {
    url: string;
    title: string;
  }
  
  export interface BlogPost {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: CoverImage;
    author: Author;
    date: string;
  }