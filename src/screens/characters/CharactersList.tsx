import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import CharactersService, {
  Pagination,
  Result,
} from '../../services/CharactersService';

function CharactersList(): ReactElement {
  const [paginationData, setPaginationData] = useState<Pagination>();
  const [characters, setCharacters] = useState<Result[]>();

  const fetchData = useCallback(async () => {
    const { data } = await CharactersService.get();
    const { results, ...paginData } = data;

    setCharacters(results);
    setPaginationData(paginData);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ul>
      {characters?.map((character) => (
        <li>{character.name}</li>
      ))}
    </ul>
  );
}

export default CharactersList;
