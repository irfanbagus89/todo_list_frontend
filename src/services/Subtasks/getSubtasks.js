import useSWR from 'swr';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: [
    {
      id: '550e8400-e29b-41d4-a716-44665544000001',
      todo_id: '550e8400-e29b-41d4-a716-44665544000002',
      title: 'Subtask 1',
      completed: false,
      created_at: '2026-02-04T09:00:00Z',
      updated_at: '2026-02-04T09:00:00Z',
    },
  ],
};

export const getSubtasks = async (todoId, params) => {
  const response = await fetcher.get(`/todos/${todoId}/subtasks`, { params });
  return response.data?.Data?.data;
};

export const useGetSubtasks = (todoId, params) =>
  useSWR(`/todos/${todoId}/subtasks`, () => getSubtasks(todoId, params));
