import { Document } from "mongoose";

export default interface UserInterface extends Document {
    username: string,
    password: string
}
