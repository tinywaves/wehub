import QueryString from 'qs';
import { RequestConfig } from 'types';
import * as auth from 'auth/auth-provider';


const url = process.env.REACT_APP_API_URL;



const http = async (endpoint: string, { requestData, token, headers, ...options }: RequestConfig = {}) => {
  const config = {
    method: 'GET', headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': requestData ? 'application/json' : ''
    }, ...options
  };

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${QueryString.stringify(requestData)}`;
  } else {
    config.body = JSON.stringify(requestData || {});
  }
  return fetch(`${url}${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: 'Please login again' });
    }

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export default http;
