import makeInspectable from 'mobx-devtools-mst';
import UiStore from './uiStore';
import UserStore from './userStore';
import { isScreenSize } from '../libs/screenSize';
import { DRAWER_DEFAULT_OPEN_SCREEN_SIZE } from '../constants/styles';
import CodeStore from './codeStore';
import CollectionFilterStore from './collectionFilterStore';
import CollectionStore from './collectionStore';

const store = {
  uiStore: UiStore.create({
    isDrawerOpen: isScreenSize.largerThan(DRAWER_DEFAULT_OPEN_SCREEN_SIZE),
  }),
  userStore: UserStore.create(),
  codeStore: CodeStore.create(),
  collectionFilterStore: CollectionFilterStore.create(),
  collectionStore: CollectionStore.create(),
};

if (process.env.NODE_ENV === 'development') {
  makeInspectable(store);
}

export default store;
