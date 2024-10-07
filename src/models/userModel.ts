import UserInterface from "@/types/userType";
import mongoose, { Model } from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


export const userModel :Model<UserInterface> = mongoose.models.user || mongoose.model<UserInterface>('user', userSchema)