import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-44665544000001',
    todoId: '550e8400-e29b-41d4-a716-44665544000002',
    title: 'New Subtask',
    completed: false,
    createdAt: '2026-02-04T09:00:00Z',
    updatedAt: '2026-02-04T09:00:00Z',
  },
};

export const createSubtask = async (todoId, subtaskData) => {
  const response = await fetcher.post(`/todos/${todoId}/subtasks`, subtaskData);
  return response.data;
};

export const useCreateSubtask = (todoId) =>
  useSWRMutation(
    `/todos/${todoId}/subtasks`,
    (url, { arg }) => fetcher.post(url, arg)
  );
