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

import ListItem from '../../components/list/ListItem';
import { Favorite } from '../../types/CommonTypes';
import { Character } from '../../types/CharacterTypes';
import { Comic } from '../../types/ComicTypes';
import Button, {
  ButtonContainer,
  ButtonChildLabel,
} from '../../components/button/Button';
import {
  determineIfIsComic,
  determineIfIsCharacter,
} from '../../types/TypeGuards';

const Container = styled.div`
  width: 70%;
  margin: 32px auto 0 auto;
`;

const Items = styled.div`
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

function compareString(a = '', b = '') {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

type Props<FavoriteArg> = {
  renderModal: (
    selectedItem: FavoriteArg | null,
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void,
  ) => void;
};

function FavoritesList<FavoriteArg extends Comic | Character>({
  renderModal,
}: Props<FavoriteArg>) {
  const [dataArray, setDataArray] = useState<Favorite<FavoriteArg>[]>([]);
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

    setDataArray((prevArray) => {
      const sorted = [...prevArray].sort((objectA, objectB) => {
        if (isSortingByName) {
          let displayDataA;
          let displayDataB;

          if (determineIfIsComic(objectA.data)) {
            displayDataA = objectA.data.title;
          } else if (determineIfIsCharacter(objectA.data)) {
            displayDataA = objectA.data.name;
          }

          if (determineIfIsComic(objectB.data)) {
            displayDataB = objectB.data.title;
          } else if (determineIfIsCharacter(objectB.data)) {
            displayDataB = objectB.data.name;
          }

          return isAscendingSorting
            ? compareString(displayDataA, displayDataB)
            : compareString(displayDataB, displayDataA);
        }

        return isAscendingSorting
          ? objectA.timeAdded - objectB.timeAdded
          : objectB.timeAdded - objectA.timeAdded;
      });

      return sorted;
    });
  }, [isSortingByName, isAscendingSorting, setDataArray, isDataFetched]);

  useEffect(() => {
    const favorites: Favorite<FavoriteArg>[] = JSON.parse(
      localStorage.getItem(favoritesKey.current) ?? '[]',
    );

    setDataArray(favorites);
    setIsDataFetched(true);
  }, [setDataArray, setIsDataFetched]);

  const handleItemClick = useCallback(
    (index) => {
      setIsModalOpen(true);
      setSelectedIndex(index);
    },
    [setIsModalOpen, setSelectedIndex],
  );

  const handleUnfavorite = useCallback(
    (dataItem) => {
      const newDataArray = [...dataArray];
      const index = newDataArray.findIndex((item) => item.id === dataItem.id);

      newDataArray.splice(index, 1);
      setDataArray(newDataArray);
    },
    [dataArray, setDataArray],
  );

  const handleUnfavoriteAll = useCallback(() => {
    localStorage.setItem(favoritesKey.current, JSON.stringify([]));
    setDataArray([]);
  }, [setDataArray]);

  const selectedItem = useMemo(
    () => (selectedIndex != null ? dataArray[selectedIndex].data : null),
    [dataArray, selectedIndex],
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
        <Items>
          {dataArray?.map((item, index) => (
            <ListItem<FavoriteArg>
              key={item.id}
              onClick={() => handleItemClick(index)}
              item={item.data}
              displayProp="title"
              onUnfavorite={handleUnfavorite}
            />
          ))}
        </Items>
      </Container>

      {renderModal(selectedItem, isModalOpen, setIsModalOpen)}
    </>
  );
}

export default FavoritesList;
