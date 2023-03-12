import express from 'express';
import {
  registerUser,
  loginUser,
  profilePage,
} from '../controllers/usersController.js';
import { protect } from '../middelwares/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, profilePage);

export default router;
