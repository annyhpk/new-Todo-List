import api from '../api';

export type TodoPayload = {
  title: string;
  content: string;
};

export default class TodoAPI {
  static async getTodos() {
    try {
      const res = await api.get('/todos');
      return res?.data?.data;
    } catch (error) {
      throw new Error(`Getting todos failed: ${error}`);
    }
  }

  static async createTodo(todoPayload: TodoPayload) {
    try {
      return await api.post('/todos', todoPayload);
    } catch (error) {
      throw new Error(`create todo failed: ${error}`);
    }
  }

  static async updateTodo({
    id,
    todoPayload,
  }: {
    id: string;
    todoPayload: TodoPayload;
  }) {
    try {
      return await api.put(`/todos/${id}`, todoPayload);
    } catch (error) {
      throw new Error(`Update todo failed: ${error}`);
    }
  }

  static async deleteTodo(id: string) {
    try {
      return await api.delete(`/todos/${id}`);
    } catch (error) {
      throw new Error(`Delete todo failed: ${error}`);
    }
  }
}
