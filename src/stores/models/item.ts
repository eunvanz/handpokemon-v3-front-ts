import { types } from 'mobx-state-tree';

const Item = types.model({
  id: types.identifierNumber,
  price: types.number,
  description: types.string,
  value: types.string,
  image: types.string,
  name: types.string,
  seq: types.number,
  itemTypeCd: types.string,
  createdAt: types.string,
  updatedAt: types.string,
});

export default Item;
