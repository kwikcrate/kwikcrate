import express from 'express';
import { getPageBySlug, upsertPage } from '../controllers/pageController.js';
// import { protectAdmin } from '../middleware/authMiddleware.js'; // optional

const router = express.Router();

// @desc    Get page content by slug (e.g., privacy-policy)
// @route   GET /api/pages/:slug
// @access  Public
router.get('/:slug', getPageBySlug);

// @desc    Create or update a static page
// @route   POST /api/pages/
// @access  Private (admin only ideally)
router.post('/', /* protectAdmin, */ upsertPage);

export default router;
