import { combineReducers, applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './userReducer';
import uiReducer from './uiReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export type IStoreState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  userStore: userReducer,
  uiStore: uiReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
