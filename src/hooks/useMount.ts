// A custom hook that executes only once.
import { useEffect } from 'react';

const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMount;
