import { http } from "../utils";
import useAuth from "./useAuth";

const useHttp = () => {
  const { user } = useAuth();

  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token });

};

export default useHttp;
