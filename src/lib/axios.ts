import { auth } from '@/auth';
import axios from 'axios';
import type { AxiosRequestHeaders, AxiosResponse } from 'axios';

const genericSuccessResponseInterceptor = function (response: AxiosResponse) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
};

const genericErrorResponseInterceptor = function (error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status === 401) {
      return Promise.reject(
        new Error('Anda belum terautentikasi, harap login terlebih dahulu'),
      );
    }

    return Promise.reject(error);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return Promise.reject(error);
  } else {
    // Error comes from AbortController signal abort
    if (error.message === 'canceled') {
      return Promise.reject(new Error('request canceled'));
    }
    // Something happened in setting up the request that triggered an Error
    return Promise.reject(error.message);
  }
};

const $http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});

$http.interceptors.request.use(async function (config) {
  const session = await auth();
  const token = session?.user.access_token;
  
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
  }

  return config;
});

$http.interceptors.response.use(
  genericSuccessResponseInterceptor,
  genericErrorResponseInterceptor,
);

export { $http };
export default $http;
