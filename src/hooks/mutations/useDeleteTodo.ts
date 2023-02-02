import { useMutation, useQueryClient } from 'react-query';
// API
import TodoAPI from '../../service/Todo';

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(TodoAPI.deleteTodo, {
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  return mutation;
};

export default useDeleteTodo;
