import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import tokenStorage from '../utils/tokenStorage';
import { SERVER_URL } from '../constants';

export type LoginForm = {
  email: string;
  password: string;
};

export type SignupForm = {
  email: string;
  password: string;
};

export type TodoForm = {
  title: string;
  content: string;
};

export default class HttpClient {
  static instance: HttpClient;
  readonly api: AxiosInstance = Axios.create({
    baseURL: SERVER_URL,
    headers: {
      Authorization: tokenStorage.getToken(),
    },
  });
  constructor() {
    if (HttpClient.instance) {
      return HttpClient.instance;
    }
    HttpClient.instance = this;
  }

  async login(loginForm: LoginForm): Promise<AxiosResponse> {
    try {
      const res = await this.api.post('/users/login', loginForm);
      this.api.defaults.headers.common['Authorization'] = res.data.token;
      return res;
    } catch (error) {
      alert('아이디 또는 암호가 올바르지 않습니다.');
      throw new Error(`Login failed: ${error}`);
    }
  }

  async signup(signupForm: SignupForm): Promise<AxiosResponse> {
    try {
      const res = await this.api.post('/users/create', signupForm);
      this.api.defaults.headers.common['Authorization'] = res.data.token;
      return res;
    } catch (error) {
      alert('죄송합니다. 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
      throw new Error(`Signup failed: ${error}`);
    }
  }

  async getTodos(): Promise<AxiosResponse> {
    try {
      const res = await this.api.get('/todos');
      return res;
    } catch (error) {
      throw new Error(`Getting todos failed: ${error}`);
    }
  }

  async createTodo(todoForm: TodoForm): Promise<AxiosResponse> {
    try {
      const res = await this.api.post('/todos', todoForm);
      return res;
    } catch (error) {
      throw new Error(`create todo failed: ${error}`);
    }
  }

  async updateTodo(id: string, todoForm: TodoForm): Promise<AxiosResponse> {
    try {
      const res = await this.api.put(`/todos/${id}`, todoForm);
      return res;
    } catch (error) {
      throw new Error(`Update todo failed: ${error}`);
    }
  }

  async deleteTodo(id: string): Promise<AxiosResponse> {
    try {
      const res = await this.api.delete(`/todos/${id}`);
      return res;
    } catch (error) {
      throw new Error(`Delete todo failed: ${error}`);
    }
  }
}
