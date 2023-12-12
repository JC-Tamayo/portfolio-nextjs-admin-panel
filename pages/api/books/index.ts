import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getAccessToken } from '@auth0/nextjs-auth0';

import { BookList } from "../../../interfaces/Book";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    throw new Error('Only POST requests allowed');
  }

  const { accessToken } = await getAccessToken(req, res);

  try {
    const { page, pageSize, ...filters } = req.body;
    const bookList = await axios.get<BookList>(`${process.env.API_URL}/book`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page: page+1,
        limit: pageSize,
        ...filters,
      }
    });
    res.status(200).json(bookList.data);
  } catch (error: any) {
    res.status(error.status || 500).json(error.message);
  }
}