import { postModel } from "@/models/postModel";
import PostInterface from "@/types/postType";
import { connectToDataBase } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { userModel } from "@/models/userModel";


type responseDadta = {
    message: string,
    post?: PostInterface
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<responseDadta>
) {

    if (req.method !== "POST") return res.status(405).json({ message: 'method is not valid' })

    const newPostTitle = req.body.title
    const newPostBody = req.body.body
    const userToken = req.query.token


    if (!userToken || Array.isArray(userToken)) return res.status(422).json({ message: 'token is not valid' })

    const secretkey = process.env.PRIVATEKEY
    if (!secretkey) throw new Error('privete key is not defined')


    if (!newPostBody) return res.status(422).json({ message: 'body is not valid' })


    try {
        connectToDataBase()
        const decoded = jwt.verify(userToken, secretkey) as JwtPayload
        console.log(decoded);

        const user = await userModel.findOne({username : decoded.username})
        if (!user) return res.status(404).json({message: 'user not found'})

            console.log('user => ', user );
            
        const newPost = await postModel.create({
            title: newPostTitle,
            body: newPostBody,
            user: user._id
        })

        return res.status(201).json({ message: 'post created successfully', post: newPost })

    } catch (error){
        console.log('error => ', error);
        
        return res.status(422).json({ message: 'token is not valid' })
    }
}