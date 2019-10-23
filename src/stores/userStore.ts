import { observable, flow, action } from 'mobx';
import api from '../api/index';
import { IUser } from './models/userModel';
import { alertError } from '../libs/hpUtils';
import { IResponseSignIn } from '../api/userApi';

export default class UserStore {
  @observable user?: IUser = undefined;
  @observable isLoading: boolean = false;

  constructor() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      this.signInUserWithToken();
    }
  }

  @action
  fetchUserCollectionsWithToken = flow(function*(this: UserStore) {
    try {
      this.isLoading = true;
      if (this.user) {
        const collections = yield api.collection.getUserCollectionsWithToken();
        this.user.collections = collections;
      }
    } catch (error) {
      alertError(error);
    } finally {
      this.isLoading = false;
    }
  });

  @action
  signInUserWithToken = flow(function*(this: UserStore) {
    try {
      this.isLoading = true;
      const user = yield api.user.signInWithToken();
      this.user = user;
      this.fetchUserCollectionsWithToken();
    } catch (error) {
      alertError(error);
    } finally {
      this.isLoading = false;
    }
  });

  @action
  signInUser = flow(function*(
    this: UserStore,
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    }
  ): Generator<Promise<IResponseSignIn>, void, any> {
    try {
      this.isLoading = true;
      const { user, token } = yield api.user.signIn({
        email,
        password,
      });
      localStorage.setItem('auth', token);
      this.fetchUserCollectionsWithToken();
      this.user = user;
    } catch (error) {
      alertError(error);
    } finally {
      this.isLoading = false;
    }
  });

  @action
  signUp = flow(function*(
    this: UserStore,
    userToPost: IUser
  ): Generator<Promise<IResponseSignIn>, void, any> {
    try {
      this.isLoading = true;
      const { user, token } = yield api.user.signUpUser(userToPost);
      localStorage.setItem('auth', token);
      this.user = user;
    } catch (error) {
      alertError(error);
    } finally {
      this.isLoading = false;
    }
  });

  @action
  logout = () => {
    this.user = undefined;
    localStorage.removeItem('auth');
  };
}
