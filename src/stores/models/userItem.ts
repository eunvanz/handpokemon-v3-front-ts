import { types, Instance } from 'mobx-state-tree';
import Item from './item';

const UserItem = types.model({
  id: types.identifierNumber,
  itemId: types.number,
  userId: types.number,
  used: types.number,
  createdAt: types.string,
  updatedAt: types.string,
  item: Item,
});

export type IUserItemInstance = Instance<typeof UserItem>;

export default UserItem;
