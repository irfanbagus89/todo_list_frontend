import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMe } from '@/services/Auth/me';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const router = useRouter();
  const { setUser, setLoading, logout: storeLogout } = useAuthStore();
  const [loading, setLoadingState] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoadingState(true);
        setLoading(true);
        const user = await getMe();
        setUser(user);
        setLoadingState(false);
        setLoading(false);
      } catch (error) {
        setUser(null);
        setLoadingState(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setLoading]);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      storeLogout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    user: useAuthStore((state) => state.user),
    isAuthenticated: useAuthStore((state) => state.isAuthenticated),
    loading,
    logout,
  };
}
