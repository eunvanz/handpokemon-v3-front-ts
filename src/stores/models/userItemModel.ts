import { IItem } from './itemModel';

export interface IUserItem {
  id: number;
  itemId: number;
  userId: number;
  used: number;
  createdAt: string;
  updatedAt: string;
  item: IItem;
}
