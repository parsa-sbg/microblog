import PostInterface from "@/types/postType"; 
import mongoose, { Model } from "mongoose";


const postSchema = new mongoose.Schema<PostInterface>({
    title: {
        type: String,
        required: true
    },
    
    body: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
    
})


export const postModel: Model<PostInterface> = mongoose.models.post || mongoose.model<PostInterface>('post', postSchema)