import { useCallback, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../../components/Form';
import Input from '../../components/Input';

import useAuthContext from '../../contexts/Auth';
import tokenStorage from '../../utils/tokenStorage';

// API
import UserAPI from '../../service/User';

// style
import { Label } from '../LoginPage/styled';

function SignUpPage() {
  const { isAuthenticated, actions } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  const onSubmitForm = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const signupForm = {
      email: form.get('email') as string,
      password: form.get('password') as string,
    };

    try {
      const res = await UserAPI.signup(signupForm);
      tokenStorage.setToken(res.data.token);
      actions.login();
      navigate('/');
    } catch (error) {
      throw new Error(`${error}`);
    }
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
          name="email"
          type="email"
          validationType="email"
          placeholder="아이디(이메일)"
          msg="'@'과 '.'을 모두 포함"
        />
        <Label htmlFor="password">패스워드(password)</Label>
        <Input
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
