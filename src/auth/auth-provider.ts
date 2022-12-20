// In the real world, this file does not need to be written manually by the developer if you are using a third-party auth service like firebase.
import User from 'types/user';

const localStorageKey = '__auth_provider_token__';
const url = process.env.REACT_APP_API_URL;

// Get token in localStorage.
export const getToken = () => window.localStorage.getItem(localStorageKey);

// Set token to localStorage.
export const handleUserResponse = ({ user: accountUser }: { user: User; }) => {
  window.localStorage.setItem(localStorageKey, accountUser.token || '');

  return accountUser;
};

// A function to login.
export const login = (loginData: { username: string, password: string; }) => {
  return fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(loginData);
    }
  });
};

// A function to register.
export const register = (registerData: { username: string, password: string; }) => {
  return fetch(`${url}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerData)
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(registerData);
    }
  });
};

// A function to logout.
export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};
