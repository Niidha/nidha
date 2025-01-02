
import { productCollection } from "../model/product.model.mjs";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { adminCollection } from "../model/admin.model.mjs";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, userId } = req.body;

        const product = await productCollection.create({ name, description, price, quantity, userId });
        return res.status(201).send({ message: "Product created", product });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, quantity,productId,userId  } = req.body;
        
       

        const product = await productCollection.findOne({ _id: productId, userId});

        if (!product) {
            return res.status(404).send({ message: "Product not found or you are not the owner" });
        }

        const updatedProduct = await productCollection.findByIdAndUpdate(productId, { name, description, price, quantity }, { new: true });
        return res.status(200).send({ message: "Product updated", updatedProduct });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const {productId,userId} = req.body
       

        const product = await productCollection.findOne({ _id: productId,userId});

        if (!product) {
            return res.status(404).send({ message: "Product not found or you are not the owner" });
        }

        await productCollection.findByIdAndDelete(productId);
        return res.status(200).send({ message: "Product deleted" });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};



//admin signup login
export const signUp = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const userExists = await adminCollection.findOne({ email });

        if (userExists) {
            return res.status(409).send({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await adminCollection.create({ name, email, password: hashedPassword });

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
        const user = await adminCollection.findOne({ email });

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
export const getAllProducts = async (req, res) => {
    try {
        const products = await productCollection.find({});
        return res.status(200).send({
            message: "Products retrieved successfully",
            products,
        });
    } catch (err) {
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};
