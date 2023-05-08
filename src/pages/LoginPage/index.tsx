import { FormEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Context
import useAuthContext from '../../contexts/Auth';

// API
import UserAPI from '../../service/User';

// style
import {
  Button,
  FormWrapper,
  Label,
  StyledFrom,
  StyledInput,
  ValidationAlert,
} from '../styled';

// hooks
import useInput from '../../hooks/useInput';

function LoginPage() {
  const [email, onChangeEmail, isEmailValid] = useInput<string>('', 'email');
  const [password, onChangePassword, isPasswordValid] = useInput<string>(
    '',
    'password'
  );
  const isButtonDisabled = !(isEmailValid && isPasswordValid);
  const { isAuthenticated, actions } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isButtonDisabled) return;

    UserAPI.login({
      email,
      password,
    }).then(() => {
      actions.login();
      navigate('/');
    });
  }, []);

  return (
    <main>
      <FormWrapper>
        <h3>로그인</h3>
        <StyledFrom onSubmit={onSubmitForm}>
          <Label htmlFor="email">아이디(email)</Label>
          <StyledInput
            name="email"
            width="19rem"
            height="1.2rem"
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="아이디(이메일)"
            autoComplete="off"
          />
          {isEmailValid ? null : (
            <ValidationAlert>"'@'를 포함"</ValidationAlert>
          )}

          <Label htmlFor="password">패스워드(password)</Label>
          <StyledInput
            name="password"
            width="19rem"
            height="1.2rem"
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="********"
            autoComplete="off"
          />
          {isPasswordValid ? null : (
            <ValidationAlert>"8자리 이상"</ValidationAlert>
          )}
          <Button type="submit" disabled={isButtonDisabled}>
            로그인
          </Button>
        </StyledFrom>
      </FormWrapper>
    </main>
  );
}

export default LoginPage;
