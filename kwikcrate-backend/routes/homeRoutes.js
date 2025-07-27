// routes/homeRoutes.js
import express from "express";
import {
  getHomepageContent,
  updateHomepageContent,
} from "../controllers/homeController.js";

const router = express.Router();

// GET homepage content
router.get("/", getHomepageContent);

// POST/PUT to update homepage content (admin only, can use middleware for auth)
router.put("/", updateHomepageContent);

export default router;
