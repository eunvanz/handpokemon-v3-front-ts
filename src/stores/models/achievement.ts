import { types } from 'mobx-state-tree';

const Achievement = types.model({
  id: types.identifierNumber,
  attrCd: types.maybeNull(types.string),
  achievementTypeCd: types.string,
  conditionValue: types.number,
  name: types.string,
  reward: types.number,
  buff: types.string,
  createdAt: types.string,
  updatedAt: types.string,
});

export default Achievement;
