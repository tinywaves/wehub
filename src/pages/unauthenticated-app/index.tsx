import { useState } from 'react';

import { Button } from '@mantine/core';
import Login from './login';
import Register from './register';
import UnAuthenticatedAppStyles, { Background } from './styles';
import { Header, Container, SwitchButton, Title } from './styles';

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <UnAuthenticatedAppStyles>
      <Header />
      <Background />
      <Container>
        <Title>{isRegister ? 'REGISTER' : 'LOGIN'}</Title>
        {isRegister ? <Register /> : <Login />}
        <SwitchButton position="center">
          <Button
            onClick={() => setIsRegister(!isRegister)}
            variant="subtle"
            radius="xl"
          >
            {isRegister
              ? 'Already have an account? Login Now!'
              : 'No account? Register Now!'}
          </Button>
        </SwitchButton>
      </Container>
    </UnAuthenticatedAppStyles>
  );
};

export default UnauthenticatedApp;
