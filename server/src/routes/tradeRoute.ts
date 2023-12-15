import { Router, Request, Response } from 'express';
import Trade from '../models/TradeModel.js';
import sendError from '../libs/sendError.js';
import checkAuth from '../libs/checkAuth.js';

const router: Router = Router();

router.route('/').get(checkAuth, async (req: Request, res: Response) => {
  try {
    const data = await Trade.find({ userID: req.body.user._id });

    return res.status(200).send({
      data,
      message: 'Get successful',
      success: true,
    });
  } catch (err: any) {
    sendError(res, err);
  }
});

router.route('/sell').post(checkAuth, async (req: Request, res: Response) => {
  try {
    const { coinID, amount, price } = req.body;
    const userID = req.body.user._id;

    const convertAmount = parseInt(amount);

    if (!coinID || !amount || !price) {
      return res.status(400).send({
        success: false,
        message: 'Invalid Request',
      });
    }

    const total = convertAmount * parseFloat(price);

    const coin = await Trade.findOne({ userID, coinID });

    if (coin?.amount && convertAmount > coin.amount) {
      return res.status(400).send({
        success: false,
        message: 'Do not enough coin',
      });
    }

    if (coin && coin.amount > 1) {
      if (coin.amount === convertAmount) {
        const sell = await Trade.findOneAndDelete({
          userID,
          coinID,
        });

        res.status(200).send({
          success: true,
          message: 'Sell successful',
          data: sell,
        });
      } else {
        coin.amount = coin.amount - convertAmount;
        coin.price = coin.price - total;

        await coin.save();

        res.status(200).send({
          success: true,
          message: 'Sell successful',
          data: coin,
        });
      }
    } else {
      const sell = await Trade.findOneAndDelete({ userID, coinID });

      res.status(200).send({
        data: sell,
        message: 'Sell successful',
      });
    }

    req.body.user.balance = parseFloat(req.body.user.balance) + total;

    await req.body.user.save();
  } catch (err) {
    sendError(res, err);
  }
});

router.route('/buy').post(checkAuth, async (req: Request, res: Response) => {
  try {
    const { coinID, amount, price } = req.body;
    const userID = req.body.user._id;

    const convertAmount = parseInt(amount);

    if (!coinID || !amount || !price) {
      return res.status(400).send({
        success: false,
        message: 'Invalid Request',
      });
    }

    const total = convertAmount * parseFloat(price);

    if (total > req.body.user.balance) {
      return res.status(400).send({
        success: false,
        message: 'Not Enough money',
      });
    }

    const coin = await Trade.findOne({ userID, coinID });

    if (coin) {
      coin.amount = coin.amount + convertAmount;
      coin.price = coin.price + total;

      await coin.save();

      res.status(200).send({
        data: coin,
        success: true,
        message: 'Buy Successful',
      });
    } else {
      const buy = await Trade.create({
        userID,
        coinID,
        amount: convertAmount,
        price: total,
      });

      res.status(200).send({
        data: buy,
        success: true,
        message: 'Buy successful',
      });
    }

    req.body.user.balance = parseFloat(req.body.user.balance) - total;

    await req.body.user.save();
  } catch (err) {
    sendError(res, err);
  }
});

export default router;
