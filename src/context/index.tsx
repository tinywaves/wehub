import { ReactNode } from 'react';

import AuthProvider from './auth-context';

const AppProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
