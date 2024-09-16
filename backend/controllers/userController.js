import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export async function createUser(req, res) {
    const { fname, lname, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        })
    }
    const user = await User.create({
        firstname: fname,
        lastname: lname,
        email,
        password
    });
    if (user) {
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        })
    }
}

export async function siginInUser(req, res) {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        })
    }
    const user = await User.findOne({ email });

    if (user) {
        const passwordMatch = await bcrypt.compare(String(password), user.password);
        if (!passwordMatch) return res.status(401).json({ success: false, message: "Invalid credentials" })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.status(200).json({
            success: true,
            message: "User signed in successfully",
            token: token
        })
    }
    else {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
}

export async function getAllUsers(req, res) {
    const users = await User.find();
    return res.status(200).json({ success: true, data: users })
}