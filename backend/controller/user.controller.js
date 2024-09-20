import dotenv from "dotenv"
import { User } from "../model/user.model.js";
import bcryptjs from "bcryptjs"
import Jwt from "jsonwebtoken";
dotenv.config()

export const signUp = async (req, res, next) => {
    try {
        req.body.password = await bcryptjs.hash(req.body.password, await bcryptjs.genSalt(10));
        const user = await User.create(req.body)
        return user ? res.status(201).json({ message: 'User created successfully', status: true }) : res.status(400).json({ message: "Bad Request", status: false })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Error creating user', status: false });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ $or: [{ email: email }, { userName: email }] });
        if (!user) return res.status(400).json({ message: 'User not found' });
        const status = await bcryptjs.compare(password, user.password);
        if (!status) return res.status(400).json({ message: 'Invalid credentials' });
        const token = Jwt.sign({ id: user._id }, process.env.TOKEN, { expiresIn: '1h' });
        return res.status(200).json({ message: "login successfull", user: { ...user.toObject(), password: undefined, token: token }, status: true })
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', status: false });
    }
}