import { Router } from "express";

import { Auth } from "../middleware/auth.mjs";
import { addToCart, getCart, removeFromCart, updateCart } from "../controller/cart.controller.mjs";

const cartRoute = Router();

// Add a product to the cart
cartRoute.post("/", Auth, addToCart);

// Get all products in the user's cart
cartRoute.get("/get", Auth, getCart);

// Update the quantity of a product in the cart
cartRoute.patch("/patch", Auth, updateCart);

// Remove a product from the cart
cartRoute.delete("/remove", Auth, removeFromCart);

export default cartRoute;
