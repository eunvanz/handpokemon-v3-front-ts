import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../constants/api';

let token = localStorage.getItem('auth');

let axiosInstance: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/`,
  headers: {
    Authorization: token,
  },
});

const initAxios = () => {
  token = localStorage.getItem('auth');
  axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/`,
    headers: {
      Authorization: token,
    },
  });
};

const hasTokenChanged = () => {
  return token !== localStorage.getItem('auth');
};

const getRequestInstance = () => {
  if (hasTokenChanged() || !token || !axiosInstance) initAxios();
  return axiosInstance;
};

export default getRequestInstance;
