import UiStore from './uiStore';
import UserStore from './userStore';
import CodeStore from './codeStore';
import CollectionStore from './collectionStore';

const store = {
  uiStore: new UiStore(),
  userStore: new UserStore(),
  codeStore: new CodeStore(),
  collectionStore: new CollectionStore(),
};

export default store;
