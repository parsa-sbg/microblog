import mongoose from "mongoose";

export const connectToDataBase = async () => {

    try {

        if (mongoose.connections[0].readyState ) return false

        await mongoose.connect(process.env.DATABASE_URL as string)
        console.log('db connected successfully.');

    } catch (err) {
        console.log('db connection error => ', err);
    }

}