import userSaga from './userSaga';

export default function* rootSaga() {
  yield [userSaga];
}
