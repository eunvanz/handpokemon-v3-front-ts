import { types, SnapshotOut } from 'mobx-state-tree';
import FilterItem from './filterItem';

const CollectionFilter = types.model('CollectionFilter', {
  has: types.maybe(types.array(FilterItem)),
  gradeCd: types.maybe(types.array(FilterItem)),
  mainAttrCd: types.maybe(types.array(FilterItem)),
  subAttrCd: types.maybe(types.array(FilterItem)),
  cost: types.maybe(types.array(FilterItem)),
  rankCd: types.maybe(types.array(FilterItem)),
  generation: types.maybe(types.array(FilterItem)),
  evolutable: types.maybe(types.array(FilterItem)),
  defense: types.maybe(types.array(FilterItem)),
});

export type ICollectionFilter = SnapshotOut<typeof CollectionFilter>;

export default CollectionFilter;
