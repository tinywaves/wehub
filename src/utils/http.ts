import QueryString from 'qs';

import * as auth from 'auth/auth-provider';
import { RequestConfig } from 'types';

const baseUrl = process.env.REACT_APP_API_URL;

/**
 * General request function.
 * @param endpoint request endpoint url.
 * @param { requestData, token, headers, ...options } RequestConfig request configs (optional).
 * @returns return request response data.
 */
const http = async (
  endpoint: string,
  { requestData, token, headers, ...options }: RequestConfig = {}
) => {
  const config = {
    // Default method.
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': requestData ? 'application/json' : ''
    },
    ...options
  };

  // Reset endpoint string and request body.
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${QueryString.stringify(requestData)}`;
  } else {
    config.body = JSON.stringify(requestData || {});
  }

  return fetch(`${baseUrl}${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();

        return Promise.reject({ message: 'Please login again' });
      }

      const responseData = await response.json();

      if (response.ok) {
        return responseData;
      } else {
        return Promise.reject(responseData);
      }
    });
};

export default http;
