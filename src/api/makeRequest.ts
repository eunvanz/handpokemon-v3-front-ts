import { AxiosRequestConfig, Method } from 'axios';
import response from './response';
import getRequestInstance from './request';

const makeRequest = (
  method: Method,
  url: string,
  data?: object,
  configs?: AxiosRequestConfig
) => {
  return response(
    getRequestInstance()({
      method,
      url,
      data,
      ...configs,
    })
  );
};

export default makeRequest;
