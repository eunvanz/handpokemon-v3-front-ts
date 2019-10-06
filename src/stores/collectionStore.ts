import { types, cast } from 'mobx-state-tree';
import Collection, { ICollectionSnapshotOut } from './models/collection';
import Mon from './models/mon';
import { flow } from '../libs/flow';
import api from '../api/index';

const CollectionStore = types
  .model('CollectionStore', {
    collections: types.maybe(types.array(Collection)),
    mons: types.maybe(types.array(Mon)),
  })
  .actions(self => {
    const setCollections = (collections: ICollectionSnapshotOut[]) => {
      self.collections = cast(collections);
    };

    const fetchMons = flow(function*() {
      const mons = yield api.mon.getAllMons();
      self.mons = cast(mons);
    });

    return {
      setCollections,
      afterCreate: () => {
        fetchMons();
      },
    };
  });

export default CollectionStore;
