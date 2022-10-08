import QueryString from 'qs';

import * as auth from '../apis/auth-provider';

import Config from '../types/config';

const url = process.env.REACT_APP_API_URL;

const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  };

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${QueryString.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${url}/${endpoint}`, config).then(async response => {
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
