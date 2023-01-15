import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';

import PageHeader from './page-header';
import ProjectListPage from './project-list';
import ProjectDetail from './project-detail';
import AuthenticatedAppStyles, { Main } from './styles';

const AuthenticatedApp = () => {
  return (
    <AuthenticatedAppStyles>
      <PageHeader />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/projects/:projectId/*" element={<ProjectDetail />} />
          </Routes>
        </BrowserRouter>
      </Main>
    </AuthenticatedAppStyles>
  );
};

export default AuthenticatedApp;
