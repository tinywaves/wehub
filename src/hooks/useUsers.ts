import useAsync from './useAsync';
import useHttp from './useHttp';
import useMount from './useMount';
import { User } from 'types';

const useUsers = () => {
  const { run, ...returnStates } = useAsync<User[]>();
  const client = useHttp();

  useMount(() => run(client('/users')));

  return returnStates;
};

export default useUsers;
