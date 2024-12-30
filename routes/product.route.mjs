import { Router } from "express";

import { Auth } from "../middleware/auth.mjs";
import { createProduct, deleteProduct, getAdminProducts, getProduct,  updateProduct } from "../controller/product.controller.mjs";

const productRoute = Router();

productRoute.post("/", Auth, createProduct);

productRoute.patch("/:id", Auth, updateProduct);
productRoute.delete("/:id", Auth, deleteProduct);
productRoute.get("/", Auth, getProduct); // Protect this route
productRoute.get("/productlist", Auth, getAdminProducts)

export default productRoute;
