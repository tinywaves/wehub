// Request hook.
import useAuth from './useAuth';
import { http } from 'utils';

const useHttp = () => {
  const { user } = useAuth();

  return (...[endpoint, requestConfig]: Parameters<typeof http>) =>
    http(endpoint, { ...requestConfig, token: user?.token });
};

export default useHttp;
