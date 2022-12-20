import { RequestConfig } from 'types';
import http from 'utils/http';
import useAuth from './useAuth';
const useHttp = () => {
  const { user } = useAuth();

  return (...[endpoint, requestConfig]:Parameters<typeof http>) => http(endpoint, { ...requestConfig, token: user?.token });
};

export default useHttp;
