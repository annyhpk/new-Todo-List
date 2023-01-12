import { FormEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/ValidationInput';
import useLoginContext from '../../contexts/Login';
import HttpClient from '../../service/httpClient';
import tokenStorage from '../../utils/tokenStorage';

// style
import { StyledLink } from './styled';

function LoginPage() {
  const { actions } = useLoginContext();
  const navigate = useNavigate();
  const httpClient = new HttpClient();

  useEffect(() => {
    if (tokenStorage.getToken()) navigate('/');
  }, []);

  const onSubmitForm = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const loginForm = {
      email: form.get('email') as string,
      password: form.get('password') as string,
    };

    try {
      const res = await httpClient.login(loginForm);
      tokenStorage.setToken(res.data.token);
      actions.login();
      navigate('/');
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, []);

  return (
    <main>
      <Form title="로그인" submitButton="로그인" onSubmitForm={onSubmitForm}>
        <Input
          name="email"
          type="email"
          label="아이디(email)"
          placeholder="아이디(이메일)"
          msg="'@'과 '.'을 모두 포함"
        />
        <Input
          name="password"
          type="password"
          label="패스워드(password)"
          placeholder="********"
          msg="8자리 이상"
        />
        <StyledLink to="/signup">지금 가입하기</StyledLink>
      </Form>
    </main>
  );
}

export default LoginPage;
