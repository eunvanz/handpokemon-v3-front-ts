import makeRequest from './makeRequest';

export default {
  getCollectionsByUserId: (userId: number) => {
    return makeRequest('get', `collections/user/${userId}`);
  },
  getUserCollctionsWithToken: () => {
    return makeRequest('get', 'collections/token');
  },
  getStartPick: () => {
    return makeRequest('get', 'collections/start-pick');
  },
};
