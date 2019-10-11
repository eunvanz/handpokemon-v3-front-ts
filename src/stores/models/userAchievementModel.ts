import { IAchievement } from './achievementModel';

export interface IUserAchievement {
  id: number;
  userId: number;
  achievementId: number;
  activated: number;
  disabled: number;
  createdAt: string;
  updatedAt: string;
  achievement: IAchievement;
}
