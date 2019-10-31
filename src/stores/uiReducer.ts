import { isScreenSize, SCREEN_SIZE } from '../libs/screenSize';

export enum UiReducerAtionType {
  SHOW_DRAWER = 'SHOW_DRAWER',
}

export interface IUiReducerAction {
  type: string;
  payload: boolean;
}

export const showDrawer = (show: boolean) => {
  return {
    type: UiReducerAtionType.SHOW_DRAWER,
    payload: show,
  };
};

export interface IUiReducerState {
  isDrawerOpen: boolean;
}

const initialState = {
  isDrawerOpen: isScreenSize.largerThan(SCREEN_SIZE.MD),
};
export default (state = initialState, action: IUiReducerAction) => {
  switch (action.type) {
    case UiReducerAtionType.SHOW_DRAWER:
      return {
        ...state,
        isDrawerOpen: action.payload,
      };
    default:
      return state;
  }
};
