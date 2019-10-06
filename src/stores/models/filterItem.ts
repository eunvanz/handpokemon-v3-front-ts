import { types, SnapshotOut } from 'mobx-state-tree';

const FilterItem = types.model('FilterItem', {
  label: types.string,
  value: types.union(types.string, types.number),
});

export type FilterItem = SnapshotOut<typeof FilterItem>;

export default FilterItem;
