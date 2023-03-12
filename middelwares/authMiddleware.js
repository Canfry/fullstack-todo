import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Users from '../models/usersModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // CHECK IF HEADERS.AUTHORIZATION STARTS WITH BEARER
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // GET TOKEN FROM HEADERS
      token = req.headers.authorization.split(' ')[1];

      // VERIFY TOKEN
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token. Can access req.user to get data that we want
      req.user = await Users.findById(verifiedToken.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token!');
  }
});
