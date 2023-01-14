import { useEffect } from 'react';

import useAsync from './useAsync';
import useHttp from './useHttp';
import { cleanEmptyPropertyInObject } from 'utils';
import { Project } from 'types';

// A hook that control projects states.
const useProjects = (params: Partial<Project>) => {
  const { run, ...returnStates } = useAsync<Project[]>();
  const client = useHttp();

  useEffect(() => {
    run(
      client('/projects', {
        requestData: cleanEmptyPropertyInObject(params)
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return returnStates;
};

export default useProjects;
