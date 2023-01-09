import Axios from 'axios';
import { useCallback, useState, ChangeEvent, Dispatch, SetStateAction, useRef, memo } from 'react';

import { UpdateButton, DeleteButton, UpdateInput, Wrapper, Title, Content } from './styled';

export type TodoType = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type Props = TodoType & {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
};

type TodoInputType = {
  title: string;
  content: string;
};

function Todo({ setTodos, id, title, content, createdAt, updatedAt }: Props) {
  const [modifyInput, setModifyInput] = useState<TodoInputType>({ title, content });
  const [modifyMode, setModifyMode] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setModifyInput((prev) => {
      return { ...prev, title: event.target.value };
    });
  }, []);

  const onChangeContent = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setModifyInput((prev) => {
      return { ...prev, content: event.target.value };
    });
  }, []);

  const onClickUpdate = useCallback(async () => {
    setModifyMode((prev) => !prev);
    if (!modifyMode || !formRef.current) {
      return;
    }
    const form = new FormData(formRef.current);
    const TodoData = {
      title: form.get('title'),
      content: form.get('content'),
    };
    console.log(TodoData);
    try {
      await Axios.put(`http://localhost:8080/todos/${id}`, TodoData, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }, [modifyMode, modifyInput]);

  const onClickDelete = useCallback(async () => {
    try {
      await Axios.delete(`http://localhost:8080/todos/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setTodos((prev) => [...prev.filter((todo) => todo.id !== id)]);
    } catch (err: any) {
      throw new Error(err);
    }
  }, []);

  return (
    <Wrapper>
      {modifyMode ? (
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
          {modifyMode ? '✅' : '⚙️'}
        </UpdateButton>
        <DeleteButton type="button" onClick={onClickDelete}>
          🗑️
        </DeleteButton>
      </div>
    </Wrapper>
  );
}

export default memo(Todo);
