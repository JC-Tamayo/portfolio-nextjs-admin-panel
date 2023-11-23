export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
  createdAt: string;
}

export interface BookList {
  data: Book[];
  total: number;
}