import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '../../types/CharacterTypes';

const Container = styled.div`
  width: fit-content;
  margin: 48px auto;
`;

const Button = styled.button``;
type Props = {
  pagination: Pagination;
};

const PaginationBar = ({ pagination }: Props) => {
  const { limit, total } = pagination;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const lastPage = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const middlePages = useMemo(() => {
    const pagesArray = [];

    if (currentPage < 5) {
      const firstValues = [2, 3, 4, 5];
      pagesArray.push(...firstValues.slice(0, lastPage - 1));

      if (pagesArray.length < 4) {
        return pagesArray;
      }
    } else {
      pagesArray.push(-1, currentPage - 1, currentPage, currentPage + 1);
    }

    if (currentPage <= lastPage - 4) {
      pagesArray.push(-1);
    } else {
      pagesArray.push(lastPage - 1);
    }

    return pagesArray;
  }, [currentPage, lastPage]);

  return (
    <Container>
      <Button>{'|<'}</Button>
      <Button>{'<'}</Button>
      <Button>1</Button>
      {middlePages.map((item) => (
        <Button>{item > -1 ? item : '...'}</Button>
      ))}
      {lastPage > 1 && <Button>{lastPage}</Button>}
      <Button>{'>'}</Button>
      <Button>{'>|'}</Button>
    </Container>
  );
};

export default PaginationBar;
