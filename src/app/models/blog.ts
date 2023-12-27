export interface Category {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

export interface Author {
  name: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  publish_date: string;
  categories: Category[];
  author: Author;
}
export interface SpecificPost {
  id: number;
  title: string;
  description: string;
  image: string;
  publish_date: string;
  categories: Category[];
  author: Author;
  email:string
}
