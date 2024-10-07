import mongoose, { Document, Model } from "mongoose";

interface UserInterface extends Document {
    username: string,
    password: string
}

const userSchema = new mongoose.Schema({
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