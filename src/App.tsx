import React from 'react';

import ProjectListPage from './pages/project-list';
import Login from './pages/login';

const App: React.FC = () => {
  return (
    <>
      <ProjectListPage />
      <Login />
    </>
  );
};

export default App;
