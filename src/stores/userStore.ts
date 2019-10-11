import { observable, flow, action } from 'mobx';
import api from '../api/index';
import { IUser } from './models/userModel';
import { ICollection } from './models/collectionModel';
import { IBook } from './models/bookModel';
import { IAchievement } from './models/achievementModel';
import { IUserItem } from './models/userItemModel';
import { alertError } from '../libs/hpUtils';

export default class UserStore {
  @observable user?: IUser = undefined;
  @observable userCollections?: ICollection[] = undefined;
  @observable userBooks?: IBook = undefined;
  @observable userAchievements?: IAchievement[] = undefined;
  @observable userItem?: IUserItem = undefined;

  constructor() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      this.signInUserWithToken();
    }
  }

  fetchUserCollectionsWithToken = flow(function*() {
    try {
      const collections = yield api.collection.getUserCollectionsWithToken();
      this.userCollections = collections;
    } catch (error) {
      alertError(error);
    }
  });

  signInUserWithToken = flow(function*() {
    try {
      const user = yield api.user.signInWithToken();
      this.user = user;
      this.fetchUserCollectionsWithToken();
    } catch (error) {
      alertError(error);
    }
  });

  signInUser = flow(function*({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const { user, token } = yield api.user.signIn({
        email,
        password,
      });
      localStorage.setItem('auth', token);
      this.fetchUserCollectionsWithToken();
      this.user = user;
    } catch (error) {
      alertError(error);
    }
  });

  signUp = flow(function*(userToPost: IUser) {
    try {
      const { user, token } = yield api.user.signUpUser(userToPost);
      localStorage.setItem('auth', token);
      this.user = user;
    } catch (error) {
      alertError(error);
    }
  });

  @action
  logout = () => {
    this.user = undefined;
    this.userCollections = undefined;
    this.userBooks = undefined;
    this.userAchievements = undefined;
    this.userItem = undefined;
    localStorage.removeItem('auth');
  };
}
