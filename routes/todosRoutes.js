import express from 'express';
import { getTodos, createTodo } from '../controllers/todosController.js';
import { protect } from '../middelwares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getTodos);
router.post('/', protect, createTodo);

export default router;
