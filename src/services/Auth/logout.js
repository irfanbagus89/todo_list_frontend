import useSWRMutation from 'swr/mutation';
import fetcher from '@/lib/fetcher/fetcherApi';

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    message: 'Logged out successfully',
  },
};

export const logout = async () => {
  const response = await fetcher.post('/auth/logout');
  return response.data;
};

export const useLogout = () =>
  useSWRMutation('/auth/logout', (url) => fetcher.post(url));
