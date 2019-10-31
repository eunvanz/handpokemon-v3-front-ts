import produce from 'immer';
import { IUser } from './models/userModel';
import { ICollection } from './models/collectionModel';
import { IBook } from './models/bookModel';
import { IUserItem } from './models/userItemModel';
import { IUserAchievement } from './models/userAchievementModel';

export enum UserReducerActionType {
  RECEIVE_USER = 'RECEIVE_USER',
  RECEIVE_USER_POSSESSIONS = 'RECEIVE_USER_POSSESSIONS',
  CLEAR_USER = 'CLEAR_USER',
  SIGN_IN_USER_WITH_TOKEN = 'SIGN_IN_USER_WITH_TOKEN',
  SIGN_IN_USER = 'SIGN_IN_USER',
  SIGN_UP = 'SIGN_UP',
  CATCH_USER_FAILURE = 'CATCH_USER_FAILURE',
  CLEAR_USER_FAILURE = 'CLEAR_USER_FAILURE',
  FETCH_USER_COLLECTIONS_WITH_TOKEN = 'FETCH_USER_COLLECTIONS_WITH_TOKEN',
  FETCH_USER_BOOKS_WITH_TOKEN = 'FETCH_USER_BOOKS_WITH_TOKEN',
  FETCH_USER_ACHIEVEMENTS_WITH_TOKEN = 'FETCH_USER_ACHIEVEMENTS_WITH_TOKEN',
  FETCH_USER_ITEMS_WITH_TOKEN = 'FETCH_USER_ITEMS_WITH_TOKEN',
}

export interface IUserReducerAction {
  type: UserReducerActionType;
  payload?: any;
  key?: string;
}

export const receiveUser = (user: IUser) => {
  return {
    type: UserReducerActionType.RECEIVE_USER,
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: UserReducerActionType.CLEAR_USER,
  };
};

export interface ISignInUserArgs {
  email: string;
  password: string;
}

export const signInUser = ({ email, password }: ISignInUserArgs) => {
  return {
    type: UserReducerActionType.SIGN_IN_USER,
    payload: { email, password },
  };
};

export const signInUserWithToken = () => {
  return {
    type: UserReducerActionType.SIGN_IN_USER_WITH_TOKEN,
  };
};

export const signUp = (user: IUser) => {
  return {
    type: UserReducerActionType.SIGN_UP,
    payload: user,
  };
};

export const clearUserFailure = () => {
  return {
    type: UserReducerActionType.CLEAR_USER_FAILURE,
  };
};

export const receiveUserPossessions = (
  key: keyof IUser,
  possessions: ICollection[] | IBook[] | IUserItem[] | IUserAchievement[]
) => {
  return {
    type: UserReducerActionType.RECEIVE_USER_POSSESSIONS,
    key,
    payload: possessions,
  };
};

export interface IUserReducerState {
  isProceeding: boolean;
  hasError: boolean;
  errorMsg?: string;
  user: IUser | undefined;
}
const initialState: IUserReducerState = {
  isProceeding: false,
  hasError: false,
  errorMsg: undefined,
  user: undefined,
};
export default (state = initialState, action: IUserReducerAction) => {
  switch (action.type) {
    case UserReducerActionType.RECEIVE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UserReducerActionType.CLEAR_USER:
      return {
        ...state,
        user: undefined,
      };
    case UserReducerActionType.CATCH_USER_FAILURE:
      return {
        ...state,
        hasError: true,
        errorMsg: action.payload,
      };
    case UserReducerActionType.CLEAR_USER_FAILURE:
      return {
        ...state,
        hasError: false,
        errorMsg: undefined,
      };
    case UserReducerActionType.RECEIVE_USER_POSSESSIONS:
      return produce(state, draftState => {
        if (
          draftState.user &&
          (action.key === 'collections' ||
            action.key === 'books' ||
            action.key === 'achievements' ||
            action.key === 'items')
        ) {
          draftState.user[action.key] = action.payload;
        }
      });
    default:
      return state;
  }
};
