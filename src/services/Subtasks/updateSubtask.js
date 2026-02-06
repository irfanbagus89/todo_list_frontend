import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-44665544000001',
    todoId: '550e8400-e29b-41d4-a716-44665544000002',
    title: 'Updated Subtask',
    completed: true,
    createdAt: '2026-02-04T09:00:00Z',
    updatedAt: '2026-02-04T10:00:00Z',
  },
};

export const updateSubtask = async (todoId, id, subtaskData) => {
  const response = await fetcher.put(`/todos/${todoId}/subtasks/${id}`, subtaskData);
  return response.data;
};

export const useUpdateSubtask = (todoId) =>
  useSWRMutation(
    `update-subtask-${todoId}`,
    (key, { arg: { subtaskId, data } }) =>
      fetcher.put(`/todos/${todoId}/subtasks/${subtaskId}`, data)
  );
