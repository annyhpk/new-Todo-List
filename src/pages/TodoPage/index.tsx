import { useCallback, useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Todo, { TodoType } from '../../components/Todo';
import TextArea from '../../components/TextArea';
import Input from '../../components/Input';
import HttpClient from '../../service/httpClient';
import tokenStorage from '../../utils/tokenStorage';

// style
import { TodoContainer, TodoBox, TodoForm } from './styled';

function TodoPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const httpClient = new HttpClient();

  const onSubmitTodo = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const TodoForm = {
      title: form.get('title') as string,
      content: form.get('content') as string,
    };
    try {
      const res = await httpClient.createTodo(TodoForm);
      setTodos((prev) => [...prev, res.data.data]);
    } catch (err: any) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    if (!tokenStorage.getToken()) navigate('/');
  }, []);

  useEffect(() => {
    httpClient
      .getTodos()
      .then((res) => {
        const Data: TodoType[] = res.data.data;
        setTodos(Data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return (
    <main>
      <TodoContainer>
        <h3>할 일 쓰기</h3>
        <TodoForm onSubmit={onSubmitTodo}>
          <Input name="title" type="text" placeholder="제목" />
          <TextArea name="content" placeholder="내용" />
          <button type="submit">글 쓰기</button>
        </TodoForm>
        <h3>할 일 목록</h3>
        <TodoBox>
          {todos.length ? (
            todos.map((todoInfo) => (
              <div key={todoInfo.id}>
                <Todo setTodos={setTodos} {...todoInfo} />
                <hr />
              </div>
            ))
          ) : (
            <p>작성된 항목이 없습니다.</p>
          )}
        </TodoBox>
      </TodoContainer>
    </main>
  );
}

export default TodoPage;
