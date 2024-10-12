import mongoose, { Document } from "mongoose";

export default interface PostInterface extends Document {
    _id: string
    title: string,
    body: string,
    user: mongoose.Types.ObjectId
}