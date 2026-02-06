import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-44665544000001',
    name: 'Updated Category',
    color: '#3B82F6',
    createdAt: '2026-02-04T09:00:00Z',
    updatedAt: '2026-02-04T10:00:00Z',
  },
};

export const updateCategory = async (id, categoryData) => {
  const response = await fetcher.put(`/categories/${id}`, categoryData);
  return response.data;
};

export const useUpdateCategory = () =>
  useSWRMutation(
    'update-category',
    (key, { arg: { id, data } }) =>
      fetcher.put(`/categories/${id}`, data)
  );
