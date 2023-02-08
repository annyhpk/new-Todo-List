import { ForwardedRef, forwardRef } from 'react';
import useInput from '../../hooks/useInput';
import { validationType } from '../../utils/validation';

// Style
import { StyledInput, ValidationAlert } from './styled';

type Props = {
  name?: string;
  type: string;
  validationType?: validationType;
  placeholder?: string;
  width?: string;
  height?: string;
  msg?: string;
};

function Input(
  {
    name,
    type,
    validationType,
    placeholder,
    width = '19rem',
    height = '1.2rem',
    msg,
  }: Props,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const [value, onChangeValue, isValidInput] = useInput<string>(
    '',
    validationType
  );

  return (
    <>
      <StyledInput
        ref={ref}
        name={name}
        width={width}
        height={height}
        type={type}
        value={value}
        onChange={onChangeValue}
        placeholder={placeholder}
        autoComplete="off"
      />
      {isValidInput ? null : <ValidationAlert>{msg}</ValidationAlert>}
    </>
  );
}

export default forwardRef<HTMLInputElement, Props>(Input);
