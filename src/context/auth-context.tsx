import { createContext, ReactNode } from 'react';

import { FullPageLoading, FullPageErrorFeedback } from 'components';

import { useMount, useAsync } from 'hooks';
import * as auth from 'auth/auth-provider';
import { http } from 'utils';
import { User, AuthForm } from 'types';

// Init user data.
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
  const {
    data: user,
    setData: setUser,
    run,
    isIdle,
    isLoading,
    isError,
    error
  } = useAsync<User | null>();

  const login = (formData: AuthForm) => {
    return auth.login(formData).then(user => setUser(user));
  };

  const register = (formData: AuthForm) => {
    return auth.register(formData).then(user => setUser(user));
  };

  const logout = () => {
    return auth.logout().then(() => setUser(null));
  };

  useMount(() => run(bootstrapUser()));

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFeedback error={error} />;
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export default AuthProvider;
