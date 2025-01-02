import { sellerCollection } from "../model/seller.model.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { productCollection } from "../model/product.model.mjs";
export const signUp = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const userExists = await sellerCollection.findOne({ email });

        if (userExists) {
            return res.status(409).send({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await sellerCollection.create({ name, email, password: hashedPassword });

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
        const user = await sellerCollection.findOne({ email });

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


export const getSellerProducts = async (req, res) => {
    try {
        const { userId } = req.body;

       
        const products = await productCollection.find({ userId });

        if (products.length === 0) {
            return res.status(404).send({ message: "No products found for this admin" });
        }

        return res.status(200).send({ message: "Products fetched", products });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};

