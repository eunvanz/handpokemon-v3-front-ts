import makeRequest from './makeRequest';
import { IUserSnapshotOut, IUserSnapshotIn } from '../stores/models/user';

interface IResponseSignIn {
  user: IUserSnapshotOut;
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
  signInWithToken: () => Promise<IUserSnapshotOut>;
  isDupEmail: (email: string) => Promise<boolean>;
  isDupNickname: (nickname: string) => Promise<boolean>;
  signUpUser: (user: IUserSnapshotIn) => Promise<IResponseSignIn>;
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
