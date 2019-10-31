import { fetchUserWithToken, fetchUserPossessions } from './userSaga';
import { call, put } from 'redux-saga/effects';
import userApi from '../api/userApi';
import { IUser } from './models/userModel';
import { receiveUser } from './userReducer';

describe('fetchUserWithToken', () => {
  const gen = fetchUserWithToken();
  it('should call api to get user with token', () => {
    expect(gen.next().value).toEqual(call(userApi.signInWithToken));
  });

  it('should receive and store user data', () => {
    const user = {} as IUser;
    expect(gen.next(user).value).toEqual(put(receiveUser(user)));
  });

  it('should fetch user possessions', () => {
    expect(gen.next().value).toEqual(fetchUserPossessions());
  });
});
