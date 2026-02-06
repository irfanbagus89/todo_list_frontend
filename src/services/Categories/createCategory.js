import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-44665544000001',
    name: 'New Category',
    color: '#3B82F6',
    createdAt: '2026-02-04T09:00:00Z',
    updatedAt: '2026-02-04T09:00:00Z',
  },
};

export const createCategory = async (categoryData) => {
  const response = await fetcher.post('/categories', categoryData);
  return response.data;
};

export const useCreateCategory = () =>
  useSWRMutation('/categories', (url, { arg }) => fetcher.post(url, arg));
