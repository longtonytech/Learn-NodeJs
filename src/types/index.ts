export type IUser = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type IWallet = {
  id?: string;
  userId?: string;
  walletAddress?: string;
  amountOfMoney?: string;
  privateKey?: string;
};
export type IApplication = {
  id?: string;
  name?: string;
  deviceId?: string;
  userId?: string;
};
export type IApplicationWallet = {
  id?: string;
  name?: string;
  userId?: string;
  walletId?: string;
  applicationId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type IResponse = {
  user?: IUser;
  wallet?: IWallet;
  application?: IApplication;
  error?: unknown | boolean;
};
export type IRequestType = {
  userId?: string;
};
