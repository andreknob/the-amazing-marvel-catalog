import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import Loading from '../../components/loading-spinner/LoadingSpinner';
import Modal from '../../components/modal/Modal';
import PaginationBar from '../../components/pagination-bar/PaginationBar';
import CharactersService from '../../services/CharactersService';
import { Character } from '../../types/CharacterTypes';
import { Pagination } from '../../types/CommonTypes';
import CharacterModalContent from './CharacterModalContent';
import useQuery from '../../hooks/useQuery';
import ListItem from '../../components/list/ListItem';

const PAGE_LIMIT = 20;

const Container = styled.div`
  width: 70%;
  margin: 32px auto 0 auto;
`;

const Characters = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function CharactersList({ location }: RouteComponentProps) {
  const [pagination, setPagination] = useState<Pagination>();
  const [dataProvider, setDataProvider] = useState<string>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const query = useQuery(location.search);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const searchTerm = query.get('search');
    const page = query.get('page') ?? 1;

    const offset = (Number(page) - 1) * PAGE_LIMIT;
    const { data, attributionText } = await CharactersService.get(
      offset,
      searchTerm,
    );
    const { results, ...paginationData } = data;

    setCharacters(results);
    setDataProvider(attributionText);
    setPagination(paginationData);
    setIsLoading(false);
  }, [setCharacters, setDataProvider, setPagination, query]);

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

  const selectedCharacter = useMemo(
    () => (selectedIndex != null ? characters[selectedIndex] : null),
    [characters, selectedIndex],
  );

  return (
    <>
      <Container>
        <Characters>
          {characters?.map((character, index) => (
            <ListItem<Character>
              key={character.id}
              onClick={() => handleItemClick(index)}
              item={character}
              displayProp="name"
            />
          ))}
        </Characters>

        {pagination != null && (
          <PaginationBar pagination={pagination} query={query} />
        )}
      </Container>

      <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {selectedCharacter != null ? (
          <CharacterModalContent
            dataProvider={dataProvider}
            character={selectedCharacter}
          />
        ) : null}
      </Modal>

      <Loading isLoading={isLoading} />
    </>
  );
}

export default CharactersList;
