import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-44665544000001',
    todo_id: '550e8400-e29b-41d4-a716-44665544000002',
    title: 'Subtask 1',
    completed: true,
    created_at: '2026-02-04T09:00:00Z',
    updated_at: '2026-02-04T10:00:00Z',
  },
};

export const toggleSubtask = async (todoId, subtaskId) => {
  const response = await fetcher.patch(`/todos/${todoId}/subtasks/${subtaskId}/toggle`);
  return response.data;
};

export const useToggleSubtask = (todoId) =>
  useSWRMutation(
    `toggle-subtask-${todoId}`,
    (key, { arg: subtaskId }) =>
      fetcher.patch(`/todos/${todoId}/subtasks/${subtaskId}/toggle`)
  );
