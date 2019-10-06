import makeRequest from './makeRequest';

interface IPostFileResponse {
  url: string;
  link: string;
}

export interface IFileApi {
  postFile: ({
    data,
    path,
  }: {
    data: FormData;
    path: string;
  }) => Promise<IPostFileResponse>;
}

const fileApi: IFileApi = {
  postFile: ({ data, path }: { data: FormData; path: string }) => {
    return makeRequest('post', `files?path=${path}`, data);
  },
};

export default fileApi;
