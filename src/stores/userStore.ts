import { types, SnapshotOut } from 'mobx-state-tree';
import User, { IUser } from './models/user';
import Collection from './models/collection';
import Book from './models/book';
import UserAchievement from './models/userAchievements';
import UserItem from './models/userItem';
import api from '../api';
import { flow } from '../libs/flow';

const UserStore = types
  .model('UserStore', {
    user: types.maybe(User),
    isUserLoading: false,
    userCollections: types.maybe(types.array(Collection)),
    userBooks: types.maybe(types.array(Book)),
    userAchievements: types.maybe(types.array(UserAchievement)),
    userItems: types.maybe(types.array(UserItem)),
  })
  .actions(self => ({
    signInUser: flow(function*({
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
        }) as Promise<any>;
        localStorage.setItem('auth', token);
        yield api.collection.getUserCollctionsWithToken();
        self.user = user;
        self.isUserLoading = false;
      } catch (error) {
        self.isUserLoading = false;
        throw error;
      }
    }),
    logout: () => {
      localStorage.removeItem('auth');
      self.user = undefined;
      self.userCollections = undefined;
      self.userBooks = undefined;
      self.userAchievements = undefined;
      self.userItems = undefined;
      self.isUserLoading = false;
    },
    signInUserWithToken: flow(function*() {
      self.isUserLoading = true;
      self.user = yield api.user.signInWithToken() as Promise<IUser>;
      yield api.collection.getUserCollctionsWithToken();
      self.isUserLoading = false;
    }),
    fetchUserCollectionsWithToken: flow(function*() {
      self.userCollections = yield api.collection.getUserCollctionsWithToken();
    }),
    signUp: flow(function*(userToPost: IUser) {
      const { user, token } = yield api.user.signUpUser(userToPost);
      localStorage.setItem('auth', token);
      self.user = user;
      self.userCollections = yield api.collection.getUserCollctionsWithToken();
    }),
  }));

export type IUserStore = SnapshotOut<typeof UserStore>;

export default UserStore;
