import useInput from '../../hooks/useInput';
import { validationType } from '../../utils/validation';
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

function Input({
  name,
  type,
  validationType,
  placeholder,
  width = '19rem',
  height = '1.2rem',
  msg,
}: Props) {
  const [value, onChangeValue, isValidInput] = useInput<string>(
    '',
    validationType
  );

  return (
    <>
      <StyledInput
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

export default Input;
