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
  if (!req.body.description && !req.body.status) {
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
export const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todos.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error('There is not todo');
  }

  res.status(200).json(todo);
});

// UPDATE TODO
export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todos.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error('There is no todo');
  }

  const user = await Users.findById(req.user.id);

  // CHECK IF USER
  if (!user) {
    res.send(400);
    throw new Error('User not found');
  }

  // CHECK IF USER MATCHES THE TODO USER
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedTodo = await Todos.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
});

// DELETE TODO
export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todos.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error('There is no todo');
  }

  const user = await Users.findById(req.user.id);

  // CHECK IF USER
  if (!user) {
    res.send(400);
    throw new Error('User not found');
  }

  // CHECK IF USER MATCHES THE TODO USER
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await Todos.findOneAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});
