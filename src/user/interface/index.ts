import * as jwt from 'jsonwebtoken';

export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IGetToken {
  userId: string;
  email: string;
}

export interface IVerifyTokenResponse {
  payload?: IToken;
  isValid: boolean;
}

export interface IToken extends jwt.JwtPayload, IGetToken {}
