import produce from 'immer';
import { createAction, ActionType } from 'typesafe-actions';
import { IUser } from './models/userModel';
import { ICollection } from './models/collectionModel';
import { IBook } from './models/bookModel';
import { IUserItem } from './models/userItemModel';
import { IUserAchievement } from './models/userAchievementModel';

const RECEIVE_USER = 'user/RECEIVE_USER';
const RECEIVE_USER_POSSESSIONS = 'user/RECEIVE_USER_POSSESSIONS';
const CLEAR_USER = 'user/CLEAR_USER';
const SIGN_IN_USER_WITH_TOKEN = 'user/SIGN_IN_USER_WITH_TOKEN';
const SIGN_IN_USER = 'user/SIGN_IN_USER';
const SIGN_UP = 'user/SIGN_UP';
const CATCH_USER_FAILURE = 'user/CATCH_USER_FAILURE';
const CLEAR_USER_FAILURE = 'user/CLEAR_USER_FAILURE';
const FETCH_USER_COLLECTIONS_WITH_TOKEN =
  'user/FETCH_USER_COLLECTIONS_WITH_TOKEN';
const FETCH_USER_BOOKS_WITH_TOKEN = 'user/FETCH_USER_BOOKS_WITH_TOKEN';
const FETCH_USER_ACHIEVEMENTS_WITH_TOKEN =
  'user/FETCH_USER_ACHIEVEMENTS_WITH_TOKEN';
const FETCH_USER_ITEMS_WITH_TOKEN = 'user/FETCH_USER_ITEMS_WITH_TOKEN';

export const UserReducerActionTypes = {
  RECEIVE_USER,
  RECEIVE_USER_POSSESSIONS,
  CLEAR_USER,
  SIGN_IN_USER,
  SIGN_IN_USER_WITH_TOKEN,
  SIGN_UP,
  CATCH_USER_FAILURE,
  CLEAR_USER_FAILURE,
  FETCH_USER_ACHIEVEMENTS_WITH_TOKEN,
  FETCH_USER_COLLECTIONS_WITH_TOKEN,
  FETCH_USER_ITEMS_WITH_TOKEN,
  FETCH_USER_BOOKS_WITH_TOKEN,
};

export type IUserReducerActionType = ActionType<typeof actions>;

export type IUserReducerAction =
  | ReturnType<typeof receiveUser>
  | ReturnType<typeof clearUser>
  | ReturnType<typeof signInUser>
  | ReturnType<typeof signInUserWithToken>
  | ReturnType<typeof signUp>
  | ReturnType<typeof catchUserFailure>
  | ReturnType<typeof clearUserFailure>
  | ReturnType<typeof receiveUserPossessions>;

export const receiveUser = createAction(RECEIVE_USER)<IUser>();

export const clearUser = createAction(CLEAR_USER)();

export interface ISignInUserArgs {
  email: string;
  password: string;
}

export const signInUser = createAction(SIGN_IN_USER)<ISignInUserArgs>();

export const signInUserWithToken = createAction(SIGN_IN_USER_WITH_TOKEN)();

export const signUp = createAction(SIGN_UP)<IUser>();

export const clearUserFailure = createAction(CLEAR_USER_FAILURE)();

export interface IReceiveUserPossessionsArgs {
  key: keyof IUser;
  possessions: ICollection[] | IBook[] | IUserItem[] | IUserAchievement[];
}

export const receiveUserPossessions = createAction(RECEIVE_USER_POSSESSIONS)<
  IReceiveUserPossessionsArgs
>();

export const catchUserFailure = createAction(CATCH_USER_FAILURE)<string>();

export const fetchUserCollectionsWithToken = createAction(
  FETCH_USER_COLLECTIONS_WITH_TOKEN
)();

const actions = {
  signInUser,
  signInUserWithToken,
  signUp,
  clearUserFailure,
  receiveUserPossessions,
  fetchUserCollectionsWithToken,
};

export interface IUserReducerState {
  isLoading: boolean;
  hasError: boolean;
  errorMsg?: string;
  user: IUser | undefined;
}
const initialState: IUserReducerState = {
  isLoading: false,
  hasError: false,
  errorMsg: undefined,
  user: undefined,
};

export default (state = initialState, action: IUserReducerAction) => {
  switch (action.type) {
    case SIGN_IN_USER:
    case SIGN_UP:
    case SIGN_IN_USER_WITH_TOKEN:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: undefined,
        isLoading: false,
      };
    case CATCH_USER_FAILURE:
      return {
        ...state,
        hasError: true,
        errorMsg: action.payload,
        isLoading: false,
      };
    case CLEAR_USER_FAILURE:
      return {
        ...state,
        hasError: false,
        errorMsg: undefined,
        isLoading: false,
      };
    case RECEIVE_USER_POSSESSIONS:
      return produce(state, (draftState: any) => {
        if (
          draftState.user &&
          (action.payload.key === 'collections' ||
            action.payload.key === 'books' ||
            action.payload.key === 'achievements' ||
            action.payload.key === 'items')
        ) {
          draftState.user[action.payload.key] = action.payload.possessions;
        }
      });
    default:
      return state;
  }
};
