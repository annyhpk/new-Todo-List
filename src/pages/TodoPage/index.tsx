import { FormEvent, useCallback, useRef } from 'react';

// component
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Todo, { Props } from '../../components/Todo';

// hooks
import useCreateTodo from '../../hooks/mutations/useCreateTodo';
import useGetTodos from '../../hooks/queries/useGetTodos';

// style
import { TodoBox, TodoContainer, TodoForm } from './styled';

function TodoPage() {
  const todoInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const { isLoading, data } = useGetTodos();
  const createMutation = useCreateTodo();

  const onSubmitTodo = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoInputRef.current || !contentInputRef.current) return;

    createMutation.mutate({
      title: todoInputRef.current.value,
      content: contentInputRef.current.value,
    });

    if (createMutation.isSuccess) {
      todoInputRef.current.value = '';
      contentInputRef.current.value = '';
    }
  }, []);

  return (
    <main>
      <TodoContainer>
        <h3>할 일 쓰기</h3>
        <TodoForm onSubmit={onSubmitTodo}>
          <Input
            ref={todoInputRef}
            name="title"
            type="text"
            placeholder="제목"
          />
          <TextArea ref={contentInputRef} name="content" placeholder="내용" />
          <button type="submit">글 쓰기</button>
        </TodoForm>
        <h3>할 일 목록</h3>
        <TodoBox>
          {isLoading ? (
            <p>로딩중...</p>
          ) : (
            data
              .map((todoInfo: Props) => (
                <div key={todoInfo.id}>
                  <Todo {...todoInfo} />
                  <hr />
                </div>
              ))
              .reverse()
          )}
        </TodoBox>
      </TodoContainer>
    </main>
  );
}

export default TodoPage;
