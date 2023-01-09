import useValidation, { validationType } from '../../hooks/useValidation';
import { Label, StyledInput, ValidationAlert } from './styled';

type props = {
  name: string;
  type: validationType;
  label: string;
  placeholder: string;
  msg: string;
};

function Input({ name, type, label, placeholder, msg }: props) {
  const [Check, onChangeValidation] = useValidation(type);

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput
        name={name}
        type={type}
        onChange={onChangeValidation}
        placeholder={placeholder}
        autoComplete="on"
        autoFocus
        required
      />
      {!Check ? <ValidationAlert>{msg}</ValidationAlert> : null}
    </>
  );
}

export default Input;
