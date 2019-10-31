import { ICode } from './models/codeModel';

export enum CodeReducerActionType {
  RECEIVE_CODES = 'RECEIVE_CODES',
}

export interface ICodeReducerAction {
  type: CodeReducerActionType;
  payload: any;
}

export const receiveCode = (codes = null) => {
  return {
    type: CodeReducerActionType,
    payload: codes,
  };
};

const initialState: null | ICode = null;
export default (state = initialState, action: ICodeReducerAction) => {
  switch (action.type) {
    case CodeReducerActionType.RECEIVE_CODES:
      return action.payload;
  }
};
