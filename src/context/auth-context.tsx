import { createContext, ReactNode, useState } from 'react';

import * as auth from '../apis/auth-provider';
import { useMount } from '../hooks';

import AuthForm from '../types/auth-form';
import User from '../types/user';
import { http } from '../utils';

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
};

export const AuthContext = createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => {
    return auth.login(form).then(user => setUser(user));
  };

  const register = (form: AuthForm) => {
    return auth.register(form).then(user => setUser(user));
  };

  const logout = () => {
    return auth.logout().then(() => setUser(null));
  };

  useMount(() => {
    bootstrapUser().then(setUser)
  })

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export default AuthProvider;
