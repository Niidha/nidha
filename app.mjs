import env from "dotenv";
import express from "express";
import cors from "cors";
import dbConnect from "./config/db.config.mjs";
import userRoute from "./routes/user.route.mjs";
import adminRoute from "./routes/admin.route.mjs";
import sellerRoute from "./routes/seller.route.mjs"




env.config();
await dbConnect();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/buyer", userRoute);
app.use("/api/admin",adminRoute)
app.use("/api/seller", sellerRoute);  


app.listen(process.env.PORT || 9000, () => {
    console.log("Server running...");
});