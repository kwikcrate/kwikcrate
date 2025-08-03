import User from '../models/user.js';
import Game from '../models/Game.js';
import Topup from '../models/TopUp.js';

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalGames = await Game.countDocuments();
    const totalTopups = await Topup.countDocuments();

    res.json({ totalUsers, totalGames, totalTopups });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
