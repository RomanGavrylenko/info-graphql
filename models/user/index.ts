import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY_JWT } from '../../config';
import { UserBaseDocument, UserModel, UserPayload } from './types';

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  token: String,
  refreshToken: String,
});

userSchema.methods.comparePassword = async function(pass: string) {
  return await bcrypt.compare(pass, this.password);
}

userSchema.statics.createTokens = function(payload: UserPayload) {
  const token = jwt.sign( payload, SECRET_KEY_JWT, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: '3d' });
  return {
    token,
    refreshToken
  }
}

export const UserSchema = model<UserBaseDocument, UserModel>('User', userSchema);
