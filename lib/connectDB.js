import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Already connected
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "nextjs_ecommerce",
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw new Error("Database connection failed");
  }
};
