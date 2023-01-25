import { useState, ChangeEvent, useCallback, useMemo } from 'react';
import Validation, { validationType } from '../utils/validation';

function useInput<T>(
  initialValue: T,
  validType?: validationType
): [
  T,
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  boolean
] {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const tmp = parseInt(event.target.value, 10);
      const newValue = Number.isNaN(tmp) ? event.target.value : tmp;
      setValue(newValue as T);
    },
    []
  );

  const isValidInput = useMemo(() => {
    if (validType) {
      return Validation(validType, String(value));
    }
    return true;
  }, [validType, value]);

  return [value, onChange, isValidInput];
}

export default useInput;
