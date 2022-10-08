import React, { useState } from 'react';

import Login from './login';
import Register from './register';

const UnauthenticatedApp: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {isRegister ? <Register /> : <Login />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? '登录页面' : '注册页面'}
      </button>
    </div>
  );
};

export default UnauthenticatedApp;
