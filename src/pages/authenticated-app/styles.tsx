import styled from '@emotion/styled';

import { Row } from 'components';

const AuthenticatedAppStyles = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  /* height: ; */
`;

export default AuthenticatedAppStyles;
export { Header, Main, HeaderLeft, HeaderRight };
