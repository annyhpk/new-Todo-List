import tokenStorage from '../../utils/tokenStorage';
import api from '../api';

export type LoginForm = {
  email: string;
  password: string;
};

export type SignupForm = {
  email: string;
  password: string;
};

export default class UserAPI {
  static login(loginForm: LoginForm) {
    return api
      .post('/users/login', loginForm)
      .then((response) => {
        const token = response.data.token;
        tokenStorage.setToken(token);
        return response.data.msg;
      })
      .catch((error) => {
        throw new Error(`Login failed: ${error}`);
      });
  }

  static signup(signupForm: SignupForm) {
    return api
      .post('/users/create', signupForm)
      .then((response) => {
        const token = response.data.token;
        tokenStorage.setToken(token);
        return response.data.msg;
      })
      .catch((error) => {
        throw new Error(`Signup failed: ${error}`);
      });
  }
}
