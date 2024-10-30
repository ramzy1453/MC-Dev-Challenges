import mongoose from "mongoose";
import "dotenv/config";

export async function runServer(app ) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}
export async function connectDB() {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
}
