import { useMutation, useQueryClient } from 'react-query';
// API
import TodoAPI from '../../service/Todo';

const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(TodoAPI.createTodo, {
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  return mutation;
};

export default useCreateTodo;
