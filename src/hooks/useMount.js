import { useEffect } from 'react';

const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export default useMount;
