import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/UserModel.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB as string);

    await User.deleteMany();

    console.log('Users deleted');
    await User.create({
      email: 'test@test.com',
      password: 'password123',
      fname: 'Test',
      lname: 'User',
    });

    console.log('User seeded');

    mongoose.disconnect();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();
