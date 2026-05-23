import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ message: "PurpleZone API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);

app.use((error, _request, response, _next) => {
  response.status(error.statusCode || 500).json({
    message: error.message || "Internal server error."
  });
});

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MongoDB connection failed: MONGODB_URI is not set. Create server/.env from server/.env.example.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
