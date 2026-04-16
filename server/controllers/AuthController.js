import UserModel from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { use } from "react";


// register new user
export const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if user already exists
        const oldUser = await UserModel.findOne({ email});
        if (oldUser) {
            return res.status(400).json({message : "User already exists"});
        }

        const hashedPass = await bcrypt.hash(password.toString(), 10);
        const newUser = await UserModel.create({
            ...req.body,
            password : hashedPass,
        });

        const user = await newUser.save();

        const token = jwt.sign(
            { email : user.email, id : user._id },
            process.env.JWT_KEY,
            { expiresIn : "1h" }
        );
        res.status(200).json({ user, token});
    }
    catch (error) {
        res.status(500).json({ message : error.message});
    }
}

// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json("Sorry, Please enter the correct email or password!");
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.status(400).json("Sorry, Please enter the correct email or password!");
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};