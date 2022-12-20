import { useState } from 'react';
import Login from './login';
import Register from './register';

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {isRegister ? <Register /> : <Login />}
      <button onClick={() => setIsRegister(!isRegister)}>
        switch to {isRegister ? 'login' : 'register'}
      </button>
    </>
  );
};

export default UnauthenticatedApp;
