import { types, SnapshotOut } from 'mobx-state-tree';

const Code = types.model('Code', {
  masterCd: types.string,
  masterCdNm: types.string,
  detailCd: types.string,
  detailCdNm: types.string,
  createdAt: types.string,
  updatedAt: types.string,
});

export type ICode = SnapshotOut<typeof Code>;

export default Code;
