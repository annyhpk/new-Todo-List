import { ForwardedRef, forwardRef } from 'react';
import useInput from '../../hooks/useInput';
import { StyledTextArea } from './styled';

type Props = {
  name: string;
  placeholder: string;
};

function TextArea(
  { name, placeholder }: Props,
  ref?: ForwardedRef<HTMLTextAreaElement>
) {
  const [value, onChangeValue] = useInput<string>('');

  return (
    <StyledTextArea
      ref={ref}
      name={name}
      value={value}
      onChange={onChangeValue}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
}

export default forwardRef<HTMLTextAreaElement, Props>(TextArea);
