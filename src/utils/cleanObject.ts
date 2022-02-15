// Remove value attributes.
import isInvalid from './isInvalid';

const cleanObject = (object: object) => {
  const result = { ...object };

  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key];

    if (isInvalid(value)) {
      // @ts-ignore
      delete result[key];
    }
  });

  return result;
};

export default cleanObject;
