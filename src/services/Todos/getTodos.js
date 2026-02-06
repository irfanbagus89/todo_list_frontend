import useSWR from 'swr';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: [
    {
      id: '550e8400-e29b-41d4-a716-4466554400001',
      title: 'Complete project documentation',
      description: 'Update arsitektur-proyek.md file',
      priority: 'high',
      status: 'pending',
      deadline: '2026-02-10T10:00:00Z',
      createdAt: '2026-02-04T09:00:00Z',
      updatedAt: '2026-02-04T09:00:00Z',
    },
  ],
};

export const getTodos = async (params) => {
  const response = await fetcher.get('/todos', { params });
  return response.data?.Data;
};

export const useGetTodos = (params) =>
  useSWR(`todos-${JSON.stringify(params)}`, () => getTodos(params));
