import { useCallback, FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import Todo, { Props } from '../../components/Todo';
import TextArea from '../../components/TextArea';
import Input from '../../components/Input';

// API
import TodoAPI from '../../service/Todo';

// style
import { TodoContainer, TodoBox, TodoForm } from './styled';

function TodoPage() {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery(['todos'], TodoAPI.getTodos, {
    suspense: true,
  });
  const mutation = useMutation(TodoAPI.createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const onSubmitTodo = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      mutation.mutate({
        title: form.get('title') as string,
        content: form.get('content') as string,
      });
    },
    []
  );

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
