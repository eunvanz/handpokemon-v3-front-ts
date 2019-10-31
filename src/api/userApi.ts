import makeRequest from './makeRequest';
import { IUser } from '../stores/models/userModel';

export interface IResponseSignIn {
  user: IUser;
  token: string;
}

export interface IUserApi {
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<IResponseSignIn>;
  signInWithToken: () => Promise<IUser>;
  isDupEmail: (email: string) => Promise<boolean>;
  isDupNickname: (nickname: string) => Promise<boolean>;
  signUpUser: (user: IUser) => Promise<IResponseSignIn>;
}

const userApi: IUserApi = {
  signIn: ({ email, password }: { email: string; password: string }) => {
    return makeRequest('post', 'users/sign-in', { email, password });
  },
  signInWithToken: () => {
    return makeRequest('get', 'users/token');
  },
  isDupEmail: email => {
    return makeRequest('get', `users/is-dup-email/${email}`);
  },
  isDupNickname: nickname => {
    return makeRequest('get', `users/is-dup-nickname/${nickname}`);
  },
  signUpUser: user => {
    return makeRequest('post', 'users', user);
  },
};

export default userApi;
