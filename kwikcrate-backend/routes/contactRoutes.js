// routes/contactRoutes.js
import express from "express";
import {
  submitContactQuery,
  getAllQueries,
  replyToQuery,
} from "../controllers/contactController.js";

const router = express.Router();

// 📩 User submits a contact form
router.post("/", submitContactQuery);

// 🔐 Admin fetches all submitted queries
router.get("/", getAllQueries);

// 🔁 Admin replies to a specific query
router.post("/reply/:id", replyToQuery);

export default router;
