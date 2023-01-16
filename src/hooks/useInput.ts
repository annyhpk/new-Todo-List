import { useState, ChangeEvent, useCallback, useEffect } from 'react';
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
  const [isValid, setValid] = useState(false);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const tmp = parseInt(event.target.value, 10);
      const newValue = Number.isNaN(tmp) ? event.target.value : tmp;
      setValue(newValue as T);

      if (validType) {
        setValid(Validation(validType, event.target.value));
      }
    },
    [validType]
  );

  return [value, onChange, isValid];
}

export default useInput;
