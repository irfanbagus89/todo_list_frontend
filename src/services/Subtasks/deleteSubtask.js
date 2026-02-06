import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-44665544000001',
    message: 'Subtask deleted successfully',
  },
};

export const deleteSubtask = async (todoId, id) => {
  const response = await fetcher.delete(`/todos/${todoId}/subtasks/${id}`);
  return response.data;
};

export const useDeleteSubtask = (todoId) =>
  useSWRMutation(
    `delete-subtask-${todoId}`,
    (key, { arg: subtaskId }) =>
      fetcher.delete(`/todos/${todoId}/subtasks/${subtaskId}`)
  );
