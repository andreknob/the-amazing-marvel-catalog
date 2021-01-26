import * as H from 'history';
import { useCallback, useMemo } from 'react';

function usePaginationLogic(currentPage: number, lastPage: number) {
  const middlePages = useMemo(() => {
    const pagesArray = [];

    if (currentPage < 5) {
      const firstValues = [2, 3, 4, 5];
      const adjustingOffset = 2; // We need to consider that page count starts at one. Also that we don't want to include the last page.
      pagesArray.push(
        ...firstValues.slice(0, Math.max(lastPage - adjustingOffset, 0)),
      );

      if (pagesArray.length < 4) {
        return pagesArray;
      }
    } else {
      // the offset from the current page depends on the distance between the current and last pages
      const offset = 3 - Math.min(lastPage - currentPage, 2);
      const middleValues = [
        -2,
        currentPage - offset,
        currentPage - offset + 1,
        currentPage - offset + 2,
      ];

      pagesArray.push(...middleValues);
    }

    if (currentPage <= lastPage - 4) {
      pagesArray.push(-1);
    } else if (!pagesArray.includes(lastPage - 1)) {
      pagesArray.push(lastPage - 1);
    }

    return pagesArray;
  }, [currentPage, lastPage]);

  const handleMiddlePageClick = useCallback(
    (item) => {
      if (item > -1) {
        return item;
      }

      let newPage;
      if (item === -2) {
        newPage = currentPage - 2;
      } else {
        newPage = currentPage + 2;
      }

      return newPage;
    },
    [currentPage],
  );

  const getRoute = useCallback((location: H.Location, page: number) => {
    const searchMatch = location.search
      ? location.search.match(/search=[^&]*/)
      : null;

    return `${location.pathname}${
      searchMatch ? `?${searchMatch[0]}&page=${page}` : `?page=${page}`
    }`;
  }, []);

  return { middlePages, handleMiddlePageClick, getRoute };
}

export default usePaginationLogic;
