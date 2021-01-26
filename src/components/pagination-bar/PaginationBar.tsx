import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as H from 'history';
import { Pagination } from '../../types/CommonTypes';
import usePaginationLogic from './usePaginationLogic';

const Container = styled.div`
  width: fit-content;
  margin: 48px auto;
`;

type ButtonProps = {
  selected?: boolean;
};

const Button = styled(Link)<ButtonProps>`
  border: none;
  cursor: pointer;
  background-color: #121214;
  color: white;
  padding: 8px;
  font-size: 18px;
  transition: background-color 0.2s;
  margin: 0 2px;

  ${(props) => props.selected && 'color: #00bcd4;'}

  &:hover {
    background-color: #444;
  }
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
      <Button to={(location: H.Location) => getRoute(location, 1)}>
        {'|<'}
      </Button>
      <Button
        to={(location: H.Location) =>
          getRoute(location, Math.max(currentPage - 1, 1))
        }
      >
        {'<'}
      </Button>
      <Button
        to={(location: H.Location) => getRoute(location, 1)}
        selected={currentPage === 1}
      >
        1
      </Button>
      {middlePages.map((item) => (
        <Button
          key={item}
          to={(location: H.Location) =>
            getRoute(location, handleMiddlePageClick(item))
          }
          selected={currentPage === item}
        >
          {item > -1 ? item : '...'}
        </Button>
      ))}
      {lastPage > 1 && (
        <Button
          to={(location: H.Location) => getRoute(location, lastPage)}
          selected={currentPage === lastPage}
        >
          {lastPage}
        </Button>
      )}
      <Button
        to={(location: H.Location) =>
          getRoute(location, Math.min(currentPage + 1, lastPage))
        }
      >
        {'>'}
      </Button>
      <Button to={(location: H.Location) => getRoute(location, lastPage)}>
        {'>|'}
      </Button>
    </Container>
  );
};

export default PaginationBar;
