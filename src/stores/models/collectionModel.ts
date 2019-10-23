import { IUser } from './userModel';
import { IMon } from './monModel';
import { IMonImage } from './monImageModel';

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
