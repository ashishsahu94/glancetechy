import { CoverArt } from "./types";


export type BlogPost = {
 id: string;
  createdAt: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  art: CoverArt;
  image: string;
  content: string[];
};


export type BlogResponse = {
  data: BlogPost[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};


export type SingleBlogResponse = {
  data: BlogPost;
};