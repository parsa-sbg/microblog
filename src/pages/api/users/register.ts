import { userModel } from "@/models/userModel";
import UserInterface from "@/types/userType";
import { connectToDataBase } from "@/utils/db";
import { generateToken } from "@/utils/token";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
    targetError?: "name" | "username" | "password";
    user?: UserInterface;
};

const validateInput = (username: string, name: string, password: string): Data | null => {
    if (!username || username.length < 5 || /\s/.test(username)) {
        return { message: "Username must be at least 5 characters and contain no spaces.", targetError: "username" };
    }
    if (!name || name.length < 3) {
        return { message: "Name must be at least 3 characters.", targetError: "name" };
    }
    if (!password || password.length < 8 || /\s/.test(password)) {
        return { message: "Password must be at least 8 characters and contain no spaces.", targetError: "password" };
    }
    return null;
};

const createTokenCookie = (token: string) =>
    serialize("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await connectToDataBase(); // Ensure DB connection

    if (req.method !== "POST") return res.status(405).json({ message: "This method is not allowed." });


    const { username, name, password } = req.body;

    // Validate input
    const validationError = validateInput(username, name, password);
    if (validationError) return res.status(422).json(validationError);


    try {
        // Check for duplicate username
        const existingUser = await userModel.exists({ username });
        if (existingUser) return res.status(422).json({ message: "Username already taken", targetError: "username" });

        // Create the user
        const user = await userModel.create({ name, username, password });

        if (!user) return res.status(500).json({ message: "User creation failed." });

        // Generate token
        const token = generateToken({ username: user.username });
        if (!token) return res.status(500).json({ message: "Token generation error." });

        // Set cookie and respond
        res.setHeader("Set-Cookie", createTokenCookie(token));
        return res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        console.error("User creation failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}