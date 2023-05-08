import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import Validation, { validationType } from '../utils/validation';

const useInput = <T>(
  initialValue: T,
  validType?: validationType
): [
  T,
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  boolean
] => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const tmp = parseInt(event.target.value, 10);
      const newValue = Number.isNaN(tmp) ? event.target.value : tmp;
      setValue(newValue as T);
    },
    [setValue]
  );

  const isValidInput = useMemo(() => {
    if (typeof value === 'string') {
      return Validation(validType, value.toString());
    }
    return true;
  }, [validType, value]);

  return [value, onChange, isValidInput];
};

export default useInput;
