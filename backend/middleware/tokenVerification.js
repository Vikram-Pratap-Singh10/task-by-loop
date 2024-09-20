import dotenv from "dotenv"
import Jwt from "jsonwebtoken";
dotenv.config()

export const tokenVerification = async (req, res, next) => {
    try {
        let token = await req.headers.authorization;
        if (!token) {
            throw new Error
        }
        token = token.split(" ")[1]
        Jwt.verify(token, process.env.TOKEN)
        next()
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Unauthorized User", status: false })
    }
}