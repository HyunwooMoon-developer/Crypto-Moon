import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import sendError from '../libs/sendError.js';
import checkAuth from '../libs/checkAuth.js';

const router: Router = Router();

router.route('/register').post(async (req: Request, res: Response) => {
  try {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
      return res.status(400).send({
        success: false,
        message: 'please fill all fields',
      });
    }

    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.status(400).send({
        success: false,
        message: 'Email already in use',
      });
    }

    const newUser = new User(req.body);

    await newUser.save();

    return res.status(200).send({
      message: 'Create successful',
      success: true,
    });
  } catch (err) {
    sendError(res, err);
  }
});

router.route('/login').post(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        message: 'User does not exist',
        success: false,
      });
    }

    const checkPW = user.comparePassword(password);

    if (!checkPW) {
      return res.status(400).send({
        message: 'Invalid password',
        success: false,
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_TOKEN as string,
      {
        expiresIn: '1d',
      }
    );

    return res.status(200).send({
      message: 'Login successful',
      success: true,
      data: {
        user: {
          _id: user._id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          balance: user.balance,
        },
        token: token,
      },
    });
  } catch (err) {
    console.log('error', err);
    sendError(res, err);
  }
});

router
  .route('/currentUser')
  .get(checkAuth, async (req: Request, res: Response) => {
    try {
      return res.status(200).send({
        data: req.body.user,
        success: true,
        message: 'Get successful',
      });
    } catch (err) {
      sendError(res, err);
    }
  });

export default router;
