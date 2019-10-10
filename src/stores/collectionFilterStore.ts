import { types, SnapshotOut } from 'mobx-state-tree';
import CollectionFilter from './models/collectionFilter';

export enum FilterKey {
  gradeCd = 'gradeCd',
  mainAttrCd = 'mainAttrCd',
  subAttrCd = 'subAttrCd',
  cost = 'cost',
  rankCd = 'rankCd',
  generation = 'generation',
  evolutable = 'evolutable',
  defense = 'defense',
}

const CollectionFilterStore = types
  .model('CollectionFilterStore', {
    collectionFilter: types.maybe(CollectionFilter),
  })
  .actions(self => {
    return {
      updateFilter: (key: FilterKey, checkedList: any) => {
        if (self.collectionFilter) {
          self.collectionFilter[key] = checkedList;
        }
      },
      setFilter: (filter: any) => {
        self.collectionFilter = filter;
      },
    };
  });

export type ICollectionFilterStore = SnapshotOut<typeof CollectionFilterStore>;

export default CollectionFilterStore;
