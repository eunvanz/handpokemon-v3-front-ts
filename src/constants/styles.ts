import { ATTR, GRADE, RANK } from './codes';
import { SCREEN_SIZE } from '../libs/screenSize';

export const COLOR = {
  DARK_GRAY: '#545454',
  PRIMARY: '#03a9f4',
  GOLD: '#f9c957',
  RED: '#f44336',
  PINK: '#e91e63',
  PURPLE: '#9c27b0',
  DEEP_PURPLE: '#673ab7',
  INDIGO: '#3f51b5',
  BLUE: '#2196f3',
  LIGHT_BLUE: '#03a9f4',
  CYAN: '#00bcd4',
  TEAL: '#009688',
  GREEN: '#4caf50',
  LIGHT_GREEN: '#8bc34a',
  LIME: '#cddc39',
  YELLOW: '#ffeb3B',
  AMBER: '#ffc107',
  ORANGE: '#ff9800',
  DEEP_ORANGE: '#ff5722',
  BROWN: '#795548',
  GRAY: '#9e9e9e',
  BLUE_GRAY: '#607d8b',
  BLACK: '#000000',
  LIGHT_GRAY: '#eaeaea',
};

export const ATTR_COLOR = {
  [ATTR.NORMAL]: '#9e9e9e',
  [ATTR.FIRE]: '#f44336',
  [ATTR.WATER]: '#2196f3',
  [ATTR.LIGHTNING]: '#ffc107',
  [ATTR.PLANT]: '#8bc34a',
  [ATTR.ICE]: '#00bcd4',
  [ATTR.AIR]: '#607d8b',
  [ATTR.FAIRY]: '#e91e63',
  [ATTR.EARTH]: '#795548',
  [ATTR.POISON]: '#9c27b0',
  [ATTR.FIGHT]: '#ff5772',
  [ATTR.PSYCHIC]: '#ff6699',
  [ATTR.BUG]: '#4caf50',
  [ATTR.ROCK]: '#666633',
  [ATTR.GHOST]: '#673ab7',
  [ATTR.DRAGON]: '#3f51b5',
  [ATTR.EVIL]: '#000000',
  [ATTR.IRON]: '#009688',
};

export const RANK_COLOR = {
  [RANK.SS]: COLOR.INDIGO,
  [RANK.S]: COLOR.PURPLE,
  [RANK.A]: COLOR.PINK,
  [RANK.B]: COLOR.LIGHT_GREEN,
  [RANK.C]: COLOR.TEAL,
  [RANK.D]: COLOR.BLUE_GRAY,
  [RANK.E]: COLOR.GRAY,
  [RANK.F]: COLOR.DARK_GRAY,
};

export const GRADE_STYLE = {
  [GRADE.BASIC]: { backgroundColor: '#fee188', color: '#996633' },
  [GRADE.SPECIAL]: { backgroundColor: '#66ccff', color: '#003399' },
  [GRADE.RARE]: { backgroundColor: '#8ae68a', color: '#003300' },
  [GRADE.S_RARE]: { backgroundColor: '#b9b9ff', color: '#6600ff' },
  [GRADE.ELITE]: { backgroundColor: '#ff91b5', color: '#993366' },
  [GRADE.LEGEND]: { backgroundColor: '#ffa86f', color: '#800000' },
};

export const DRAWER_DEFAULT_OPEN_SCREEN_SIZE = SCREEN_SIZE.MD;
