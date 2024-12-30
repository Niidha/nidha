import { productCollection } from "../model/product.model.mjs";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;
        const userId = req.user._id;

        const product = await productCollection.create({ name, description, price, quantity, userId });
        return res.status(201).send({ message: "Product created", product });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { name } = req.body;
        const product = await productCollection.findById(name);

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        return res.status(200).send({ message: "Product fetched", product });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;
        const productId = req.params.id;
        const userId = req.user._id;

        const product = await productCollection.findOne({ _id: productId, userId });

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
        const productId = req.params.id;
        const userId = req.user._id;

        const product = await productCollection.findOne({ _id: productId, userId });

        if (!product) {
            return res.status(404).send({ message: "Product not found or you are not the owner" });
        }

        await productCollection.findByIdAndDelete(productId);
        return res.status(200).send({ message: "Product deleted" });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};

export const getAdminProducts = async (req, res) => {
    try {
        const adminProducts = await productCollection.find({ createdBy: "admin" });
        return res.status(200).send({
            message: "Admin products retrieved successfully",
            products: adminProducts,
        });
    } catch (err) {
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};
