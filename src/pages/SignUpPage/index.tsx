import { FormEvent, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Component
import Form from '../../components/Form';
import Input from '../../components/Input';

// Context
import useAuthContext from '../../contexts/Auth';

// API
import UserAPI from '../../service/User';

// Style
import { Label } from '../LoginPage/styled';

function SignUpPage() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated, actions } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailInputRef.current || !passwordInputRef.current) return;

    UserAPI.signup({
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    }).then(() => {
      actions.login();
      navigate('/');
    });
  }, []);

  return (
    <main>
      <Form
        title="회원가입"
        submitButton="가입하기"
        onSubmitForm={onSubmitForm}
      >
        <Label htmlFor="email">아이디(email)</Label>
        <Input
          ref={emailInputRef}
          name="email"
          type="email"
          validationType="email"
          placeholder="아이디(이메일)"
          msg="'@'과 '.'을 모두 포함"
        />
        <Label htmlFor="password">패스워드(password)</Label>
        <Input
          ref={passwordInputRef}
          name="password"
          type="password"
          validationType="password"
          placeholder="********"
          msg="8자리 이상"
        />
      </Form>
    </main>
  );
}

export default SignUpPage;
