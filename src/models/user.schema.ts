/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
import HookNextFunction from "mongoose";

import mongoose from "mongoose";  // Add this line

export const UserSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    select: false,  // Corrected typo: Select should be select
  },
  seller: {
    type: Boolean,
    default: false,
  },
  address: {
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    country: String,
    zip: Number,
  },
  created: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next: HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
