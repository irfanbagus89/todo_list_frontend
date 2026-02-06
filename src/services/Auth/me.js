import useSWR from 'swr';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    id: '550e8400-e29b-41d4-a716-4466554400001',
    email: 'user@example.com',
    name: 'John Doe',
    createdAt: '2024-01-01T00:00:00Z',
  },
};

export const getMe = async () => {
  const response = await fetcher.get('/auth/me');
  return response.data;
};

export const useGetMe = () => useSWR('user', getMe);
