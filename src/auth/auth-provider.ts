// In the real world, this file does not need to be written manually by the developer if you are using a third-party auth service like firebase.
import { User, AuthForm } from 'types';

const localStorageTokenKey = '__auth_provider_token__';
const baseUrl = process.env.REACT_APP_API_URL;

// Get token in localStorage.
export const getToken = () => window.localStorage.getItem(localStorageTokenKey);

// Set token to localStorage.
export const handleUserResponse = ({ user: accountUser }: { user: User; }) => {
  window.localStorage.setItem(localStorageTokenKey, accountUser.token || '');

  return accountUser;
};

// A function to login.
export const login = (loginData: AuthForm) => {
  return fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then(async response => {
      if (response.ok) {
        return handleUserResponse(await response.json());
      } else {
        return Promise.reject(await response.json());
      }
    });
};

// A function to register.
export const register = (registerData: AuthForm) => {
  return fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerData)
  })
    .then(async response => {
      if (response.ok) {
        return handleUserResponse(await response.json());
      } else {
        return Promise.reject(await response.json());
      }
    });
};

// A function to logout.
export const logout = async () => {
  window.localStorage.removeItem(localStorageTokenKey);
};
