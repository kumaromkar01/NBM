import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import AuthRoutes from "./routes/AuthRoutes.js";
import BookmarkRoutes from "./routes/BookmarkRoutes.js";
import NoteRoutes from "./routes/NoteRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.URI)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server running perfectly" });
});

app.use("/api/auth", AuthRoutes);
app.use("/api/bookmarks", BookmarkRoutes);
app.use("/api/notes", NoteRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
