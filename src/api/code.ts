import makeRequest from './makeRequest';

export default {
  getCodes: () => {
    return makeRequest('get', 'codes');
  },
};
