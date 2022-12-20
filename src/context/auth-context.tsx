import { useState, createContext, ReactNode } from 'react';

import * as auth from 'auth/auth-provider';
import { User, AuthForm } from 'types';
import http from 'utils/http';
import { useMount } from 'hooks';

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http('/me', { token });
    user = data.user;
  }
  return user;
};

export const AuthContext = createContext<
  | {
      user: User | null;
      login: (formData: AuthForm) => Promise<void>;
      register: (formData: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (formData: AuthForm) => {
    return auth.login(formData).then(user => setUser(user));
  };

  const register = (formData: AuthForm) => {
    return auth.register(formData).then(user => setUser(user));
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
