import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import * as H from 'history';
import { Pagination } from '../../types/CommonTypes';
import usePaginationLogic from './usePaginationLogic';
import BarButton from '../bar-button/BarButton';

const Container = styled.div`
  width: fit-content;
  margin: 48px auto;
`;

type Props = {
  pagination: Pagination;
  query: URLSearchParams;
};

const PaginationBar = ({ pagination, query }: Props) => {
  const { limit, total } = pagination;
  const [loadedPage, setLoadedPage] = useState(1);

  const currentPage = useMemo(() => Number(query.get('page') ?? 1), [query]);

  useEffect(() => {
    if (currentPage !== loadedPage) {
      setLoadedPage(currentPage);
    }
  }, [currentPage, loadedPage, setLoadedPage]);

  const lastPage = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const { middlePages, handleMiddlePageClick, getRoute } = usePaginationLogic(
    currentPage,
    lastPage,
  );

  return (
    <Container>
      <BarButton to={(location: H.Location) => getRoute(location, 1)}>
        {'|<'}
      </BarButton>
      <BarButton
        to={(location: H.Location) =>
          getRoute(location, Math.max(currentPage - 1, 1))
        }
      >
        {'<'}
      </BarButton>
      <BarButton
        to={(location: H.Location) => getRoute(location, 1)}
        selected={currentPage === 1}
      >
        1
      </BarButton>
      {middlePages.map((item) => (
        <BarButton
          key={item}
          to={(location: H.Location) =>
            getRoute(location, handleMiddlePageClick(item))
          }
          selected={currentPage === item}
        >
          {item > -1 ? item : '...'}
        </BarButton>
      ))}
      {lastPage > 1 && (
        <BarButton
          to={(location: H.Location) => getRoute(location, lastPage)}
          selected={currentPage === lastPage}
        >
          {lastPage}
        </BarButton>
      )}
      <BarButton
        to={(location: H.Location) =>
          getRoute(location, Math.min(currentPage + 1, lastPage))
        }
      >
        {'>'}
      </BarButton>
      <BarButton to={(location: H.Location) => getRoute(location, lastPage)}>
        {'>|'}
      </BarButton>
    </Container>
  );
};

export default PaginationBar;
