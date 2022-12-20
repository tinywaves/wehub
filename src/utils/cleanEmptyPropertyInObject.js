const isFalsy = (value) => value === 0 ? false : !value;


const cleanEmptyPropertyInObject = (object) => {
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
