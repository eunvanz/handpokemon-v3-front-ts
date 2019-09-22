import { fromJS } from 'immutable';
import { ROLE, GRADE } from '../constants/codes';

export const isAdminUser = user => {
  if (!user) return false;
  return user.role === ROLE.ADMIN;
};

export const getMonImageUrl = monOrCol => {
  if (monOrCol.mon) {
    const filteredMonImage = monOrCol.monImages.filter(
      monImage => monImage.seq === monOrCol.imageSeq
    )[0];
    if (filteredMonImage) return filteredMonImage.url;
  } else
    return monOrCol.monImages.length > 0
      ? encodeURI(monOrCol.monImages[0].url)
      : null;
};

export const getClassNameFromGradeCd = gradeCd => {
  if (gradeCd === GRADE.BASIC) return 'basic';
  else if (gradeCd === GRADE.SPECIAL) return 'special';
  else if (gradeCd === GRADE.RARE) return 'rare';
  else if (gradeCd === GRADE.S_RARE) return 's-rare';
  else if (gradeCd === GRADE.ELITE) return 'elite';
  else if (gradeCd === GRADE.LEGEND) return 'legend';
};

export const getGradeCdFromTitle = title => {
  if (title.endsWith('트레이너')) return GRADE.BASIC;
  else if (title.endsWith('레인저')) return GRADE.RARE;
  else if (title.endsWith('짐리더')) return GRADE.SPECIAL;
  else if (title.endsWith('챔피언')) return GRADE.S_RARE;
  else if (title.endsWith('마스터')) return GRADE.ELITE;
};

export const proceedPickActions = ({
  viewActions,
  userActions,
  prevUserCollections,
  achieved,
  pickedMons
}) => {
  viewActions.receiveView('prevUserCollections', prevUserCollections);
  viewActions.receiveView('pickedMons', pickedMons);
  viewActions.receiveView('achieved', achieved);
  userActions.signInUserWithToken();
};

export const getBonusPctByAttrCdFromBook = (attrCd, books) => {
  const attrBooks = books.filter(book => book.attrCd === attrCd);
  const total = attrBooks.reduce(
    (accm, item) => item.col.addedTotal + item.col.baseTotal + accm,
    0
  );
  return Math.round(total / 12) / 10;
};

export const getTotalFromColAndUser = (col, user) => {
  if (user) {
    return (
      col.baseTotal +
      col.addedTotal +
      getTotalbuffFromColAndUser(col, user) +
      getTotalbuffFromUserAchievements(user.achievements)
    );
  } else {
    // 회원가입 시
    return col.baseTotal;
  }
};

export const getTotalbuffFromColAndUser = (col, user) => {
  const {
    addedHp,
    baseHp,
    addedPower,
    basePower,
    addedArmor,
    baseArmor,
    addedSPower,
    baseSPower,
    addedSArmor,
    baseSArmor,
    addedDex,
    baseDex
  } = col;
  return [
    addedHp + baseHp,
    addedPower + basePower,
    addedArmor + baseArmor,
    addedSPower + baseSPower,
    addedSArmor + baseSArmor,
    addedDex + baseDex
  ].reduce((accm, val) => {
    if (user) {
      return (
        Math.round(
          (val * getBonusPctByAttrCdFromBook(col.mainAttrCd, user.books)) / 120
        ) + accm
      );
    } else {
      // 회원가입 시 용도
      return val + accm;
    }
  }, 0);
};

export const isUserBookMon = (books, col) => {
  return !!books.filter(item => item.colId === col.id)[0];
};

export const getbuffFromUserAchievements = userAchievements => {
  const activated = userAchievements.filter(item => item.activated);
  return activated.reduce(
    (accm, item) => {
      const buffs = item.achievement.buff.split(',');
      return accm.map((item, idx) => item + Number(buffs[idx]));
    },
    [0, 0, 0, 0, 0, 0]
  );
};

export const getTotalbuffFromUserAchievements = userAchievements => {
  return getbuffFromUserAchievements(userAchievements).reduce(
    (accm, value) => accm + value,
    0
  );
};

export const modifyDeepInList = ({ listAction, list, id, depth, value }) => {
  const originItem = list.filter(item => item.id === id)[0];
  if (!originItem) throw new Error('해당되는 아이템이 없습니다.');
  fromJS(originItem).setIn(depth, value);
};
