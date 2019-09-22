import { types, SnapshotOut } from 'mobx-state-tree';
import Mon from './mon';
import User from './user';
import MonImage from './monImage';

const Collection = types.model('Collection', {
  id: types.identifierNumber,
  userId: types.number,
  monId: types.number,
  mainAttrCd: types.string,
  subAttrCd: types.maybeNull(types.string),
  height: types.number,
  weight: types.number,
  baseHp: types.number,
  basePower: types.number,
  baseArmor: types.number,
  baseDex: types.number,
  baseSPower: types.number,
  baseSArmor: types.number,
  baseTotal: types.number,
  addedHp: types.number,
  addedPower: types.number,
  addedArmor: types.number,
  addedDex: types.number,
  addedSPower: types.number,
  addedSArmor: types.number,
  addedTotal: types.number,
  level: types.number,
  rankCd: types.string,
  imageSeq: types.number,
  defense: types.number,
  favorite: types.number,
  createdAt: types.string,
  updatedAt: types.string,
  mon: Mon,
  user: User,
  monImages: types.array(MonImage),
  nextMons: types.array(Mon),
});

export type ICollection = SnapshotOut<typeof Collection>;

export default Collection;
