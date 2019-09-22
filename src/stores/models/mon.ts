import { types, SnapshotOut } from 'mobx-state-tree';

const Mon = types.model('Mon', {
  id: types.identifierNumber,
  name: types.string,
  cost: types.number,
  mainAttrCd: types.string,
  subAttrCd: types.maybeNull(types.string),
  prevMonId: types.maybeNull(types.number),
  gradeCd: types.string,
  description: types.string,
  generation: types.number,
  height: types.number,
  weight: types.number,
  point: types.number,
  hp: types.number,
  power: types.number,
  armor: types.number,
  dex: types.number,
  sPower: types.number,
  sArmor: types.number,
  total: types.number,
  requiredLv: types.maybeNull(types.number),
  createdAt: types.string,
  updatedAt: types.string,
});

export type IMon = SnapshotOut<typeof Mon>;

export default Mon;
