import { connectToDataBase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { postModel } from "@/models/postModel";
import PostInterface from "@/types/postType";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { userModel } from "@/models/userModel";


type Data = {
    posts?: PostInterface[],
    message: string
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {

    if (req.method !== "GET") return res.status(405).json({ message: 'this methid is not valid.' })


    const userToken = req.cookies.token
    if (!userToken) return res.status(422).json({ message: 'token is not valid' })


    const secretkey = process.env.PRIVATEKEY
    if (!secretkey) throw new Error('privete key is not defined')


    try {
        connectToDataBase()
        const decoded = jwt.verify(userToken, secretkey) as JwtPayload

        const user = await userModel.findOne({ username: decoded.username })
        if (!user) return res.status(404).json({ message: 'user not found' })

        const userposts = await postModel.find({ user: user._id }).populate('user')

        return res.status(200).json({ message: 'user posts.', posts: userposts })

    } catch (error) {
        console.log('error => ', error);
        return res.status(422).json({ message: 'token is not valid' })
    }
}