import { types, SnapshotOut, Instance } from 'mobx-state-tree';

const Code = types.model('Code', {
  masterCd: types.string,
  masterCdNm: types.string,
  detailCd: types.string,
  detailCdNm: types.string,
  createdAt: types.string,
  updatedAt: types.string,
});

export type ICodeSnapshotOut = SnapshotOut<typeof Code>;
export type ICodeInstance = Instance<typeof Code>;

export default Code;
