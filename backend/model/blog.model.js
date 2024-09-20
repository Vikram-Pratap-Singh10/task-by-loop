import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    title: {
        type: String
    },
    author: {
        type: String
    },
    content: {
        type: String
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Blog = new mongoose.model("blog", BlogSchema)