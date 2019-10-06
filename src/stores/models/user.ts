import { types, Instance, SnapshotOut, SnapshotIn } from 'mobx-state-tree';

const User = types.model('User', {
  id: types.identifierNumber,
  socialTypeCd: types.string,
  nickname: types.string,
  profileImage: types.maybeNull(types.string),
  introduce: types.maybeNull(types.string),
  colPoint: types.number,
  battlePoint: types.number,
  role: types.string,
  pickCredit: types.number,
  battleCredit: types.number,
  lastPick: types.maybeNull(types.string),
  lastBattle: types.maybeNull(types.string),
  pokemoney: types.number,
  attackWin: types.number,
  attackLose: types.number,
  defenseWin: types.number,
  defenseLose: types.number,
  winInARow: types.number,
  maxWinInARow: types.number,
  leagueCd: types.string,
  createdAt: types.string,
  updatedAt: types.string,
});

export type IUserSnapshotOut = SnapshotOut<typeof User>;
export type IUserSnapshotIn = SnapshotIn<typeof User>;
export type IUserInstance = Instance<typeof User>;

export default User;
