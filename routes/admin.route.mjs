import { Router } from "express";
import { Auth } from "../middleware/auth.mjs";
import { getUsers } from "../controller/admin.controller.mjs";

const adminRoute = Router();

adminRoute.get("/users", Auth, getUsers);  // Admin protected route

export default adminRoute;
