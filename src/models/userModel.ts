import UserInterface from "@/types/userType";
import mongoose, { Model } from "mongoose";


export const userSchema = new mongoose.Schema<UserInterface>({
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
},{
    timestamps: true
})


export const userModel :Model<UserInterface> = mongoose.models.user || mongoose.model<UserInterface>('user', userSchema)