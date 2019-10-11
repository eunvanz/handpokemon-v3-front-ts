import { observable, action } from 'mobx';
import { isScreenSize } from '../libs/screenSize';
import { DRAWER_DEFAULT_OPEN_SCREEN_SIZE } from '../constants/styles';

export default class UiStore {
  @observable isDrawerOpen = false;

  constructor() {
    this.isDrawerOpen = isScreenSize.largerThan(
      DRAWER_DEFAULT_OPEN_SCREEN_SIZE
    );
  }

  @action
  showDrawer = () => (this.isDrawerOpen = true);

  @action
  hideDrawer = () => (this.isDrawerOpen = false);
}
