// controllers/contactController.js
import ContactQuery from "../models/contactQueryModel.js";

// POST /api/contact
export const submitContactQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newQuery = new ContactQuery({ name, email, message });
    await newQuery.save();
    res.status(201).json({ success: true, message: "Query submitted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

// GET /api/contact (admin only)
export const getAllQueries = async (req, res) => {
  try {
    const queries = await ContactQuery.find().sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch queries." });
  }
};

// POST /api/contact/reply/:id
export const replyToQuery = async (req, res) => {
  try {
    const { reply } = req.body;
    const query = await ContactQuery.findById(req.params.id);
    if (!query) return res.status(404).json({ message: "Query not found" });

    query.reply = reply;
    query.repliedAt = new Date();
    await query.save();

    res.json({ success: true, message: "Reply saved." });
  } catch (err) {
    res.status(500).json({ message: "Failed to reply to query." });
  }
};
