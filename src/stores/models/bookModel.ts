import { ICollection } from './collectionModel';

export interface IBook {
  id: number;
  userId: number;
  colId: number;
  attrCd: string;
  seq: number;
  createdAt: string;
  updatedAt: string;
  col: ICollection;
}
