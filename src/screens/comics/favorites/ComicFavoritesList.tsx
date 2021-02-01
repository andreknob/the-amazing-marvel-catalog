import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { useLocation } from 'react-router-dom';
import Modal from '../../../components/modal/Modal';
import ListItem from '../../../components/list/ListItem';
import ComicModalContent from '../ComicModalContent';
import { Favorite } from '../../../types/CommonTypes';
import { Comic } from '../../../types/ComicTypes';
import Button from '../../../components/button/Button';

const Container = styled.div`
  width: 70%;
  margin: 32px auto 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 8px;
`;

const Comics = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function ComicsFavoritesList() {
  const [comics, setComics] = useState<Favorite<Comic>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const location = useLocation();
  const favoritesKey = useRef(`${location.pathname.split('/')[1]}Favorites`);

  useEffect(() => {
    const favorites: Favorite<Comic>[] = JSON.parse(
      localStorage.getItem(favoritesKey.current) ?? '[]',
    );
    setComics(favorites);
  }, [setComics]);

  const handleItemClick = useCallback(
    (index) => {
      setIsModalOpen(true);
      setSelectedIndex(index);
    },
    [setIsModalOpen, setSelectedIndex],
  );

  const handleUnfavorite = useCallback(
    (comic) => {
      const newComics = [...comics];
      const index = newComics.findIndex((item) => item.id === comic.id);

      newComics.splice(index, 1);
      setComics(newComics);
    },
    [comics, setComics],
  );

  const handleUnfavoriteAll = useCallback(() => {
    localStorage.setItem('comicsFavorites', JSON.stringify([]));
    setComics([]);
  }, [setComics]);

  const selectedComic = useMemo(
    () => (selectedIndex != null ? comics[selectedIndex].data : null),
    [comics, selectedIndex],
  );

  return (
    <>
      <Container>
        <ButtonContainer>
          <Button onClick={handleUnfavoriteAll}>Unfavorite all</Button>
        </ButtonContainer>
        <Comics>
          {comics?.map((comic, index) => (
            <ListItem<Comic>
              key={comic.id}
              onClick={() => handleItemClick(index)}
              item={comic.data}
              displayProp="title"
              onUnfavorite={handleUnfavorite}
            />
          ))}
        </Comics>
      </Container>

      <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {selectedComic != null ? (
          <ComicModalContent
            comic={selectedComic}
            dataProvider="Marked as a favorite by the user"
          />
        ) : null}
      </Modal>
    </>
  );
}

export default ComicsFavoritesList;
