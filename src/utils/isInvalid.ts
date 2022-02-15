// Determine if a value is a invalid value(0 is a valid value).
const isInvalid = (value: unknown) => (value === 0 ? false : !value);

export default isInvalid;
