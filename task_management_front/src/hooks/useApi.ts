import { useCallback } from 'react';
import api from '../api/client';

export function useApi() {
  const callApi = useCallback(
    async (method: string, url: string, data?: any, params?: any) => {
      try {
        const res = await api.request({ method, url, data, params });
        return [res.data, null];
      } catch (e: any) {
        return [null, e.response?.data?.error || 'API error'];
      }
    },
    []
  );
  return { callApi };
}
