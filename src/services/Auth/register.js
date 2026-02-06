import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    user: {
      id: '550e8400-e29b-41d4-a716-44665544000001',
      email: 'user@example.com',
      name: 'John Doe',
    },
  },
};

export const register = async (userData) => {
  const response = await fetcher.post('/auth/register', userData);
  return response.data;
};

export const useRegister = () =>
  useSWRMutation('/auth/register', (url, { arg }) => fetcher.post(url, arg));
