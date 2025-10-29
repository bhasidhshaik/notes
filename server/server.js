import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"; 
import noteRoutes from './routes/note.route.js'
import fs from "fs";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

dotenv.config();

// Connect DB
connectDb();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(errorHandlerMiddleware);


// Ensure uploads folder exists (for multer temp files)
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/notes', noteRoutes)

app.get("/", (req, res) => {
  res.send("Server is healthy!!");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
