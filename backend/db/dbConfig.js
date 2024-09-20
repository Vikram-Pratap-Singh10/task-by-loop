import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()

export const dbConfig = mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("database connected successfull!")
    }).catch(err => {
        console.log(err)
    })
