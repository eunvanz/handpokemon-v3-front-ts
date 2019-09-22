import { types } from 'mobx-state-tree';

const MonImage = types.model({
  id: types.identifierNumber,
  url: types.string,
  monId: types.number,
  seq: types.number,
  designer: types.string,
  createdAt: types.string,
  updatedAt: types.string,
});

export default MonImage;
