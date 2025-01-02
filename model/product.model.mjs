import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique:true  },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true }
}, { timestamps: true });

export const productCollection = mongoose.model("products", productSchema);