import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '../../types/CharacterTypes';

const Container = styled.div`
  width: fit-content;
  margin: 48px auto;
`;

type ButtonProps = {
  isActive?: boolean;
};

const Button = styled.button<ButtonProps>`
  border: none;
  background-color: white;
  cursor: pointer;
  padding: 8px;
  font-size: 18px;
  transition: background-color 0.2s;
  margin: 0 2px;

  ${(props) => props.isActive && 'color: #00bcd4;'}

  &:hover {
    background-color: #ddd;
  }
`;

type Props = {
  pagination: Pagination;
  onPageChange: Function;
};

const PaginationBar = ({ pagination, onPageChange }: Props) => {
  const { limit, total } = pagination;
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPage, setLoadedPage] = useState(1);

  useEffect(() => {
    if (currentPage !== loadedPage) {
      onPageChange(currentPage);
      setLoadedPage(currentPage);
    }
  }, [currentPage, loadedPage, setLoadedPage, onPageChange]);

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
      const distance = 3 - Math.min(lastPage - currentPage, 2);
      const middleValues = [
        -2,
        currentPage - distance,
        currentPage - distance + 1,
        currentPage - distance + 2,
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

  const handleFirstPageClick = useCallback(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  const handleLastPageClick = useCallback(() => {
    setCurrentPage(lastPage);
  }, [lastPage, setCurrentPage]);

  const handleMiddlePageClick = useCallback(
    (item) => {
      if (item > -1) {
        setCurrentPage(item);
        return;
      }

      if (item === -2) {
        setCurrentPage(currentPage - 2);
        return;
      }
      setCurrentPage(currentPage + 2);
    },
    [currentPage, setCurrentPage],
  );

  return (
    <Container>
      <Button onClick={handleFirstPageClick}>{'|<'}</Button>
      <Button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}>
        {'<'}
      </Button>
      <Button onClick={handleFirstPageClick} isActive={currentPage === 1}>
        1
      </Button>
      {middlePages.map((item) => (
        <Button
          key={item}
          onClick={() => handleMiddlePageClick(item)}
          isActive={currentPage === item}
        >
          {item > -1 ? item : '...'}
        </Button>
      ))}
      {lastPage > 1 && (
        <Button
          onClick={handleLastPageClick}
          isActive={currentPage === lastPage}
        >
          {lastPage}
        </Button>
      )}
      <Button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, lastPage))}
      >
        {'>'}
      </Button>
      <Button onClick={handleLastPageClick}>{'>|'}</Button>
    </Container>
  );
};

export default PaginationBar;
