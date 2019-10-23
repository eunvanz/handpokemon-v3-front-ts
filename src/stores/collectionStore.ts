import { observable, action, flow, computed, toJS } from 'mobx';
import { ICollection } from './models/collectionModel';
import { ICollectionFilter } from './models/collectionFilterModel';
import { IMon } from './models/monModel';
import api from '../api/index';
import { alertError, isCollection } from '../libs/hpUtils';
import orderBy from 'lodash/orderBy';
import { IAchievementDiff } from '../api/collectionApi';

export enum CollectionFilterKey {
  has = 'has',
  gradeCd = 'gradeCd',
  mainAttrCd = 'mainAttrCd',
  subAttrCd = 'subAttrCd',
  cost = 'cost',
  rankCd = 'rankCd',
  generation = 'generation',
  evolutable = 'evolutable',
  defense = 'defense',
}

export interface IPickResult {
  prevUserCollections: ICollection[];
  picks: ICollection[];
  achievements: IAchievementDiff[];
}

export enum CollectionModes {
  general = 'general',
  mix = 'mix',
}

export default class CollectionStore {
  @observable collections?: ICollection[] = undefined;
  @observable mons?: IMon[] = undefined;
  @observable collectionFilter?: ICollectionFilter = undefined;
  @observable selected: ICollection[] = [];
  @observable pickResult?: IPickResult = undefined;
  @observable mode: CollectionModes = CollectionModes.general;

  constructor() {
    this.fetchMons();
  }

  @action
  fetchMons = flow(function*(this: CollectionStore) {
    try {
      const mons = yield api.mon.getAllMons();
      this.mons = mons;
    } catch (error) {
      alertError(error);
    }
  });

  @action
  updateCollectionFilter = (key: CollectionFilterKey, checkedList: any) => {
    if (this.collectionFilter) {
      this.collectionFilter[key] = checkedList;
    }
  };

  @action
  setCollectionFilter = (filter: ICollectionFilter) => {
    this.collectionFilter = filter;
  };

  @action
  setCollections = (collections: ICollection[]) => {
    this.collections = collections;
  };

  @action
  toggleFavorite = flow(function*(collection: ICollection) {
    try {
      collection.favorite = collection.favorite === 1 ? 0 : 1;
      yield api.collection.putCollection(collection);
    } catch (error) {
      alertError(error);
    }
  });

  @action
  selectCollectionToMix = (col: ICollection) => {
    this.selected = [col];
    this.mode = CollectionModes.mix;
  };

  @action
  mixCollections = flow(function*(
    this: CollectionStore,
    collectionIds: Number[]
  ): Generator<Promise<any>, void, any> {
    try {
      const { picks, achievements } = yield api.collection.getMixedCollection(
        collectionIds
      );
      this.pickResult = {
        prevUserCollections: toJS(this.collections) || [],
        picks,
        achievements,
      };
      this.collections = yield api.collection.getUserCollectionsWithToken();
    } catch (error) {
      alertError(error);
    }
  });

  @action
  evoluteCollection = flow(function*(
    this: CollectionStore,
    collectionId: Number
  ): Generator<Promise<any>, void, any> {
    try {
      const {
        picks,
        achievements,
      } = yield api.collection.getEvolutedCollection(collectionId);
      this.pickResult = {
        prevUserCollections: toJS(this.collections) || [],
        picks,
        achievements,
      };
      this.collections = yield api.collection.getUserCollectionsWithToken();
    } catch (error) {
      alertError(error);
    }
  });

  @action
  cancelMix = () => {
    this.selected = [];
    this.mode = CollectionModes.general;
  };

  @computed
  get composedList() {
    const { mons, collections, selected, mode } = this;
    if (mons && collections) {
      const list = mons.map(item => {
        const collection = collections.filter(col => col.monId === item.id)[0];
        if (collection) {
          return collection;
        } else {
          return item;
        }
      });
      if (mode === CollectionModes.mix) {
        return list.filter(item => item.id !== selected[0].id);
      } else if (selected.length > 0) {
        // selected에 존재하는 콜렉션을 앞쪽에 정렬
        return orderBy(list, (item: ICollection | IMon) =>
          selected.filter(selectedMon => selectedMon.id !== item.id)
        );
      } else {
        return list;
      }
    } else {
      return [];
    }
  }

  @computed
  get filteredList() {
    if (this.collectionFilter && this.collections) {
      const filter = this.collectionFilter;
      return this.composedList.filter((item: ICollection | IMon) => {
        const isMatchHasCondition = () => {
          if (filter.has.indexOf('Y') > -1 && isCollection(item)) return true;
          if (filter.has.indexOf('N') > -1 && !isCollection(item)) return true;
          return false;
        };
        const isMatchEvolutableCondition = () => {
          if (isCollection(item)) {
            const nextMon = item.nextMons.length > 0 ? item.nextMons[0] : null;
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
          } else if (filter.evolutable.includes('N')) {
            return true;
          } else {
            return false;
          }
        };
        const isMatchDefenseCondition = () => {
          if (isCollection(item)) {
            if (filter.defense.includes('Y') && item.defense) {
              return true;
            }
            if (filter.defense.includes('N') && !item.defense) {
              return true;
            }
          } else if (filter.defense.includes('N')) {
            return true;
          } else {
            return false;
          }
        };
        const isMatchingSubAttrCd = () => {
          if (filter.subAttrCd.includes('') && !item.subAttrCd) return true;
          return (
            item.subAttrCd && filter.subAttrCd.indexOf(item.subAttrCd) > -1
          );
        };
        const isMatchingRankCd = () => {
          if (isCollection(item)) {
            return filter.rankCd.includes(item.rankCd);
          } else if (filter.rankCd.includes('')) {
            return true;
          } else {
            return false;
          }
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
          isMatchDefenseCondition() &&
          isMatchHasCondition()
        );
      });
    } else {
      return [];
    }
  }
}
