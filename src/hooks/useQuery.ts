import { useMemo } from 'react';

function useQuery(search: string) {
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default useQuery;
