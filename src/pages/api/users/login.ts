import { userModel } from "@/models/userModel";
import UserInterface from "@/types/userType";
import { connectToDataBase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie"
import { generateToken } from "@/utils/token";


type Data = {
    message: string;
    targetError?: 'name' | 'username' | 'password'
    user?: UserInterface
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    connectToDataBase()

    switch (req.method) {

        case 'POST': {

            const { username, password } = req.body


            if (!username || username.length < 5 || /\s/.test(username)) return res.status(422).json({ message: 'username is not valid - username must be more than 5 letter', targetError: 'username' })
            if (!password || password.length < 8 || /\s/.test(password)) return res.status(422).json({ message: 'password is not valid - password must be more tha 8 letter', targetError: 'password' })



            try {
                const user = await userModel.findOne({ username })

                if (!user) return res.status(404).json({ message: 'username is not correct.' })

                if (user.password !== password) return res.status(401).json({ message: 'password is not correct.' })

                const userToken = generateToken({ username: user.username })

                if (!userToken) return res.status(500).json({ message: 'generate token error' })

                return res
                    .setHeader('Set-Cookie', serialize('token', userToken, {
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 * 7,
                        path: '/'
                    }))
                    .status(200)
                    .json({ message: 'user loggedin successfully.' })




            } catch (err) {
                console.error('internal server error , error => ', err)
                return res.status(500).json({ message: 'internal server error' })
            }
        }

        default: {
            return res.status(405).json({ message: 'this method is not valid for this api.' })
        }

    }
}