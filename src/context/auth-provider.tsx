import React, { useState } from 'react';

import AuthForm from 'types/auth-form';
import User from 'types/user';
import * as auth from 'api/auth-providers';

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = 'AuthContext';

const AuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (form: AuthForm) => {
    const user = await auth.login(form);
    return setUser(user);
  };

  const register = async (form: AuthForm) => {
    const user = await auth.register(form);
    return setUser(user);
  };

  const logout = () => auth.logout().then(() => setUser(null));

  return <AuthContext.Provider value={{ user, login, register, logout }} />;
};
