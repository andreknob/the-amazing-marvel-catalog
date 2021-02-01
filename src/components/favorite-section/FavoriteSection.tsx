import React, { useCallback, useRef, useState } from 'react';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@material-ui/icons';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Favorite, GenericModel } from '../../types/CommonTypes';
import { Comic } from '../../types/ComicTypes';
import { Character } from '../../types/CharacterTypes';

type HoveringProps = {
  isHovering: boolean;
};

const Container = styled.div<HoveringProps>`
  position: absolute;
  top: 90%;
  bottom: 0;

  background: rgb(0, 0, 0, 0.3);
  padding: 8px;
  color: ${(props) => props.theme.primary};
  width: 100%;

  transition: background 0.3s;

  display: ${(props) => (props.isHovering ? 'flex' : 'none')};
  flex-direction: row-reverse;
  align-items: center;
  z-index: 100;
`;

const Span = styled.span`
  margin-left: 8px;
`;

type Props<T> = {
  item: T;
  isHovering: boolean;
};

function FavoriteSection<T extends GenericModel>({
  item,
  isHovering,
}: Props<T>) {
  const location = useLocation();

  const rootPath = useRef(location.pathname.split('/')[1]);
  const favoritesKey = useRef(`${rootPath.current}Favorites`);

  const [isFavorite, setIsFavorite] = useState(
    !!JSON.parse(localStorage.getItem(favoritesKey.current) ?? '[]').find(
      ({ id }: Favorite<Comic | Character>) => item.id === id,
    ),
  );

  const handleFavorite = useCallback(
    (e) => {
      e.stopPropagation();
      const favorites: Favorite<Comic | Character>[] = JSON.parse(
        localStorage.getItem(favoritesKey.current) ?? '[]',
      );

      let newFavorited;
      const favoriteIndex = favorites.findIndex((fav) => fav.id === item.id);

      if (favoriteIndex >= 0) {
        newFavorited = [...favorites];
        newFavorited.splice(favoriteIndex, 1);
        setIsFavorite(false);
      } else {
        newFavorited = [
          ...favorites,
          { id: item.id, data: item, timeAdded: new Date().getTime() },
        ];
        setIsFavorite(true);
      }

      localStorage.setItem(favoritesKey.current, JSON.stringify(newFavorited));
    },
    [setIsFavorite, item],
  );

  return (
    <Container isHovering={isHovering} onClick={handleFavorite}>
      {isFavorite ? (
        <>
          <Span>Unfavorite this</Span>
          <FavoriteIcon />
        </>
      ) : (
        <>
          <Span>Favorite this</Span>
          <FavoriteBorderIcon />
        </>
      )}
    </Container>
  );
}

export default FavoriteSection;
