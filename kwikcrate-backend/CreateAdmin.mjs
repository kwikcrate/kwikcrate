// createAdmin.mjs
import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI, {
  dbName: "kwikcrate",
});

console.log("✅ Connected to MongoDB");

async function createAdmin() {
  const existing = await Admin.findOne({ username: "admin5" });
  if (existing) {
    console.log("⚠️ Admin already exists");
    process.exit(0);
  }

  // NOTE: we pass plain-text here. The schema's pre-save hook will hash it.
  const newAdmin = new Admin({ username: "admin5", password: "admin5" });
  const savedAdmin = await newAdmin.save();
  console.log("✅ Admin user created:", {
    _id: savedAdmin._id,
    username: savedAdmin.username,
  });
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error("❌ Error creating admin:", err);
  process.exit(1);
});
