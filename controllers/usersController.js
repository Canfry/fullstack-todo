import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import Users from '../models/usersModel.js';

// GENERATE TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// REGISTER USER
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  // CHECK IF USER EXISTS
  const userExists = await Users.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // HASH PASSWORD
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  // CREATE USER
  const user = await Users.create({
    name,
    email,
    password: hash,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

// LOGIN USER
