import api from '../api';

export type TodoPayload = {
  title: string;
  content: string;
};

export default class TodoAPI {
  static getTodos() {
    return api
      .get('/todos')
      .then((response) => response.data?.data)
      .catch((error) => {
        throw new Error(`Getting todos failed: ${error}`);
      });
  }

  static createTodo(todoPayload: TodoPayload) {
    return api
      .post('/todos', todoPayload)
      .then((response) => response.data?.data)
      .catch((error) => {
        throw new Error(`Creating todos failed: ${error}`);
      });
  }

  static updateTodo({
    id,
    todoPayload,
  }: {
    id: string;
    todoPayload: TodoPayload;
  }) {
    return api
      .put(`/todos/${id}`, todoPayload)
      .then((response) => response.data?.data)
      .catch((error) => {
        throw new Error(`Updating todos failed: ${error}`);
      });
  }

  static deleteTodo(id: string) {
    return api
      .delete(`/todos/${id}`)
      .then((response) => response.data?.data)
      .catch((error) => {
        throw new Error(`Deleting todos failed: ${error}`);
      });
  }
}
