import { FormEvent, useRef } from 'react';

// component
import TodoItem, { Todo } from '../../components/TodoItem';

// hooks
import useCreateTodo from '../../hooks/mutations/useCreateTodo';
import useGetTodos from '../../hooks/queries/useGetTodos';

// style
import {
  StyledInput,
  StyledTextArea,
  TodoBox,
  TodoContainer,
  TodoForm,
} from '../styled';

function TodoPage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { isLoading, data } = useGetTodos();
  const createMutation = useCreateTodo();

  const onSubmitTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titleRef.current || !contentRef.current) return;

    createMutation.mutate({
      title: titleRef.current.value,
      content: contentRef.current.value,
    });

    titleRef.current.value = '';
    contentRef.current.value = '';
  };

  return (
    <main>
      <TodoContainer>
        <h3>할 일 쓰기</h3>
        <TodoForm onSubmit={onSubmitTodo}>
          <StyledInput
            ref={titleRef}
            name="title"
            type="text"
            placeholder="제목"
          />
          <StyledTextArea
            ref={contentRef}
            name="content"
            placeholder="TODO 내용"
            autoComplete="off"
          />
          <button type="submit">글 쓰기</button>
        </TodoForm>
        <h3>할 일 목록</h3>
        <TodoBox>
          {isLoading ? (
            <p>로딩중...</p>
          ) : (
            data
              ?.map((todoInfo: Todo) => (
                <div key={todoInfo.id}>
                  <TodoItem {...todoInfo} />
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
