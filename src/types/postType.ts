import mongoose, { Document } from "mongoose";

export default interface PostInterface extends Document {
    title: string,
    body: string,
    user: mongoose.Types.ObjectId
}