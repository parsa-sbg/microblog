import mongoose, { Document } from "mongoose";
import UserInterface from "./userType";

export default interface PostInterface extends Document {
    _id: mongoose.Types.ObjectId
    title: string,
    body: string,
    user: UserInterface
}