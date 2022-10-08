import React from 'react';

import { useAuth } from './hooks';

import AuthenticatedApp from './pages/authenticated-app';
import UnauthenticatedApp from './pages/unauthenticated-app';

const App: React.FC = () => {
  const { user } = useAuth();

  return <>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>;
};

export default App;
