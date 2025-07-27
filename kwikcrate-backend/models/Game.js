import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  topUps: [
    {
      name: String,
      price: Number,
      image: String,
      payment: String,
    },
  ],
});

// ✅ Fix OverwriteModelError
export default mongoose.models.Game || mongoose.model("Game", gameSchema);
