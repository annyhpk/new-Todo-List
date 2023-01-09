import useInput from '../../hooks/useInput';
import { StyledTextArea } from './styled';

type Props = {
  name: string;
  placeholder: string;
};

function TextArea({ name, placeholder }: Props) {
  const [value, onChangeValue] = useInput<string>('');

  return (
    <StyledTextArea
      name={name}
      value={value}
      onChange={onChangeValue}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
}

export default TextArea;
