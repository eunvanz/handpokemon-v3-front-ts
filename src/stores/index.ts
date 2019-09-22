import makeInspectable from 'mobx-devtools-mst';
import UiStore from './uiStore';
import UserStore from './userStore';
import { isScreenSize } from '../libs/screenSize';
import { DRAWER_DEFAULT_OPEN_SCREEN_SIZE } from '../constants/styles';
import CodeStore from './codeStore';

const store = {
  uiStore: UiStore.create({
    isDrawerOpen: isScreenSize.largerThan(DRAWER_DEFAULT_OPEN_SCREEN_SIZE),
  }),
  userStore: UserStore.create(),
  codeStore: CodeStore.create(),
};

makeInspectable(store);

export default store;
