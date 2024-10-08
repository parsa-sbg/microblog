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
            console.log(req.body);

            const { username, name, password } = req.body

            console.log('username => ', username);
            console.log('name => ', name);
            console.log('password => ', password);

            if (!username || username.length < 5 || /\s/.test(username)) return res.status(422).json({ message: 'username is not valid - username must be more than 5 letter', targetError: 'username' })
            if (!name || name.length < 3) return res.status(422).json({ message: 'name is not valid', targetError: 'name' })
            if (!password || password.length < 8 || /\s/.test(password)) return res.status(422).json({ message: 'password is not valid - password must be more tha 8 letter', targetError: 'password' })


            // Duplicate username check
            const duplicateUsernameCheckResult = await userModel.findOne({ username })
            if (duplicateUsernameCheckResult) return res.status(422).json({ message: 'username already taken', targetError: 'username' })



            try {
                const user = await userModel.create({
                    name,
                    username,
                    password
                })

                if (user) {

                    const newUserToken = generateToken({ username: user.username })

                    if (!newUserToken) return res.status(500).json({ message: 'generate token error' })

                    return res
                        .setHeader('Set-Cookie', serialize('token', newUserToken, {
                            httpOnly: true,
                            path: '/',
                            maxAge: 60 * 60 * 24 * 7
                        }))
                        .status(201)
                        .json({ message: 'user created successfully', user })
                }

                return res.status(500).json({ message: 'user creation error' })


            } catch (err) {
                console.error('craete new user failed , error => ', err)
                return res.status(500).json({ message: 'internal server error' })
            }
        }

        default: {
            return res.status(405).json({ message: 'this method is not valid for this api.' })
        }

    }
}