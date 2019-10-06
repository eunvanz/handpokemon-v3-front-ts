import user, { IUserApi } from './userApi';
import collection, { ICollectionApi } from './collectionApi';
import code, { ICodeApi } from './codeApi';
import file, { IFileApi } from './fileApi';
import mon, { IMonApi } from './monApi';

interface IApi {
  user: IUserApi;
  collection: ICollectionApi;
  code: ICodeApi;
  file: IFileApi;
  mon: IMonApi;
}

const api = {
  user,
  collection,
  code,
  file,
  mon,
};

export default api;
