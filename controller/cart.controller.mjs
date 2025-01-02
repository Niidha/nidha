import { cartCollection } from "../model/cart.model.mjs";
import { productCollection } from "../model/product.model.mjs";


export const addToCart = async (req, res) => {
    try {
        const { productId, quantity,userId } = req.body;

        const product = await productCollection.findOne({ _id: productId });
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        let cartItem = await cartCollection.findOne({ userId, productId });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
            await cartItem.populate('productId');
            return res.status(200).send({ message: "Cart updated", cartItem });
        } else {
            const newCartItem = await cartCollection.create({ userId, productId, quantity });
            await newCartItem.populate('productId');
            return res.status(201).send({ message: "Product added to cart", newCartItem });
        }
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};

export const getCart = async (req, res) => {
    try {
        const { userId} = req.body;
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
        const {userId, productId, quantity } = req.body;
       

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
        const { productId,userId } = req.body;
     ;

        const cartItem = await cartCollection.findOneAndDelete({ userId, productId });
        if (!cartItem) {
            return res.status(404).send({ message: "Product not found in cart" });
        }

        return res.status(200).send({ message: "Product removed from cart" });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};