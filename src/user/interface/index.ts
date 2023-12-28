export interface IUser {
  id: number;
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
  userId: number;
  email: string;
}
