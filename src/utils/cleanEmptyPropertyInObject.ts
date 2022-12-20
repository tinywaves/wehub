// Determines whether the value passed in is null or undefined.
const isFalsy: (value: unknown) => boolean = value => value === 0 ? false : !value;

// Clears properties that have no value in the object.
const cleanEmptyPropertyInObject = (object?: { [key: string]: unknown; }) => {
  if (!object) {
    return {};
  }
  // The recommendation is a pure function, so deconstructed assignment is used.
  const result = { ...object };

  Object.keys(object).forEach(key => {
    const value = object[key];

    if (isFalsy(value)) {
      delete result[key];
    }
  });

  return result;
};

export default cleanEmptyPropertyInObject;
