import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer, { IUserReducerState } from './userReducer';
import uiReducer, { IUiReducerState } from './uiReducer';
import rootSaga from './rootSaga';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export interface IStoreState {
  userStore: IUserReducerState;
  uiStore: IUiReducerState;
}

const reducers = combineReducers({
  userStore: userReducer,
  uiStore: uiReducer,
});

const middlewares = [sagaMiddleware];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
