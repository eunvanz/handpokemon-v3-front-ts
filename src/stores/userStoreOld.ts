import { types, SnapshotOut, cast } from 'mobx-state-tree';
import User, { IUserSnapshotIn } from './models/user';
import Collection from './models/collection';
import Book from './models/book';
import UserAchievement from './models/userAchievements';
import UserItem from './models/userItem';
import api from '../api';
import { flow } from '../libs/flow';
import { alertError } from '../libs/hpUtils';

const UserStore = types
  .model('UserStore', {
    user: types.maybe(User),
    isUserLoading: false,
    userCollections: types.maybe(types.array(Collection)),
    userBooks: types.maybe(types.array(Book)),
    userAchievements: types.maybe(types.array(UserAchievement)),
    userItems: types.maybe(types.array(UserItem)),
  })
  .actions(self => {
    const fetchUserCollectionsWithToken = flow(function*() {
      const collections = yield api.collection.getUserCollectionsWithToken();
      self.userCollections = cast(collections);
    });

    const signInUserWithToken = flow(function*() {
      self.isUserLoading = true;
      try {
        const user = yield api.user.signInWithToken();
        self.user = cast(user);
        fetchUserCollectionsWithToken();
      } catch (error) {
        alertError(error);
      } finally {
        self.isUserLoading = false;
      }
    });

    const signInUser = flow(function*({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) {
      self.isUserLoading = true;
      try {
        const { user, token } = yield api.user.signIn({
          email,
          password,
        });
        localStorage.setItem('auth', token);
        fetchUserCollectionsWithToken();
        self.user = cast(user);
      } catch (error) {
        alertError(error);
      } finally {
        self.isUserLoading = false;
      }
    });

    const signUp = flow(function*(userToPost: IUserSnapshotIn) {
      try {
        const { user, token } = yield api.user.signUpUser(userToPost);
        localStorage.setItem('auth', token);
        self.user = user;
      } catch (error) {
        alertError(error);
      }
    });

    return {
      signInUser,
      logout: () => {
        localStorage.removeItem('auth');
        self.user = undefined;
        self.userCollections = undefined;
        self.userBooks = undefined;
        self.userAchievements = undefined;
        self.userItems = undefined;
        self.isUserLoading = false;
      },
      signInUserWithToken,
      fetchUserCollectionsWithToken,
      signUp,
      afterCreate: () => {
        const auth = localStorage.getItem('auth');
        if (auth) {
          signInUserWithToken();
        }
      },
    };
  });

export type IUserStore = SnapshotOut<typeof UserStore>;

export default UserStore;
