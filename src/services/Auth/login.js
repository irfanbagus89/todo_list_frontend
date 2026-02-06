import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    user: {
      id: '550e8400-e29b-41d4-a716-4466554400001',
      email: 'user@example.com',
      name: 'John Doe',
    },
  },
};

export const login = async (credentials) => {
  const response = await fetcher.post('/auth/login', credentials);
  return response;
};

export const useLogin = () =>
  useSWRMutation('/auth/login', (url, { arg }) => fetcher.post(url, arg));
