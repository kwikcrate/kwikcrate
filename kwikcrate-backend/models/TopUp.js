import mongoose from "mongoose";

const topUpSchema = new mongoose.Schema({
  game: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  payment: { type: String, required: true },
});

// ✅ Fix OverwriteModelError
export default mongoose.models.TopUp || mongoose.model("TopUp", topUpSchema);
