import { Router } from "express";
;
import { Auth } from "../middleware/auth.mjs";
import { login, signUp, updateProfile } from "../controller/user.controller.mjs";

const userRoute = Router();

userRoute.post("/signup", signUp);
userRoute.get("/login", login);
userRoute.patch("/update", Auth, updateProfile);

export default userRoute;
