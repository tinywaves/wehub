// Get auth-context.
import { useContext } from 'react';

import { AuthContext } from 'context/auth-context';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuth must be used in AuthContext');
  }

  return context;
};

export default useAuth;
