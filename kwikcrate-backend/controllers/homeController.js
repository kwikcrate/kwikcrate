// controllers/homeController.js
import Banner from '../models/bannerModel.js';
import Category from '../models/categoryModel.js';
import Promotion from '../models/promotionModel.js';

// ✅ Get all homepage content
export const getHomepageContent = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    const categories = await Category.find().sort({ createdAt: -1 });
    const promotions = await Promotion.find().sort({ createdAt: -1 });

    res.json({ banners, categories, promotions });
  } catch (err) {
    console.error("Error loading homepage data:", err);
    res.status(500).json({ error: "Failed to load homepage content" });
  }
};

// ✅ Optional: Stub (not used in current routes, safe to leave for future)
export const updateHomepageContent = async (req, res) => {
  return res.status(501).json({ message: "Update homepage not implemented" });
};

// ✅ Banners
export const getBanners = async (req, res) => {
  const banners = await Banner.find().sort({ createdAt: -1 });
  res.json(banners);
};

export const addBanner = async (req, res) => {
  const { videoUrl } = req.body;
  if (!videoUrl) return res.status(400).json({ error: "Video URL is required" });

  const newBanner = new Banner({ videoUrl });
  await newBanner.save();
  res.status(201).json(newBanner);
};

export const deleteBanner = async (req, res) => {
  const { id } = req.params;
  await Banner.findByIdAndDelete(id);
  res.json({ message: "Banner deleted successfully" });
};

// ✅ Categories
export const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
};

export const addCategory = async (req, res) => {
  const { title, imageUrl } = req.body;
  if (!title || !imageUrl) return res.status(400).json({ error: "Title and image are required" });

  const newCategory = new Category({ title, imageUrl });
  await newCategory.save();
  res.status(201).json(newCategory);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.json({ message: "Category deleted successfully" });
};

// ✅ Promotions
export const getPromotions = async (req, res) => {
  const promos = await Promotion.find().sort({ createdAt: -1 });
  res.json(promos);
};

export const addPromotion = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ error: "Title and description required" });

  const promo = new Promotion({ title, description });
  await promo.save();
  res.status(201).json(promo);
};

export const deletePromotion = async (req, res) => {
  const { id } = req.params;
  await Promotion.findByIdAndDelete(id);
  res.json({ message: "Promotion deleted successfully" });
};
