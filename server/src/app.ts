import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './libs/connectDB.js';
import userRoute from './routes/userRoute.js';
import tradeRoute from './routes/tradeRoute.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const port = process.env.PORT || 8000;

const app: Application = express();

connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRoute);
app.use('/api/trade', tradeRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is ready on port ${port}`);
});
