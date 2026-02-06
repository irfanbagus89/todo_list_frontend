import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-4466554400001',
    title: 'Todo item',
    description: 'Description',
    priority: 'high',
    status: 'completed',
    deadline: '2026-02-10T10:00:00Z',
    createdAt: '2026-02-04T09:00:00Z',
    updatedAt: '2026-02-04T10:00:00Z',
  },
};

export const toggleTodo = async (id) => {
  const response = await fetcher.patch(`/todos/${id}`);
  return response.data;
};

export const useToggleTodo = () =>
  useSWRMutation(
    'toggle-todo',
    (key, { arg: id }) =>
      fetcher.patch(`/todos/${id}`)
  );
