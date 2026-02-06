import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-4466554400001',
    title: 'New todo item',
    description: 'Todo description',
    priority: 'medium',
    status: 'pending',
    deadline: '2026-02-10T10:00:00Z',
    createdAt: '2026-02-04T09:00:00Z',
    updatedAt: '2026-02-04T09:00:00Z',
  },
};

export const createTodo = async (todoData) => {
  const response = await fetcher.post('/todos', todoData);
  return response.data;
};

export const useCreateTodo = () =>
  useSWRMutation('/todos', (url, { arg }) => fetcher.post(url, arg));
