// Operate JWT-token. In a real business environment, if a third-party auth service such as firebase is used, this file does not need to be written by developers.
import User from 'types/user';
import { apiUrl } from 'common';

const localStorageKey = '__auth_provider_token__';

const getToken = () => window.localStorage.getItem(localStorageKey);

const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user;
};

const login = async (data: { username: string; password: string }) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    return handleUserResponse(await response.json());
  } else {
    return Promise.reject(data);
  }
};

const register = async (data: { username: string; password: string }) => {
  const response = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    return handleUserResponse(await response.json());
  } else {
    return Promise.reject(data);
  }
};

const logout = async () => window.localStorage.removeItem(localStorageKey);

export { login, register, logout, getToken };
