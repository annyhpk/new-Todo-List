import { Todo } from '../../components/TodoItem';
import api from '../api';

export type Payload = {
  title: string;
  content: string;
};

export default class TodoAPI {
  static getTodos(): Promise<Todo[]> {
    return api
      .get('/todos')
      .then((response) => response.data?.data as Todo[])
      .catch((error) => {
        throw new Error(`Getting todos failed: ${error}`);
      });
  }

  static createTodo(payload: Payload): Promise<Todo> {
    return api
      .post('/todos', payload)
      .then((response) => response.data?.data as Todo)
      .catch((error) => {
        throw new Error(`Creating todos failed: ${error}`);
      });
  }

  static updateTodo({
    id,
    payload,
  }: {
    id: string;
    payload: Payload;
  }): Promise<Todo> {
    return api
      .put(`/todos/${id}`, payload)
      .then((response) => response.data?.data as Todo)
      .catch((error) => {
        throw new Error(`Updating todos failed: ${error}`);
      });
  }

  static deleteTodo(id: string): Promise<void> {
    return api
      .delete(`/todos/${id}`)
      .then((response) => response.data?.data)
      .catch((error) => {
        throw new Error(`Deleting todos failed: ${error}`);
      });
  }
}
