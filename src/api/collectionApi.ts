import makeRequest from './makeRequest';
import { ICollection } from '../stores/models/collectionModel';
import { IAchievement } from '../stores/models/achievementModel';

export interface ICollectionApi {
  getCollectionsByUserId: (userId: number) => Promise<ICollection[]>;
  getUserCollectionsWithToken: () => Promise<ICollection[]>;
  getStartPicks: () => Promise<ICollection[]>;
  putCollection: (collection: ICollection) => Promise<ICollection>;
  getMixedCollection: (collectionIds: Number[]) => Promise<IPickResultRes>;
  getEvolutedCollection: (collectionId: Number) => Promise<IPickResultRes>;
}

export interface IAchievementDiff {
  activated: IAchievement[];
  deactivated: IAchievement[];
  inserted: IAchievement[];
}

export interface IPickResultRes {
  picks: ICollection[];
  achievements: IAchievementDiff;
}

const collectionApi: ICollectionApi = {
  getCollectionsByUserId: (userId: number) => {
    return makeRequest('get', `collections/user/${userId}`);
  },
  getUserCollectionsWithToken: () => {
    return makeRequest('get', 'collections/token');
  },
  getStartPicks: () => {
    return makeRequest('get', 'collections/start-pick');
  },
  putCollection: collection => {
    return makeRequest('put', `collections/${collection.id}`, collection);
  },
  getMixedCollection: async (collectionIds: Number[]) => {
    const pickRes = await makeRequest(
      'get',
      `collections/mix?collectionIds=${collectionIds.join(',')}`
    );
    const uaRes = await makeRequest('get', 'user-achievements/refresh');
    return Promise.resolve({ picks: pickRes.data, achievements: uaRes.data });
  },
  getEvolutedCollection: async (collectionId: Number) => {
    const pickRes = await makeRequest(
      'get',
      `collections/evolute?collectionId=${collectionId}`
    );
    const uaRes = await makeRequest('get', 'user-achievements/refresh');
    return Promise.resolve({ picks: pickRes.data, achievements: uaRes.data });
  },
};

export default collectionApi;
