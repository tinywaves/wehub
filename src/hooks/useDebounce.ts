// A custom hook that debounce.
import { useEffect, useState } from 'react';

const useDebounce = <V>(value: V, delay?: number): V => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // Set a setTimeout after the value or delay changes.
    const timeout = setTimeout(() => setDebounceValue(value), delay);

    // Executed after the previous useEffect processing is complete.
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
