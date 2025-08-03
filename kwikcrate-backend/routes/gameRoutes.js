import express from "express";
import Game from "../models/Game.js";

const router = express.Router();

// GET all games
router.get("/", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

// POST new game
router.post("/", async (req, res) => {
  const newGame = new Game(req.body);
  await newGame.save();
  res.status(201).json(newGame);
});

export default router;
