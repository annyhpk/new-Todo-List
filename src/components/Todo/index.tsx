import {
  useCallback,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  memo,
} from 'react';
import HttpClient from '../../service/httpClient';

import {
  UpdateButton,
  DeleteButton,
  UpdateInput,
  Wrapper,
  Title,
  Content,
} from './styled';

export type TodoType = {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

type Props = TodoType & {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
};

type TodoInputType = {
  title: string;
  content: string;
};

function Todo({ setTodos, id, title, content }: Props) {
  const [modifyInput, setModifyInput] = useState<TodoInputType>({
    title,
    content,
  });
  const [modifyMode, setModifyMode] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const httpClient = new HttpClient();

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
    setModifyMode((prev) => !prev);
    if (!modifyMode || !formRef.current) {
      return;
    }
    const form = new FormData(formRef.current);
    const TodoForm = {
      title: form.get('title') as string,
      content: form.get('content') as string,
    };

    try {
      const res = await httpClient.updateTodo(id, TodoForm);
      setModifyInput((prev) => ({
        ...prev,
        title: res.data.data.title,
        content: res.data.data.content,
      }));
    } catch (err: any) {
      throw new Error(err);
    }
  }, [modifyMode, modifyInput]);

  const onClickDelete = useCallback(async () => {
    try {
      await httpClient.deleteTodo(id);
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
