import { ReactNode } from 'react';

import AuthProvider from './auth-context';

const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;
