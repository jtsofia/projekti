import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {customError} from './error-handler.mjs';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return next(customError('Token missing', 401));
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    next(customError('Invalid token', 401));
  }
};

export {authenticateToken};