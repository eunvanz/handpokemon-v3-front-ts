import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  receiveUser,
  receiveUserPossessions,
  signUp,
  catchUserFailure,
  UserReducerActionTypes,
} from './userReducer';
import userApi, { IResponseSignIn } from '../api/userApi';
import { IUser } from './models/userModel';
import { ICollection } from './models/collectionModel';
import collectionApi from '../api/collectionApi';

export const fetchUserPossessions = () => {
  return all([call(fetchUserCollectionsWithToken)]);
};

export function* fetchUserWithToken() {
  try {
    const user: IUser = yield call(userApi.signInWithToken);
    yield put(receiveUser(user));
    yield fetchUserPossessions();
  } catch (error) {
    yield put(catchUserFailure(error.message));
  }
}

function* fetchUser(action: ReturnType<typeof signUp>) {
  try {
    let fetchApi: (args: any) => Promise<IResponseSignIn> = userApi.signIn;
    if (action.type === UserReducerActionTypes.SIGN_UP) {
      fetchApi = userApi.signUpUser;
    }
    const { token, user }: IResponseSignIn = yield call(
      fetchApi,
      action.payload
    );
    localStorage.setItem('auth', token);
    yield put(receiveUser(user));
    yield fetchUserPossessions();
  } catch (error) {
    yield put(catchUserFailure(error.message));
  }
}

function* fetchUserCollectionsWithToken() {
  try {
    const userCollections: ICollection[] = yield call(
      collectionApi.getUserCollectionsWithToken
    );
    yield put(
      receiveUserPossessions({
        key: 'collections',
        possessions: userCollections,
      })
    );
  } catch (error) {
    yield put(catchUserFailure(error.message));
  }
}

export default function* userSaga() {
  yield [
    takeLatest(
      UserReducerActionTypes.SIGN_IN_USER_WITH_TOKEN,
      fetchUserWithToken
    ),
    takeLatest(UserReducerActionTypes.SIGN_IN_USER, fetchUser),
    takeLatest(
      UserReducerActionTypes.FETCH_USER_COLLECTIONS_WITH_TOKEN,
      fetchUserCollectionsWithToken
    ),
    takeLatest(UserReducerActionTypes.SIGN_UP, fetchUser),
  ];
}
