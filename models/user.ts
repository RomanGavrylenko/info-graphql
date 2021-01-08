import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
});

const user = model('User', userSchema);

export default user;