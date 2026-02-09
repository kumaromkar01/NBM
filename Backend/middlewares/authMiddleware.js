import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id).select("_id name email");
        if (!user) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token expired or invalid" });
    }
};

export default authMiddleware;
