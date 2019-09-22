import makeRequest from './makeRequest';
import { IUser } from '../stores/models/user';

interface IResponseSignIn {
  user: IUser;
  token: string;
}

export default {
  signIn: ({ email, password }: { email: string; password: string }) => {
    return makeRequest('post', 'users/sign-in', { email, password }) as Promise<
      IResponseSignIn
    >;
  },
  signInWithToken: () => {
    return makeRequest('get', 'users/token');
  },
  isDupEmail: (email: string) => {
    return makeRequest('get', `users/is-dup-email/${email}`);
  },
  isDupNickname: (nickname: string) => {
    return makeRequest('get', `users/is-dup-nickname/${nickname}`);
  },
  signUpUser: (user: IUser) => {
    return makeRequest('post', 'users', user);
  },
};
