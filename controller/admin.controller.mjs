import { userCollection } from "../model/user.model.mjs";


export const getUsers = async (req, res) => {
    try {
        const users = await userCollection.find();
        return res.status(200).send({ message: "Users fetched", users });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};
