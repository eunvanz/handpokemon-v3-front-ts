import { types, SnapshotOut } from 'mobx-state-tree';
import Collection from './collection';

const Book = types.model({
  id: types.identifierNumber,
  userId: types.number,
  colId: types.number,
  attrCd: types.string,
  seq: types.number,
  createdAt: types.string,
  updatedAt: types.string,
  col: Collection,
});

export type IBook = SnapshotOut<typeof Book>;

export default Book;
