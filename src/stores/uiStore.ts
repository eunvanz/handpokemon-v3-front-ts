import { types } from 'mobx-state-tree';

const UiStore = types
  .model('UiStore', {
    isDrawerOpen: types.optional(types.boolean, false),
  })
  .actions(self => ({
    showDrawer: () => {
      self.isDrawerOpen = true;
    },
    hideDrawer: () => {
      self.isDrawerOpen = false;
    },
  }));

export default UiStore;
