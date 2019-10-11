import { IUser } from './userModel';
import { IMon } from './monModel';
import { IMonImage } from './monImageModel';
import { observable, flow } from 'mobx';
import { alertError } from '../../libs/hpUtils';
import api from '../../api/index';

export interface ICollection {
  id: number;
  userId: number;
  monId: number;
  mainAttrCd: string;
  subAttrCd?: string;
  height: number;
  weight: number;
  baseHp: number;
  basePower: number;
  baseArmor: number;
  baseDex: number;
  baseSPower: number;
  baseSArmor: number;
  baseTotal: number;
  addedHp: number;
  addedPower: number;
  addedArmor: number;
  addedDex: number;
  addedSPower: number;
  addedSArmor: number;
  addedTotal: number;
  level: number;
  rankCd: string;
  imageSeq: number;
  defense: number;
  favorite: number;
  createdAt: string;
  updatedAt: string;
  mon: IMon;
  user: IUser;
  monImages: IMonImage[];
  nextMons: IMon[];
}

export class Collection {
  @observable id: number;
  @observable userId: number;
  @observable monId: number;
  @observable mainAttrCd: string;
  @observable subAttrCd?: string;
  @observable height: number;
  @observable weight: number;
  @observable baseHp: number;
  @observable basePower: number;
  @observable baseArmor: number;
  @observable baseDex: number;
  @observable baseSPower: number;
  @observable baseSArmor: number;
  @observable baseTotal: number;
  @observable addedHp: number;
  @observable addedPower: number;
  @observable addedArmor: number;
  @observable addedDex: number;
  @observable addedSPower: number;
  @observable addedSArmor: number;
  @observable addedTotal: number;
  @observable level: number;
  @observable rankCd: string;
  @observable imageSeq: number;
  @observable defense: number;
  @observable favorite: number;
  @observable createdAt: string;
  @observable updatedAt: string;
  @observable mon: IMon;
  @observable user: IUser;
  @observable monImages: IMonImage[];
  @observable nextMons: IMon[];

  constructor(collection: ICollection) {
    this.id = collection.id;
    this.userId = collection.userId;
    this.monId = collection.monId;
    this.mainAttrCd = collection.mainAttrCd;
    this.subAttrCd = collection.subAttrCd;
    this.height = collection.height;
    this.weight = collection.weight;
    this.baseHp = collection.baseHp;
    this.basePower = collection.basePower;
    this.baseArmor = collection.baseArmor;
    this.baseDex = collection.baseDex;
    this.baseSPower = collection.baseSPower;
    this.baseSArmor = collection.baseSArmor;
    this.baseTotal = collection.baseTotal;
    this.addedHp = collection.addedHp;
    this.addedPower = collection.addedPower;
    this.addedArmor = collection.addedArmor;
    this.addedDex = collection.addedDex;
    this.addedSPower = collection.addedSPower;
    this.addedSArmor = collection.addedSArmor;
    this.addedTotal = collection.addedTotal;
    this.level = collection.level;
    this.rankCd = collection.rankCd;
    this.imageSeq = collection.imageSeq;
    this.defense = collection.defense;
    this.favorite = collection.favorite;
    this.createdAt = collection.createdAt;
    this.updatedAt = collection.updatedAt;
    this.mon = collection.mon;
    this.user = collection.user;
    this.monImages = collection.monImages;
    this.nextMons = collection.nextMons;
  }

  toggleFavorite = flow(function*() {
    try {
      yield api.collection.putCollection({
        ...this,
        favorite: this.favorite === 0 ? 1 : 0,
      });
    } catch (error) {
      alertError(error);
    }
  });
}
