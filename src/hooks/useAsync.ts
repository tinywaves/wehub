import { useState } from 'react';

// Async-state interface.
interface AsyncState<V> {
  data: V | null;
  error: Error | null;
  status: 'idle' | 'loading' | 'error' | 'success';
}

// Async-config interface.
interface AsyncConfig {
  throwError: boolean;
}

const defaultInitialState: AsyncState<null> = {
  data: null,
  error: null,
  status: 'idle'
};

const defaultInitialConfig: AsyncConfig = {
  throwError: false
};

// A hook to control async actions.
const useAsync = <V>(initialState?: AsyncState<V>, initialCOnfig?: AsyncConfig) => {
  const [state, setState] = useState<AsyncState<V>>({
    ...defaultInitialState,
    ...initialState
  });
  const config = {
    ...defaultInitialConfig,
    ...initialCOnfig
  };

  const setData = (data: V) => setState({
    data,
    status: 'success',
    error: null
  });

  const setError = (error: Error) => setState({
    error,
    status: 'error',
    data: null
  });

  const run = (promise: Promise<V>) => {
    if (!promise || !promise.then) {
      throw new Error('please input a variable with Promise');
    }

    setState({ ...state, status: 'loading' });

    return promise
      .then(data => {
        setData(data);
        return data;
      })
      .catch(error => {
        setError(error);

        if (config.throwError) {
          return Promise.reject(error);
        }

        return error;
      });
  };

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    ...state
  };
};

export default useAsync;
