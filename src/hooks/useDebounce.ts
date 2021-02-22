import { useEffect, useMemo, useRef } from 'react';

function callFn(fn: () => void, args: []) {
  if (typeof fn === 'function') {
    fn(...args);
  }
}
function useDebounce(fn: () => void, duration: number) {
  const timeoutRef: any = useRef(null); // eslint-disable-line

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  });

  return useMemo(() => {
    clearTimeout(timeoutRef.current);

    return function debounced(...args: []) {
      if (!duration) {
        return callFn(fn, args);
      }

      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        callFn(fn, args);
      }, duration);

      return null;
    };
  }, [fn, duration]);
}

export default useDebounce;
