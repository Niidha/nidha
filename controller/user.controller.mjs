import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userCollection } from "../model/user.model.mjs";

export const signUp = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const userExists = await userCollection.findOne({ email });

        if (userExists) {
            return res.status(409).send({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userCollection.create({ name, email, password: hashedPassword });

        user.password = undefined;
        const token = jwt.sign({ sub: user }, process.env.JWT_KEY, { expiresIn: "7d" });

        return res.status(201).send({ message: "User created", user, token });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });


    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userCollection.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        user.password = undefined;
        const token = jwt.sign({ sub: user }, process.env.JWT_KEY, { expiresIn: "7d" });

        return res.status(200).send({ message: "User logged in", user, token });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
       
        const { name, email,userId } = req.body;

        const updatedUser = await userCollection.findByIdAndUpdate(userId, { name, email }, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        return res.status(200).send({ message: "Profile updated", updatedUser });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};
export const getUsers = async (req, res) => {
    try {
        const users = await userCollection.find();
        return res.status(200).send({ message: "Users fetched", users });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};
