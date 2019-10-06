import { ROLE, GRADE } from '../constants/codes';
import MessageModal from '../components/MessageModal/index';
import { IUserInstance } from '../stores/models/user';
import { IMonInstance } from '../stores/models/mon';
import { ICollectionInstance } from '../stores/models/collection';
import { IBook } from '../stores/models/book';
import { IUserAchievement } from '../stores/models/userAchievements';
import { MessageModalType } from '../components/MessageModal/MessageModal';

export const isAdminUser = (user: IUserInstance) => {
  if (!user) return false;
  return user.role === ROLE.ADMIN;
};

export const isCollection = (
  mon: ICollectionInstance | IMonInstance
): mon is ICollectionInstance => {
  return (mon as ICollectionInstance).mon !== undefined;
};

export const isMon = (
  mon: ICollectionInstance | IMonInstance
): mon is IMonInstance => {
  return (mon as IMonInstance).cost !== undefined;
};

export const getMonImageUrl = (
  monOrCol: IMonInstance | ICollectionInstance
) => {
  if (isCollection(monOrCol)) {
    const filteredMonImage = monOrCol.monImages.filter(
      monImage => monImage.seq === monOrCol.imageSeq
    )[0];
    if (filteredMonImage) return filteredMonImage.url;
  } else {
    return null;
  }
};

export const getClassNameFromGradeCd = (gradeCd: string) => {
  if (gradeCd === GRADE.BASIC) return 'basic';
  else if (gradeCd === GRADE.SPECIAL) return 'special';
  else if (gradeCd === GRADE.RARE) return 'rare';
  else if (gradeCd === GRADE.S_RARE) return 's-rare';
  else if (gradeCd === GRADE.ELITE) return 'elite';
  else if (gradeCd === GRADE.LEGEND) return 'legend';
};

export const getGradeCdFromTitle = (title: string) => {
  if (title.endsWith('트레이너')) return GRADE.BASIC;
  else if (title.endsWith('레인저')) return GRADE.RARE;
  else if (title.endsWith('짐리더')) return GRADE.SPECIAL;
  else if (title.endsWith('챔피언')) return GRADE.S_RARE;
  else if (title.endsWith('마스터')) return GRADE.ELITE;
};

// export const proceedPickActions = ({
//   viewActions,
//   userActions,
//   prevUserCollections,
//   achieved,
//   pickedMons
// }) => {
//   viewActions.receiveView('prevUserCollections', prevUserCollections);
//   viewActions.receiveView('pickedMons', pickedMons);
//   viewActions.receiveView('achieved', achieved);
//   userActions.signInUserWithToken();
// };

export const getBonusPctByAttrCdFromBook = (attrCd: string, books: IBook[]) => {
  const attrBooks = books.filter(book => book.attrCd === attrCd);
  const total = attrBooks.reduce(
    (accm, item) => item.col.addedTotal + item.col.baseTotal + accm,
    0
  );
  return Math.round(total / 12) / 10;
};

export const getTotalFromColAndUser = ({
  col,
  userBooks,
  userAchievements,
}: {
  col: ICollectionInstance;
  userBooks?: IBook[];
  userAchievements?: IUserAchievement[];
}) => {
  if (userAchievements && userBooks) {
    return (
      col.baseTotal +
      col.addedTotal +
      getTotalbuffFromColAndUser(col, userBooks) +
      getTotalbuffFromUserAchievements(userAchievements)
    );
  } else {
    // 회원가입 시
    return col.baseTotal;
  }
};

export const getTotalbuffFromColAndUser = (
  col: ICollectionInstance,
  userBooks: IBook[]
) => {
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
    baseDex,
  } = col;
  return [
    addedHp + baseHp,
    addedPower + basePower,
    addedArmor + baseArmor,
    addedSPower + baseSPower,
    addedSArmor + baseSArmor,
    addedDex + baseDex,
  ].reduce((accm, val) => {
    if (userBooks) {
      return (
        Math.round(
          (val * getBonusPctByAttrCdFromBook(col.mainAttrCd, userBooks)) / 120
        ) + accm
      );
    } else {
      // 회원가입 시 용도
      return val + accm;
    }
  }, 0);
};

export const isUserBookMon = (books: IBook[], col: ICollectionInstance) => {
  return !!books.filter(item => item.colId === col.id)[0];
};

export const getbuffFromUserAchievements = (
  userAchievements: IUserAchievement[]
) => {
  const activated = userAchievements.filter(item => item.activated);
  return activated.reduce(
    (accm, item) => {
      const buffs = item.achievement.buff.split(',');
      return accm.map((item, idx) => item + Number(buffs[idx]));
    },
    [0, 0, 0, 0, 0, 0]
  );
};

export const getTotalbuffFromUserAchievements = (
  userAchievements: IUserAchievement[]
) => {
  return getbuffFromUserAchievements(userAchievements).reduce(
    (accm, value) => accm + value,
    0
  );
};

// export const modifyDeepInList = ({ listAction, list, id, depth, value }) => {
//   const originItem = list.filter(item => item.id === id)[0];
//   if (!originItem) throw new Error('해당되는 아이템이 없습니다.');
//   fromJS(originItem).setIn(depth, value);
// };

export const alertError = (error: Error) => {
  MessageModal({
    type: MessageModalType.error,
    content: error.message,
  });
};
