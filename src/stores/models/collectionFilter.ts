import { types, SnapshotOut, Instance, cast } from 'mobx-state-tree';
import { FilterKey } from '../collectionFilterStore';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const CollectionFilter = types
  .model('CollectionFilter', {
    has: types.array(types.string),
    gradeCd: types.array(types.string),
    mainAttrCd: types.array(types.string),
    subAttrCd: types.array(types.string),
    cost: types.array(types.number),
    rankCd: types.array(types.string),
    generation: types.array(types.number),
    evolutable: types.array(types.string),
    defense: types.array(types.string),
    disabled: types.array(types.string), // disable된 keys
  })
  .actions(self => {
    return {
      setDisabled: (disabledKeys: FilterKey[]) => {
        self.disabled = cast(disabledKeys);
      },
      setFilterValue: (key: FilterKey, value: CheckboxValueType[]) => {
        self[key] = cast(value);
      },
    };
  });

export type ICollectionFilterSnapshotOut = SnapshotOut<typeof CollectionFilter>;
export type ICollectionFilterInstance = Instance<typeof CollectionFilter>;

export default CollectionFilter;
