import asyncHandler from 'express-async-handler';

import Todos from '../models/todosModel.js';
import Users from '../models/usersModel.js';

// GET ALL TODOS
export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todos.find({ user: req.user.id });
  res.status(200).json(todos);
});

// CREATE TODO
export const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.description && req.body.status) {
    res.status(400);
    throw new Error('Please add a description and a status');
  }

  const todo = await Todos.create({
    description: req.body.description,
    status: req.body.status,
    user: req.user.id,
  });
  res.status(201).json(todo);
});

// GET SINGLE TODO

// UPDATE TODO

// DELETE TODO
