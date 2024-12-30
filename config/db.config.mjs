import { connect } from "mongoose";
import env from "dotenv";

env.config();

const dbConnect = async () => {
    try {
        const { connection } = await connect(process.env.MONGO_URL, {
            dbName: "Ecommerce",
        });
        const db = connection.db.databaseName;
        console.log("Connected to", db);
    } catch (err) {
        console.error(err);
    }
};

export default dbConnect;
