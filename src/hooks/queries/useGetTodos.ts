import { useQuery } from 'react-query';

// API
import TodoAPI from '../../service/Todo';

const useGetTodos = () => {
  const query = useQuery(['todos'], TodoAPI.getTodos, {
    suspense: true,
  });

  return query;
};


export default useGetTodos;