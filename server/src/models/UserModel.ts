import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import UserInterface from '../interfaces/UserInterface';

const UserSchema = new Schema(
  {
    fname: {
      type: String,
      required: [true, 'First name is required'],
    },
    lname: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already in use'],
    },
    password: {
      type: String,
      required: [true, 'Pasword is required'],
      minLength: [6, 'Password must greater or equal than 6 characters'],
      maxLength: [60, 'Password must less or equal than 60 characters'],
    },
    balance: {
      type: Number,
      default: 100000,
    },
  },
  {
    collection: 'User',
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const salt = await bcrypt.genSalt(12);

    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<UserInterface>('User', UserSchema);

export default User;
