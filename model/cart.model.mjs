import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
       
        quantity: { type: Number, default: 1, min: 1 }
    },
    { timestamps: true }
);

export const cartCollection = mongoose.model("Cart", cartSchema);