// models/contactQueryModel.js
import mongoose from "mongoose";

const contactQuerySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  reply: String,
  repliedAt: Date,
}, { timestamps: true });

const ContactQuery = mongoose.model("ContactQuery", contactQuerySchema);
export default ContactQuery;
