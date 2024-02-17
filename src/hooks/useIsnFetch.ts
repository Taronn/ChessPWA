import { useFetch } from 'use-http';
import { useEnvVars } from './useEnvVars';

export function useIsnFetch(path: string, options = {}) {
  const { authServerURL } = useEnvVars();
  return useFetch(`${authServerURL}${path}`, options);
}
