import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-44665544000001',
    message: 'Category deleted successfully',
  },
};

export const deleteCategory = async (id) => {
  const response = await fetcher.delete(`/categories/${id}`);
  return response.data;
};

export const useDeleteCategory = () =>
  useSWRMutation(
    'delete-category',
    (key, { arg: id }) =>
      fetcher.delete(`/categories/${id}`)
  );
