import { Router } from "express";
import { getAllProducts, login, signUp } from "../controller/product.controller.mjs";
import { Auth } from "../middleware/auth.mjs";
import { getUsers } from "../controller/user.controller.mjs";
const adminRoute = Router()
adminRoute.get("/products", Auth, getAllProducts)
adminRoute.post("/signup", signUp);
adminRoute.post("/login", login);
adminRoute.get("/users",Auth, getUsers);
export default adminRoute;