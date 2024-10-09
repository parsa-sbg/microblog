import { connectToDataBase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { postModel } from "@/models/postModel";
import PostInterface from "@/types/postType";


type Data = {
    posts: PostInterface[]
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    connectToDataBase()

    const posts = await postModel.find({})



    res.status(200).json({ posts });
}