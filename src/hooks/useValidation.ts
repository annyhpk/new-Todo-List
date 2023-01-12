import { ChangeEvent, useCallback, useState } from 'react';

type ReturnTypes = [boolean, (event: ChangeEvent<HTMLInputElement>) => void];

export type validationType = keyof typeof validation;

const validation = {
  email: new RegExp('^[da-zA-Z]([-_.]?[da-zA-Z])+@[da-zA-Z]([-_.]?[da-zA-Z])+.[a-zA-Z]{2,4}$'),
  password: new RegExp('^.{8,}$'),
};

const useValidation = (type: validationType): ReturnTypes => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const reg = validation[type];

  const onChangeValidation = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (reg.test(value)) {
      setIsValid(true);
      return;
    }
    setIsValid(false);
  }, []);

  return [isValid, onChangeValidation];
};

export default useValidation;
