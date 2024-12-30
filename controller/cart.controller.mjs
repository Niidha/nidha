import { cartCollection } from "../model/cart.model.mjs";
import { productCollection } from "../model/product.model.mjs";


export const addToCart = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const userId = req.user._id;

        // Find the product by name (instead of by ID)
        const product = await productCollection.findOne({ name });
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        let cartItem = await cartCollection.findOne({ userId, productId: product._id });

        if (cartItem) {
            // If product already in cart, update quantity
            cartItem.quantity += quantity;
            await cartItem.save();
            // Populate the product data (e.g., name)
            await cartItem.populate('productId');
            return res.status(200).send({ message: "Cart updated", cartItem });
        } else {
            // If product not in cart, add it
            const newCartItem = await cartCollection.create({ userId, productId: product._id, quantity });
            // Populate the product data (e.g., name)
            await newCartItem.populate('productId');
            return res.status(201).send({ message: "Product added to cart", newCartItem });
        }
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};
export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cartItems = await cartCollection.find({ userId }).populate('productId');
        
        if (cartItems.length === 0) {
            return res.status(404).send({ message: "No products in cart" });
        }

        return res.status(200).send({ message: "Cart fetched", cartItems });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        const cartItem = await cartCollection.findOne({ userId, productId });
        if (!cartItem) {
            return res.status(404).send({ message: "Product not found in cart" });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        return res.status(200).send({ message: "Cart item updated", cartItem });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        const cartItem = await cartCollection.findOneAndDelete({ userId, productId });
        if (!cartItem) {
            return res.status(404).send({ message: "Product not found in cart" });
        }

        return res.status(200).send({ message: "Product removed from cart" });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};
