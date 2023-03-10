export type validationType = keyof typeof validation;

const validation = {
  email: new RegExp(
    '^[da-zA-Z]([-_.]?[da-zA-Z])+@[da-zA-Z]([-_.]?[da-zA-Z])+.[a-zA-Z]{2,4}$'
  ),
  password: new RegExp('^.{8,}$'),
};

const Validation = (
  type: validationType | undefined,
  value: string
): boolean => {
  if (type === undefined) return true;
  const reg = validation[type];
  return reg.test(value);
};

export default Validation;
