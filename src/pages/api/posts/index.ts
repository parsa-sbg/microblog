import { connectToDataBase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { postModel } from "@/models/postModel";
import PostInterface from "@/types/postType";


type Data = {
    posts?: PostInterface[],
    message: string
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {

    if (req.method !== "GET") return res.status(405).json({ message: 'this methid is not valid.' })


    connectToDataBase()

    const posts = await postModel.find({}).populate('user').sort({ createdAt: -1 })

    res.status(200).json({ posts, message: 'all posts.' });
}