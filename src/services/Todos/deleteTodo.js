import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-4466554400001',
    message: 'Todo deleted successfully',
  },
};

export const deleteTodo = async (id) => {
  const response = await fetcher.delete(`/todos/${id}`);
  return response.data;
};

export const useDeleteTodo = () =>
  useSWRMutation(
    'delete-todo',
    (key, { arg: id }) =>
      fetcher.delete(`/todos/${id}`)
  );
