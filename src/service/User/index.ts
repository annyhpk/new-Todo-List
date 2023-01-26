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
  static async login(loginForm: LoginForm) {
    try {
      return await api.post('/users/login', loginForm);
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  }

  static async signup(signupForm: SignupForm) {
    try {
      return await api.post('/users/create', signupForm);
    } catch (error) {
      throw new Error(`Signup failed: ${error}`);
    }
  }
}
