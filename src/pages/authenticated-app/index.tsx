import ProjectListPage from 'pages/project-list';
import AuthenticatedAppStyles from './styles';
import { Header, Main, HeaderLeft, HeaderRight } from './styles';

import { useAuth } from 'hooks';

const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <AuthenticatedAppStyles>
      <Header between>
        <HeaderLeft gap>
          <h3>logo</h3>
          <h3>sss</h3>
          <h3>sss</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>dengchu</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListPage />
      </Main>
    </AuthenticatedAppStyles>
  );
};

export default AuthenticatedApp;
