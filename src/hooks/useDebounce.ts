// A custom hook that debounce.
import { useEffect, useState } from 'react';

const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a setTimeout after the value or delay changes.
    const timeout = setTimeout(() => setDebouncedValue(value), delay);

    // Executed after the previous useEffect processing is complete.
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
