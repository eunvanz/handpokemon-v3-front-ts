import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  UserReducerActionType,
  receiveUser,
  receiveUserPossessions,
} from './userReducer';
import userApi, { IResponseSignIn } from '../api/userApi';
import { IUser } from './models/userModel';
import { ICollection } from './models/collectionModel';
import collectionApi from '../api/collectionApi';

const catchError = (error: Error) =>
  put({
    type: UserReducerActionType.CATCH_USER_FAILURE,
    payload: error.message,
  });

export const fetchUserPossessions = () => {
  return all([call(fetchUserCollectionsWithToken)]);
};

export function* fetchUserWithToken() {
  try {
    const user: IUser = yield call(userApi.signInWithToken);
    yield put(receiveUser(user));
    yield fetchUserPossessions();
  } catch (error) {
    yield catchError(error);
  }
}

function* fetchUser(action: any) {
  try {
    const { token, user }: IResponseSignIn = yield call(
      userApi.signIn,
      action.payload
    );
    localStorage.setItem('auth', token);
    yield put(receiveUser(user));
    yield fetchUserPossessions();
  } catch (error) {
    yield catchError(error);
  }
}

function* fetchUserCollectionsWithToken() {
  try {
    const userCollections: ICollection[] = yield call(
      collectionApi.getUserCollectionsWithToken
    );
    yield put(receiveUserPossessions('collections', userCollections));
  } catch (error) {
    yield catchError(error);
  }
}

export default function* userSaga() {
  yield [
    takeLatest(
      UserReducerActionType.SIGN_IN_USER_WITH_TOKEN,
      fetchUserWithToken
    ),
    takeLatest(UserReducerActionType.SIGN_IN_USER, fetchUser),
    takeLatest(
      UserReducerActionType.FETCH_USER_COLLECTIONS_WITH_TOKEN,
      fetchUserCollectionsWithToken
    ),
  ];
}
