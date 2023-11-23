import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse ) => {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const response = await axios.get(`${process.env.API_URL}/books/findAll&page=${1}&limit=${10}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
});