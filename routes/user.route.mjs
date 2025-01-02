import { Router } from "express";
;
import { Auth } from "../middleware/auth.mjs";
import { login, signUp, updateProfile } from "../controller/user.controller.mjs";
import { addToCart, getCart, removeFromCart, updateCart } from "../controller/cart.controller.mjs";
import { getAllProducts } from "../controller/product.controller.mjs";

const userRoute = Router();

userRoute.post("/signup", signUp);
userRoute.get("/login", login);
userRoute.patch("/update", Auth, updateProfile);
userRoute.post("/add", Auth, addToCart);
userRoute.get("/cart", Auth, getCart);
userRoute.patch("/patch", Auth, updateCart);
userRoute.delete("/remove", Auth, removeFromCart);
userRoute.get("/products", Auth, getAllProducts)


export default userRoute;