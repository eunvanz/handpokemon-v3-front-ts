import { ICollection } from './collectionModel';
import { IBook } from './bookModel';
import { IAchievement } from './achievementModel';
import { IUserItem } from './userItemModel';

export interface IUser {
  id: number;
  socialTypeCd: string;
  nickname: string;
  profileImage?: string;
  introduce?: string;
  colPoint: number;
  battlePoint: number;
  role: string;
  pickCredit: number;
  battleCredit: number;
  lastPick?: string;
  lastBattle?: string;
  pokemoney: number;
  attackWin: number;
  attackLose: number;
  defenseWin: number;
  defenseLose: number;
  winInARow: number;
  maxWinInARow: number;
  leagueCd: string;
  createdAt: string;
  updatedAt: string;
  collections?: ICollection[];
  books?: IBook[];
  achievements?: IAchievement[];
  items?: IUserItem[];
}
