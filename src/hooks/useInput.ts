import { Dispatch, SetStateAction, useState } from 'react';

function useInput<T>(
  initialValue: T
): [
  T,
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  Dispatch<SetStateAction<T>>
] {
  const [value, setValue] = useState<T>(initialValue);
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const tmp = parseInt(event.target.value, 10);
    setValue((Number.isNaN(tmp) ? event.target.value : tmp) as T);
  };

  return [value, onChange, setValue];
}

export default useInput;
