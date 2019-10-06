import makeRequest from './makeRequest';
import { ICodeSnapshotOut } from '../stores/models/code';

export interface ICodeApi {
  getCodes: () => Promise<ICodeSnapshotOut[]>;
}

const codeApi: ICodeApi = {
  getCodes: () => {
    return makeRequest('get', 'codes');
  },
};

export default codeApi;
