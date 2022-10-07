// Determines whether the value passed in is null or undefined.
const isFalsy = (value: unknown): boolean => value === 0 ? false : !value;

export default isFalsy;
