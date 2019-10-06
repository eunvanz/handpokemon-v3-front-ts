import makeRequest from './makeRequest';
import { ICollectionSnapshotOut } from '../stores/models/collection';

export interface ICollectionApi {
  getCollectionsByUserId: (userId: number) => Promise<ICollectionSnapshotOut[]>;
  getUserCollectionsWithToken: () => Promise<ICollectionSnapshotOut[]>;
  getStartPicks: () => Promise<ICollectionSnapshotOut[]>;
  putCollection: (collection: any) => Promise<any>;
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
};

export default collectionApi;
