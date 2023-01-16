import { FormEvent, ReactNode, useCallback, useState } from 'react';
import { StyledFrom, FormWrapper, Button } from './styled';

type Props = {
  children: ReactNode;
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  title: string;
  submitButton: string;
};

function Form({ children, onSubmitForm, title, submitButton }: Props) {
  const [check, setCheck] = useState(false);

  const onChangeForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    const form = new FormData(e.currentTarget);
    if (form.get('email') && form.get('password')) {
      setCheck(true);
      return;
    }
    setCheck(false);
  }, []);

  return (
    <>
      <FormWrapper>
        <h3>{title}</h3>
        <StyledFrom onSubmit={onSubmitForm} onChange={onChangeForm}>
          {children}
          {check ? (
            <Button type="submit">{submitButton}</Button>
          ) : (
            <Button type="submit" disabled>
              {submitButton}
            </Button>
          )}
        </StyledFrom>
      </FormWrapper>
    </>
  );
}

export default Form;
