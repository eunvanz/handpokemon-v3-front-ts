import { AxiosPromise } from 'axios';

export default async (request: AxiosPromise) => {
  try {
    const { data, status } = await request;
    if (status === 200) {
      return data;
    } else {
    }
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
