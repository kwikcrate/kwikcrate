// models/promotionModel.js
import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String, // URL of promotional image
      required: true,
    },
    link: {
      type: String, // Optional: clickable link to promo page or product
    },
  },
  {
    timestamps: true,
  }
);

const Promotion = mongoose.model("Promotion", promotionSchema);
export default Promotion;
