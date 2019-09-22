import makeRequest from './makeRequest';

export default {
  postFile: ({ data, path }: { data: FormData; path: string }) => {
    return makeRequest('post', `files?path=${path}`, data);
  },
};
