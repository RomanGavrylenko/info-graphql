import { Model, Document } from "mongoose";

interface User {
    username: string;
    password: string;
    email?: string;
    createdAt: string;
    token: string | null;
    refreshToken: string | null;
  }
  
  export interface UserPayload {
    username: string;
    id: string;
  }
  
  interface UserTokens {
    token: string;
    refreshToken: string;
  }
  
  export interface UserBaseDocument extends User, Document {
    comparePassword(s: string): boolean;
  }
  
  export interface UserModel extends Model<UserBaseDocument> {
    createTokens(d: UserPayload): UserTokens;
  }