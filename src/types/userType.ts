import { Document } from "mongoose";

export default interface UserInterface extends Document {
    _id: string
    name: string,
    username: string,
    password: string
}
