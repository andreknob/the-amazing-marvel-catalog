import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/modal/Modal';
// import usePagination from '../../hooks/usePagination';
import CharactersService from '../../services/CharactersService';
import { Pagination, Character } from '../../types/CharacterTypes';
import CharacterItem from './CharacterItem';
import CharacterModalContent from './CharacterModalContent';

const Container = styled.div`
  width: 70%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

interface Props {
  name: number;
}

const CharactersList: React.FC<Props> = () => {
  const [pagination, setPagination] = useState<Pagination>();
  const [dataProvider, setDataProvider] = useState<string>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  // usePagination(pagination);

  const fetchData = useCallback(async () => {
    const { data, attributionText } = await CharactersService.get();
    const { results, ...paginationData } = data;

    setCharacters(results);
    setDataProvider(attributionText);
    setPagination(paginationData);
  }, [setCharacters, setDataProvider, setPagination]);

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
    <Container>
      {characters?.map((character, index) => (
        <CharacterItem
          key={character.id}
          onClick={() => handleItemClick(index)}
          character={character}
        />
      ))}
      <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {selectedCharacter != null ? (
          <CharacterModalContent
            dataProvider={dataProvider}
            character={selectedCharacter}
          />
        ) : null}
      </Modal>
    </Container>
  );
};

export default CharactersList;
