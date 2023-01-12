import useInput from '../../hooks/useInput';
import { StyledInput } from './styled';

type Props = {
  name: string;
  type: string;
  placeholder: string;
};

function Input({ name, type, placeholder }: Props) {
  const [value, onChangeValue] = useInput<string>('');

  return (
    <StyledInput
      name={name}
      type={type}
      value={value}
      onChange={onChangeValue}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
}

export default Input;
