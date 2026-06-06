import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



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

        // Auto-follow all demo accounts so the feed is populated from day one
        const demoEmails = [
            'aria.patel@demo.com',
            'liam.chen@demo.com',
            'sofia.rivera@demo.com',
            'james.okafor@demo.com',
            'yuki.tanaka@demo.com',
        ];
        const demoUsers = await UserModel.find({ email: { $in: demoEmails } }, '_id');
        const demoIds = demoUsers.map((d) => d._id.toString());

        const newUser = await UserModel.create({
            ...req.body,
            password : hashedPass,
            following: demoIds,
        });

        // Add new user to each demo account's followers list
        await UserModel.updateMany(
            { email: { $in: demoEmails } },
            { $addToSet: { followers: newUser._id.toString() } }
        );

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