export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  publishingDate: string;
  createdAt: string;
}

export interface BookList {
  data: Book[];
  total: number;
}