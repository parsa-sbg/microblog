import { userModel } from "@/models/userModel";
import UserInterface from "@/types/userType";
import { connectToDataBase } from "@/utils/db";
import { JwtPayload } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'

type Data = {
    message: string;
    user?: UserInterface
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    if (req.method !== "GET") return res.status(405).json({ message: 'this method is not valid.' })


    connectToDataBase()

    const { token } = req.cookies
    if (!token) return res.status(422).json({ message: 'token is not valid' })

    const secretkey = process.env.PRIVATEKEY
    if (!secretkey) throw new Error('privete key is not defined')


        try {
            const decoded = jwt.verify(token, secretkey) as JwtPayload
    
            const user = await userModel.findOne({ username: decoded.username })
            if (!user) return res.status(400).json({ message: 'user not found.' })
    
    
            return res
                .status(200)
                .json({ message: 'user find successfully', user })
    
        } catch (err) {
            console.log(err);
            return res.status(422).json({ message: 'token is not valid | user not found' })
        }

}