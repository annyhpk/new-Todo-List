import Axios from 'axios';
import { useCallback, FormEvent, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/ValidationInput';
import LoginContext from '../../contexts/Login';

function SignUpPage() {
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
      const token = await Axios.post('http://localhost:8080/users/create', loginData);
      localStorage.setItem('token', token.data.token);
      setLogined(true);
      navigate('/');
    } catch (e: any) {
      alert('죄송합니다. 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
      throw new Error(e);
    }
  }, []);

  return (
    <main>
      <Form title="회원가입" submitButton="가입하기" onSubmitForm={onSubmitForm}>
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
      </Form>
    </main>
  );
}

export default SignUpPage;
