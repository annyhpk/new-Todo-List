import { useMutation, useQueryClient } from 'react-query';
// API
import TodoAPI from '../../service/Todo';

const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(TodoAPI.updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  return mutation;
};

export default useUpdateTodo;
