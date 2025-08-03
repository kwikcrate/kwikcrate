import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  googleLoginUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLoginUser); // ✅ New
router.get('/profile', getUserProfile);

export default router;
