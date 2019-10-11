import { observable, action, flow } from 'mobx';
import { ICollection } from './models/collectionModel';
import { ICollectionFilter } from './models/collectionFilterModel';
import { IMon } from './models/monModel';
import api from '../api/index';
import { alertError } from '../libs/hpUtils';

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

export default class CollectionStore {
  @observable collections?: ICollection[] = undefined;
  @observable mons?: IMon[] = undefined;
  @observable collectionFilter?: ICollectionFilter = undefined;

  constructor() {
    this.fetchMons();
  }

  fetchMons = flow(function*() {
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
}
