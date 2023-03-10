import axios, { AxiosError } from 'axios';
import { SERVER_URL } from '../constants';
import tokenStorage from '../utils/tokenStorage';

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: { Authorization: `Bearer ${tokenStorage.getToken()}` },
});

instance.interceptors.request.use(
  (request) => {
    if (!!tokenStorage.getToken()) {
      request.headers = {
        Authorization: `Bearer ${tokenStorage.getToken()}`,
        Accept: 'application/json',
      };
    }
    return request;
  },
  (error: AxiosError | Error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          tokenStorage.clearToken();
          break;
        case 404:
          alert(error.response.message);
          break;
        case 500:
          alert('잠시 후 다시 시도해주세요.');
          break;
      }
      return Promise.reject(error);
    }
  }
);

export default instance;
