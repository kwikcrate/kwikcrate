// controllers/pageController.js
import Page from '../models/Page.js';
import asyncHandler from 'express-async-handler';

// @desc    Get a page by slug
// @route   GET /api/pages/:slug
// @access  Public
const getPageBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  if (!slug) {
    res.status(400);
    throw new Error('Slug is required');
  }

  const page = await Page.findOne({ slug });

  if (!page) {
    res.status(404);
    throw new Error('Page not found');
  }

  res.status(200).json(page);
});

// @desc    Create or update a page (upsert)
// @route   POST /api/pages
// @access  Admin
const upsertPage = asyncHandler(async (req, res) => {
  const { title, slug, content } = req.body;

  console.log("🔍 Incoming page data:", { title, slug, content });

  if (!title || !slug || !content) {
    res.status(400);
    throw new Error('Title, slug, and content are required');
  }

  try {
    const page = await Page.findOneAndUpdate(
      { slug },
      { title, slug, content },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log("✅ Page saved/updated:", page);
    res.status(200).json(page);
  } catch (error) {
    console.error("❌ MongoDB error while upserting page:", error);
    res.status(500);
    throw new Error('Server error while saving page');
  }
});

export { getPageBySlug, upsertPage };
