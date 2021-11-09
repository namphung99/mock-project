export interface ArticlePost {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }
}

export interface ArticleGet {
  slug: string,
  title: string,
  description: string,
  body: string,
  createdAt: string,
  updatedAt: string,
  tagList: [
    string[]
  ],
  favorited: false,
  favoritesCount: number,
  author: {
    username: string,
    image: string,
    following: false
  }
}