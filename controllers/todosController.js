import asyncHandler from 'express-async-handler';

import Todos from '../models/todosModel';

// GET ALL TODOS
export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todos.find({ user: req.user.id });
  res.status(200).json(todos);
});
