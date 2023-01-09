import Axios from 'axios';
import { FormEvent, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/ValidationInput';
import LoginContext from '../../contexts/Login';
import { StyledLink } from './styled';

function LoginPage() {
  const { setLogined } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/todo');
  }, []);

  const onSubmitForm = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const loginData = {
      email: form.get('email'),
      password: form.get('password'),
    };
    try {
      const token = await Axios.post('http://localhost:8080/users/login', loginData);
      localStorage.setItem('token', token.data.token);
      setLogined(true);
      navigate('/');
    } catch (err: any) {
      alert('아이디 또는 암호가 올바르지 않습니다.');
      throw new Error(err);
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
