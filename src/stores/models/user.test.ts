import User from './user';

describe('user model', () => {
  it('인스턴스를 정상적으로 생성한다.', () => {
    const userToCreate = {
      id: 1,
      socialTypeCd: '0101',
      nickname: '웅이',
      profileImage: null,
      introduce: null,
      colPoint: 1396,
      battlePoint: 1000,
      role: '0502',
      pickCredit: 12,
      battleCredit: 12,
      lastPick: '1568621639449',
      lastBattle: '1560868660449',
      pokemoney: 2790,
      attackWin: 0,
      attackLose: 0,
      defenseWin: 0,
      defenseLose: 0,
      winInARow: 0,
      maxWinInARow: 0,
      leagueCd: '0801',
      createdAt: '2019-06-18T14:37:42.000Z',
      updatedAt: '2019-09-16T08:14:08.000Z',
    };

    const user = User.create(userToCreate);

    expect(user).toEqual(userToCreate);
  });
});
