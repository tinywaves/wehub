import React from 'react';

import { useAuth } from '../../hooks';

import ProjectListPage from '../project-list';

const AuthenticatedApp: React.FC = () => {
  const { logout } = useAuth();

  return (
    <>
      <ProjectListPage />
      <button onClick={logout}>登出</button>
    </>
  );
};

export default AuthenticatedApp;
