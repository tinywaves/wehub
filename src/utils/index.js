// Determine if a value is a invalid value.(0 is a valid value)
export const isInvalid = value => (value === 0 ? false : !value);

// Remove value attributes.
export const cleanObject = object => {
  const result = { ...object };
  Object.keys(object).forEach(key => {
    const value = object[key];
    if (isInvalid(value)) {
      delete result[key];
    }
  });

  return result;
};
