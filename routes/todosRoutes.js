import express from 'express';
import {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todosController.js';
import { protect } from '../middelwares/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getTodos).post(protect, createTodo);
router
  .route('/:id')
  .get(protect, getTodo)
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

export default router;
