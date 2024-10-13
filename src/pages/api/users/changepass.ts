import { userModel } from "@/models/userModel";
import { connectToDataBase } from "@/utils/db";
import { JwtPayload } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import UserInterface from "@/types/userType";

type Data = {
    message: string;
    user?: UserInterface,
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    if (req.method !== "PUT") return res.status(405).json({ message: 'this method is not valid.' })

    const { token } = req.cookies
    if (!token) return res.status(402).json({ message: 'token is not valid' })

    const { oldPassword, newPassword } = req.body

    console.log(req.body);
    

    if (!oldPassword || oldPassword.length < 8 || /\s/.test(oldPassword)) return res.status(422).json({ message: 'oldPassword is not valid - password must be more tha 8 letter' })
    if (!newPassword || newPassword.length < 8 || /\s/.test(newPassword)) return res.status(423).json({ message: 'newPassword is not valid - password must be more tha 8 letter' })

    connectToDataBase()



    const secretkey = process.env.PRIVATEKEY
    if (!secretkey) throw new Error('privete key is not defined')

    try {
        const decoded = jwt.verify(token, secretkey) as JwtPayload

        const user = await userModel.findOne({ username: decoded.username })
        if (!user) return res.status(400).json({ message: 'user not found.' })

        if (user.password !== oldPassword) return res.status(401).json({ message: 'old password isnot correct.' })

        const updatedUser = await userModel.findOneAndUpdate({ username: decoded.username }, { password: newPassword }, { new: true })
        if (!updatedUser) return res.status(400).json({ message: 'unknown error.' })

        return res.status(200).json({ message: 'user updated successfully', user: updatedUser })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'internal server error .' })
    }

}