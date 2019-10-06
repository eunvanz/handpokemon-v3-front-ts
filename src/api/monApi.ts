import makeRequest from './makeRequest';
import { IMonSnapshotIn } from '../stores/models/mon';

export interface IMonApi {
  getAllMons: () => Promise<IMonSnapshotIn[]>;
}

const monApi: IMonApi = {
  getAllMons: () => {
    return makeRequest('get', 'mons');
  },
};

export default monApi;
