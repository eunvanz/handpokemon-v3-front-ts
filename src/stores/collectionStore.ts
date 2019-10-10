import { types, cast } from 'mobx-state-tree';
import Collection, { ICollectionInstance } from './models/collection';
import Mon from './models/mon';
import { flow } from '../libs/flow';
import api from '../api/index';
import { ICollectionFilterSnapshotOut } from './models/collectionFilter';
import { isCollection } from '../libs/hpUtils';

const CollectionStore = types
  .model('CollectionStore', {
    isCollectionLoaded: false,
    collections: types.optional(types.array(Collection), []),
    mons: types.maybe(types.array(Mon)),
  })
  .actions(self => {
    const setCollections = (collections: ICollectionInstance[]) => {
      self.collections = cast(collections);
      self.isCollectionLoaded = true;
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
  })
  .views(self => {
    return {
      getFilteredList: (filter: ICollectionFilterSnapshotOut) => {
        return self.collections.filter(item => {
          console.log('item', item);
          const isMatchEvolutableCondition = () => {
            console.log('filter.evolutable', filter.evolutable);
            const nextMon = item.nextMons ? item.nextMons[0] : null;
            if (
              filter.evolutable.indexOf('Y') > -1 &&
              nextMon &&
              item.level >= (nextMon.requiredLv as number)
            ) {
              return true;
            }

            if (
              filter.evolutable.indexOf('N') > -1 &&
              ((nextMon && item.level < (nextMon.requiredLv as number)) ||
                !nextMon)
            ) {
              return true;
            }
            return false;
          };
          const isMatchDefenseCondition = () => {
            if (filter.defense.indexOf('Y') > -1 && item.defense) {
              return true;
            }

            if (filter.defense.indexOf('N') > -1 && item.defense) {
              return true;
            }
            return false;
          };
          const isMatchingSubAttrCd = () => {
            if (filter.subAttrCd.indexOf('') > -1 && !item.subAttrCd)
              return true;
            return (
              item.subAttrCd && filter.subAttrCd.indexOf(item.subAttrCd) > -1
            );
          };
          const isMatchingRankCd = () => {
            if (filter.rankCd.indexOf('') > -1 && !item.rankCd) return true;
            return filter.rankCd.indexOf(item.rankCd) > -1;
          };

          const mon = isCollection(item) ? item.mon : item;

          return (
            filter.gradeCd.indexOf(mon.gradeCd) > -1 &&
            (filter.mainAttrCd.indexOf(item.mainAttrCd) > -1 ||
              isMatchingSubAttrCd()) &&
            filter.cost.indexOf(mon.cost) > -1 &&
            filter.generation.indexOf(mon.generation) > -1 &&
            isMatchingRankCd() &&
            isMatchEvolutableCondition() &&
            isMatchDefenseCondition()
          );
        });
      },
    };
  });

export default CollectionStore;
