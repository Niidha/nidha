import { Router } from "express";
import { Auth } from "../middleware/auth.mjs";

import {createProduct,deleteProduct,updateProduct} from "../controller/product.controller.mjs";
import { getSellerProducts, login, signUp} from "../controller/seller.controller.mjs";

const sellerRoute = Router();

sellerRoute.post("/signup", signUp);
sellerRoute.get("/login", login);


sellerRoute.post("/create", Auth, createProduct);
sellerRoute.get("/products", Auth, getSellerProducts);
sellerRoute.patch("/update", Auth, updateProduct);
sellerRoute.delete("/delete", Auth, deleteProduct);

export default sellerRoute;
