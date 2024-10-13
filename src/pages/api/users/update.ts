import { userModel } from "@/models/userModel";
import { connectToDataBase } from "@/utils/db";
import { JwtPayload } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import UserInterface from "@/types/userType";
import { serialize } from "cookie";
import { generateToken } from "@/utils/token";

type Data = {
    message: string;
    targetError?: string,
    user?: UserInterface
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    if (req.method !== "PUT") return res.status(405).json({ message: 'this method is not valid.' })

    const { token } = req.cookies
    if (!token) return res.status(422).json({ message: 'token is not valid' })

    const { username, name } = req.body


    if (!username || username.length < 5 || /\s/.test(username)) return res.status(422).json({ message: 'username is not valid - username must be more than 5 letter', targetError: 'username' })
    if (!name || name.length < 3) return res.status(422).json({ message: 'name is not valid', targetError: 'name' })
    connectToDataBase()



    const secretkey = process.env.PRIVATEKEY
    if (!secretkey) throw new Error('privete key is not defined')

    try {
        const decoded = jwt.verify(token, secretkey) as JwtPayload

        const user = await userModel.findOneAndUpdate({ username: decoded.username }, { username, name })
        if (!user) return res.status(400).json({ message: 'update failed.' })

        // Duplicate username check
        const duplicateUsernameCheckResult = await userModel.findOne({ username })
        if (duplicateUsernameCheckResult && username !== user.username) return res.status(422).json({ message: 'username already taken', targetError: 'username' })


        const newUserToken = generateToken({ username: user.username })
        if (!newUserToken) return res.status(500).json({ message: 'generate token error' })


        return res
            .setHeader("Set-Cookie", serialize('token', newUserToken, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            }))
            .status(200)
            .json({ message: 'user updated successfully', user })

    } catch (err) {
        console.log(err);
        return res.status(422).json({ message: 'token is not valid | user not found' })
    }

}