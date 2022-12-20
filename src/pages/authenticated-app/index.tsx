import { useAuth } from 'hooks';
import ProjectListPage from 'pages/project-list';

const AuthenticatedApp = () => {
  const { logout}=useAuth()
  return (
    <>
      <button onClick={logout}>dengchu</button>
      <ProjectListPage />
    </>
  );
};

export default AuthenticatedApp;
