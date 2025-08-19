import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { setCookie, getCookie, removeCookie } from '@/lib/cookies';
import { logoutUser } from '@/services/auth';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  isFirstLogin?: boolean;
}

interface AuthResult {
  id: number;
  name: string;
  email: string;
  token: string;
  isFirstLogin?: boolean;
}

export const useAuth = () => {
  const router = useRouter();

  const login = (authResult: AuthResult) => {
    try {
      // Define cookie de autenticação (compatível com middleware)
      setCookie('auth_token', authResult.token, {
        days: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // Define cookie com dados do usuário
      const userData = {
        id: authResult.id,
        name: authResult.name,
        email: authResult.email,
        isFirstLogin: authResult.isFirstLogin
      };
      
      setCookie('user_data', JSON.stringify(userData), {
        days: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // Migração suave: remove dados antigos do localStorage se existirem
      if (typeof window !== 'undefined') {
        localStorage.removeItem('gubi_token');
        localStorage.removeItem('gubi_user');
      }

      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro interno. Tente novamente.');
      return false;
    }
  };

  const logout = async () => {
    const token = getCookie('auth_token');
    
    try {
      // Tentar fazer logout na API se houver token
      if (token) {
        await logoutUser(token);
      }
    } catch (error) {
      console.warn('Erro no logout da API (continuando com limpeza local):', error);
    }

    // Sempre limpar dados locais, independente do resultado da API
    removeCookie('auth_token');
    removeCookie('user_data');
    
    // Limpeza adicional do localStorage (dados legados)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gubi_token');
      localStorage.removeItem('gubi_user');
    }
    
    toast.success('Logout realizado com sucesso');
    router.push('/');
  };

  const getCurrentUser = useCallback((): User | null => {
    const userDataStr = getCookie('user_data');
    if (!userDataStr) return null;
    
    try {
      return JSON.parse(userDataStr);
    } catch {
      return null;
    }
  }, []);

  const isAuthenticated = useCallback((): boolean => {
    return getCookie('auth_token') !== null;
  }, []);

  const getAuthToken = useCallback((): string | null => {
    return getCookie('auth_token');
  }, []);

  return {
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    getAuthToken
  };
};
