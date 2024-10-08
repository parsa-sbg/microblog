import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {


  res
    .setHeader('Set-Cookie', serialize('token', ' ', {
      httpOnly: true,
      path: '/',
      maxAge: 0
    }))
    .status(200)
    .json({ message: 'user logged out.' });
}