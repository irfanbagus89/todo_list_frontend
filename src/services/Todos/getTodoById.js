import useSWR from 'swr';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-4466554400001',
    title: 'Complete project documentation',
    description: 'Update arsitektur-proyek.md file',
    priority: 'high',
    status: 'pending',
    deadline: '2026-02-10T10:00:00Z',
    createdAt: '2026-02-04T09:00:00Z',
    updatedAt: '2026-02-04T09:00:00Z',
  },
};

export const getTodoById = async (id) => {
  const response = await fetcher.get(`/todos/${id}`);
  return response.data;
};

export const useGetTodoById = (id) => useSWR(`todo-${id}`, () => getTodoById(id));
