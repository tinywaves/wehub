// Determine if a value is a invalid value.(0 is a valid value)
export const isInvalid = (value: unknown) => (value === 0 ? false : !value);

// Remove value attributes.
export const cleanObject = (object: object) => {
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
