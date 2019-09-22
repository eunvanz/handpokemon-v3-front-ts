import { types } from 'mobx-state-tree';

const Book = types.model({
  id: types.identifierNumber,
  userId: types.number,
  colId: types.number,
  attrCd: types.string,
  seq: types.number,
  createdAt: types.string,
  updatedAt: types.string,
});

export default Book;
