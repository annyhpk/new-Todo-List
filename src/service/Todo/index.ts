import api from '../api';

export type TodoForm = {
  title: string;
  content: string;
};

export default class TodoAPI {
  static async getTodos() {
    try {
      return await api.get('/todos');
    } catch (error) {
      throw new Error(`Getting todos failed: ${error}`);
    }
  }

  static async createTodo(todoForm: TodoForm) {
    try {
      return await api.post('/todos', todoForm);
    } catch (error) {
      throw new Error(`create todo failed: ${error}`);
    }
  }

  static async updateTodo(id: string, todoForm: TodoForm) {
    try {
      return await api.put(`/todos/${id}`, todoForm);
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
