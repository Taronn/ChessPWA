import { useFetch } from 'use-http';
import { useEnvVars } from './useEnvVars';
import { toCamel } from '../utils/convertKeysToCamelCase';

export function useIsnFetch(path: string, options = {}) {
  const { authServerURL } = useEnvVars();

  return useFetch(`${authServerURL}${path}`, {
    ...options,
    retries: 1,
    retryOn: [401],
    retryDelay: 1000,
    interceptors: {
      request: async ({ options }) => {
        options.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return options;
      },
      response: async ({ response }) => {
        if (response.status === 401) {
          await refreshTokens();
        }
        response.data = toCamel(response.data);
        return response;
      }
    }
  });
}

export async function refreshTokens() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {authServerURL} = useEnvVars();
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await fetch(`${authServerURL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ RefreshToken: refreshToken }),
  })
  if (response.ok) {
    const { AccessToken, RefreshToken } = await response.json();
    localStorage.setItem('accessToken', AccessToken);
    localStorage.setItem('refreshToken', RefreshToken);
    return true;
  }
  return false;
}

