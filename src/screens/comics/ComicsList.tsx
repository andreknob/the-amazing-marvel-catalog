import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import Loading from '../../components/loading-spinner/LoadingSpinner';
import Modal from '../../components/modal/Modal';
import PaginationBar from '../../components/pagination-bar/PaginationBar';
import ComicsService from '../../services/ComicsService';
import { Comic } from '../../types/ComicTypes';
import { Pagination } from '../../types/CommonTypes';
import ComicModalContent from './ComicModalContent';
import useQuery from '../../hooks/useQuery';
import ListItem from '../../components/list/ListItem';

const PAGE_LIMIT = 20;

const Container = styled.div`
  width: 70%;
  margin: 32px auto 0 auto;
`;

const Comics = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function ComicsList({ location }: RouteComponentProps) {
  const [pagination, setPagination] = useState<Pagination>();
  const [dataProvider, setDataProvider] = useState<string>();
  const [comics, setComics] = useState<Comic[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const query = useQuery(location.search);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const searchTerm = query.get('search');
    const page = query.get('page') ?? 1;

    const offset = (Number(page) - 1) * PAGE_LIMIT;
    const { data, attributionText } = await ComicsService.get(
      offset,
      searchTerm,
    );
    const { results, ...paginationData } = data;

    setComics(results);
    setDataProvider(attributionText);
    setPagination(paginationData);
    setIsLoading(false);
  }, [setComics, setDataProvider, setPagination, query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleItemClick = useCallback(
    (index) => {
      setIsModalOpen(true);
      setSelectedIndex(index);
    },
    [setIsModalOpen, setSelectedIndex],
  );

  const selectedComic = useMemo(
    () => (selectedIndex != null ? comics[selectedIndex] : null),
    [comics, selectedIndex],
  );

  return (
    <>
      <Container>
        <Comics>
          {comics?.map((comic, index) => (
            <ListItem<Comic>
              key={comic.id}
              onClick={() => handleItemClick(index)}
              item={comic}
              displayProp="title"
            />
          ))}
        </Comics>

        {pagination != null && (
          <PaginationBar pagination={pagination} query={query} />
        )}
      </Container>

      <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {selectedComic != null ? (
          <ComicModalContent
            dataProvider={dataProvider}
            comic={selectedComic}
          />
        ) : null}
      </Modal>

      <Loading isLoading={isLoading} />
    </>
  );
}

export default ComicsList;
