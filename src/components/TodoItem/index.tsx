import { memo, useCallback, useRef, useState } from 'react';

// hooks
import useDeleteTodo from '../../hooks/mutations/useDeleteTodo';
import useUpdateTodo from '../../hooks/mutations/useUpdateTodo';

// style
import {
  Content,
  DeleteButton,
  Title,
  UpdateButton,
  UpdateInput,
  Wrapper,
} from './styled';

export type Todo = {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

function TodoItem({ id, title, content }: Todo) {
  const [modifyToggle, setModifyToggle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const onClickUpdate = useCallback(() => {
    setModifyToggle((prev) => !prev);
    if (!modifyToggle || !titleInputRef.current || !contentInputRef.current) {
      return;
    }

    const payload = {
      title: titleInputRef.current.value,
      content: contentInputRef.current.value,
    };

    updateMutation.mutate({ id, payload });
  }, [modifyToggle]);

  const onClickDelete = useCallback(() => {
    deleteMutation.mutate(id);
  }, []);

  return (
    <Wrapper>
      {modifyToggle ? (
        <form>
          <UpdateInput
            ref={titleInputRef}
            name="title"
            type="text"
            defaultValue={title}
          />
          <UpdateInput
            ref={contentInputRef}
            name="content"
            type="text"
            defaultValue={content}
          />
        </form>
      ) : (
        <div>
          <Title>{title}</Title>
          <Content>{content}</Content>
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

export default memo(TodoItem);
