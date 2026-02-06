import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-4466554400001',
    title: 'Updated todo item',
    description: 'Updated description',
    priority: 'high',
    status: 'in_progress',
    deadline: '2026-02-10T10:00:00Z',
    createdAt: '2026-02-04T09:00:00Z',
    updatedAt: '2026-02-04T10:00:00Z',
  },
};

export const updateTodo = async (id, todoData) => {
  const response = await fetcher.put(`/todos/${id}`, todoData);
  return response.data;
};

export const useUpdateTodo = () =>
  useSWRMutation(
    'update-todo',
    (key, { arg: { id, data } }) =>
      fetcher.put(`/todos/${id}`, data)
  );
