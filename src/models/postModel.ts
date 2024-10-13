import PostInterface from "@/types/postType";
import mongoose, { Model } from "mongoose";


const postSchema = new mongoose.Schema<PostInterface>({
    title: {
        type: String,
        required: false
    },

    body: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

}, {
    timestamps: true
})


export const postModel: Model<PostInterface> = mongoose.models.post || mongoose.model<PostInterface>('post', postSchema)