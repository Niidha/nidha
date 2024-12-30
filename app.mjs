import env from "dotenv";
import express from "express";
import cors from "cors";
import dbConnect from "./config/db.config.mjs";
import userRoute from "./routes/user.route.mjs";
import productRoute from "./routes/product.route.mjs";
import adminRoute from "./routes/admin.route.mjs";
import cartRoute from "./routes/cart.route.mjs";


env.config();
await dbConnect();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/admin", adminRoute);  // Admin routes
app.use("/api/carts", cartRoute);

app.listen(process.env.PORT || 9000, () => {
    console.log("Server running...");
});
