import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/UserModel.js';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];

      if (token) {
        try {
          const decoded: any = jwt.verify(
            token,
            process.env.SECRET_TOKEN as string
          );

          req.body.user = await User.findById(decoded.id).select('-password');

          next();
        } catch (err) {
          res.status(401).send({
            message: 'Invalid/Expired Token',
            success: false,
          });
        }
      } else {
        res.status(401).send({
          success: false,
          message: 'Token must be provided',
        });
      }
    } else {
      res.status(401).send({
        success: false,
        message: 'Authorization header must be provided',
      });
    }
  } catch (err) {
    res.status(401).send({
      message: 'UNAUTHENTICATED',
      data: err,
      success: false,
    });
  }
};

export default checkAuth;
