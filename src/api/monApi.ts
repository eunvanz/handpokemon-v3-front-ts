import makeRequest from './makeRequest';
import { IMonSnapshotIn, IMonSnapshotOut } from '../stores/models/mon';

export interface IMonApi {
  getAllMons: () => Promise<any>;
}

const monApi: IMonApi = {
  getAllMons: () => {
    return makeRequest('get', 'mons');
  },
};

export default monApi;
