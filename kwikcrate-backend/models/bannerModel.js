// models/bannerModel.js
import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    videoUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
