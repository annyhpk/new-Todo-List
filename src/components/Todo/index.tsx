import { ChangeEvent, memo, useCallback, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

// API
import TodoAPI from '../../service/Todo';

// style
import {
  Content,
  DeleteButton,
  Title,
  UpdateButton,
  UpdateInput,
  Wrapper,
} from './styled';

export type Props = {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

type TodoInputType = {
  title: string;
  content: string;
};

function Todo({ id, title, content }: Props) {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [modifyInput, setModifyInput] = useState<TodoInputType>({
    title,
    content,
  });
  const [modifyToggle, setModifyToggle] = useState(false);
  const updateMutation = useMutation(TodoAPI.updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
  const deleteMutation = useMutation(TodoAPI.deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const onChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setModifyInput((prev) => {
      return { ...prev, title: event.target.value };
    });
  }, []);

  const onChangeContent = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setModifyInput((prev) => {
        return { ...prev, content: event.target.value };
      });
    },
    []
  );

  const onClickUpdate = useCallback(async () => {
    setModifyToggle((prev) => !prev);
    if (!modifyToggle || !formRef.current) {
      return;
    }

    const form = new FormData(formRef.current);
    const todoPayload = {
      title: form.get('title') as string,
      content: form.get('content') as string,
    };

    updateMutation.mutate({ id, todoPayload });
  }, [modifyToggle, modifyInput]);

  const onClickDelete = useCallback(async () => {
    deleteMutation.mutate(id);
  }, []);

  return (
    <Wrapper>
      {modifyToggle ? (
        <form ref={formRef}>
          <UpdateInput
            name="title"
            type="text"
            value={modifyInput.title}
            onChange={onChangeTitle}
          />
          <UpdateInput
            name="content"
            type="text"
            value={modifyInput.content}
            onChange={onChangeContent}
          />
        </form>
      ) : (
        <div>
          <Title>{modifyInput.title}</Title>
          <Content>{modifyInput.content}</Content>
        </div>
      )}
      <div>
        <UpdateButton type="button" onClick={onClickUpdate}>
          {modifyToggle ? '✅' : '⚙️'}
        </UpdateButton>
        <DeleteButton type="button" onClick={onClickDelete}>
          🗑️
        </DeleteButton>
      </div>
    </Wrapper>
  );
}

export default memo(Todo);
