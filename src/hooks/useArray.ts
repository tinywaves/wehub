// A hook about operations on arrays.
import { useState } from 'react';

const useArray = <V>(initialArray: V[]) => {
  const [arrayValue, setArrayValue] = useState(initialArray);

  // Clear array.
  const clear = () => setArrayValue([]);
  // Add an item.
  const add = (item: V) => setArrayValue([...arrayValue, item]);
  // Remove an specific item.
  const removeIndex = (index: number) => {
    const temp = [...arrayValue];
    temp.splice(index, 1);
    setArrayValue(temp);
  };

  return { arrayValue, clear, add, removeIndex };
};

export default useArray;
