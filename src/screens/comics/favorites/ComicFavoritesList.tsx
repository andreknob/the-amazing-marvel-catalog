import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Delete as DeleteIcon,
  Sort as SortIcon,
  SortByAlpha as SortByAlphaIcon,
} from '@material-ui/icons';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import ListItem from '../../../components/list/ListItem';
import ComicModalContent from '../ComicModalContent';
import { Favorite } from '../../../types/CommonTypes';
import { Comic } from '../../../types/ComicTypes';
import Button, {
  ButtonContainer,
  ButtonChildLabel,
} from '../../../components/button/Button';

const Container = styled.div`
  width: 70%;
  margin: 32px auto 0 auto;
`;

const Comics = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledButtonContainer = styled(ButtonContainer)`
  margin-right: 8px;
`;

const StyledButtonChildLabel = styled(ButtonChildLabel)`
  margin-right: 8px;
`;

function compareString(a: string, b: string) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

function ComicsFavoritesList() {
  const [comics, setComics] = useState<Favorite<Comic>[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [isSortingByName, setIsSortingByName] = useState(true);
  const [isAscendingSorting, setIsAscendingSorting] = useState(true);

  const location = useLocation();
  const favoritesKey = useRef(`${location.pathname.split('/')[1]}Favorites`);

  useEffect(() => {
    if (!isDataFetched) {
      return;
    }

    setComics((prevComics) => {
      const sorted = [...prevComics].sort((comicA, comicB) => {
        if (isSortingByName) {
          const titleA = comicA.data.title;
          const titleB = comicB.data.title;

          return isAscendingSorting
            ? compareString(titleA, titleB)
            : compareString(titleB, titleA);
        }

        return isAscendingSorting
          ? comicA.timeAdded - comicB.timeAdded
          : comicB.timeAdded - comicA.timeAdded;
      });

      return sorted;
    });
  }, [isSortingByName, isAscendingSorting, setComics, isDataFetched]);

  useEffect(() => {
    const favorites: Favorite<Comic>[] = JSON.parse(
      localStorage.getItem(favoritesKey.current) ?? '[]',
    );

    setComics(favorites);
    setIsDataFetched(true);
  }, [setComics, setIsDataFetched]);

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

  const handleSortByName = useCallback(() => {
    if (isSortingByName) {
      if (isAscendingSorting) {
        setIsAscendingSorting(false);
        return;
      }
    }
    setIsSortingByName(true);
    setIsAscendingSorting(true);
  }, [
    isSortingByName,
    isAscendingSorting,
    setIsSortingByName,
    setIsAscendingSorting,
  ]);

  const handleSortByTime = useCallback(() => {
    if (!isSortingByName) {
      if (isAscendingSorting) {
        setIsAscendingSorting(false);
        return;
      }
    }
    setIsSortingByName(false);
    setIsAscendingSorting(true);
  }, [
    isSortingByName,
    isAscendingSorting,
    setIsSortingByName,
    setIsAscendingSorting,
  ]);

  return (
    <>
      <Container>
        <StyledButtonContainer>
          <Button onClick={handleSortByName} secondaryborder={false}>
            <>
              <SortByAlphaIcon />
              <StyledButtonChildLabel>Order by name</StyledButtonChildLabel>
              {isSortingByName &&
                (isAscendingSorting ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                ))}
            </>
          </Button>
          <Button onClick={handleSortByTime} secondaryborder={false}>
            <>
              <SortIcon />
              <StyledButtonChildLabel>
                Order by date favorited
              </StyledButtonChildLabel>
              {!isSortingByName &&
                (isAscendingSorting ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                ))}
            </>
          </Button>
          <Button onClick={handleUnfavoriteAll} secondaryborder={false}>
            <>
              <DeleteIcon />
              <ButtonChildLabel>Unfavorite all</ButtonChildLabel>
            </>
          </Button>
        </StyledButtonContainer>
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
