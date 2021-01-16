import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/modal/Modal';
// import usePagination from '../../hooks/usePagination';
import CharactersService, {
  Pagination,
  Result,
} from '../../services/CharactersService';

const Container = styled.div`
  width: 70%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Item = styled.div`
  border: 1px solid black;
  margin: 0 8px 16px 8px;
  flex: 0 1 250px;
`;

interface Props {
  name: number;
}

const CharactersList: React.FC<Props> = () => {
  const [pagination, setPagination] = useState<Pagination>();
  const [characters, setCharacters] = useState<Result[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // usePagination(pagination);

  const fetchData = useCallback(async () => {
    const { data } = await CharactersService.get();
    const { results, ...paginationData } = data;

    setCharacters(results);
    setPagination(paginationData);
  }, [setCharacters, setPagination]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleItemClick = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  return (
    <Container>
      {characters?.map((character) => (
        <Item onClick={handleItemClick}>{character.name}</Item>
      ))}
      <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Container>
  );
};

export default CharactersList;
