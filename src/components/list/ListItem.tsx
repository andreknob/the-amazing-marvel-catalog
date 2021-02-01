import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { GenericModel } from '../../types/CommonTypes';
import FavoriteSection from '../favorite-section/FavoriteSection';

const ItemContainer = styled.div`
  position: relative;

  border: 1px solid black;
  border-radius: 3px;
  margin: 0 8px 16px 8px;
  flex: 0 1 400px;
  height: 450px;
  overflow: hidden;
  cursor: pointer;
`;

const Portrait = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

type HoveringProps = {
  isHovering: boolean;
};

const CardInfo = styled.div<HoveringProps>`
  position: absolute;
  top: ${(props) => (props.isHovering ? '0' : '90%')};
  bottom: 0;

  background: rgba(0, 0, 0, ${(props) => (props.isHovering ? '0.7' : '0.4')});
  backdrop-filter: blur(45px);
  padding: 8px;
  color: ${(props) => props.theme.primary};
  width: 100%;

  transition: top 0.2s ease-out, background 0.3s;

  display: flex;
  flex-direction: column;
`;

type SpanProps = {
  isHovering: boolean;
};

const Span = styled.span<SpanProps>`
  padding: 8px;
  white-space: ${(props) => (props.isHovering ? 'initial' : 'nowrap')};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ShowDetails = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

enum DisplayPropEnum {
  title,
  name,
}

type Props<T> = {
  item: T;
  onClick: () => void;
  displayProp: keyof typeof DisplayPropEnum;
};

function ListItem<T extends GenericModel>({
  item,
  displayProp,
  onClick,
}: Props<T>) {
  const [isHovering, setIsHovering] = useState(false);
  const { thumbnail } = item;

  const handleMouseEnter = useCallback(() => setIsHovering(true), [
    setIsHovering,
  ]);
  const handleMouseLeave = useCallback(() => setIsHovering(false), [
    setIsHovering,
  ]);

  return (
    <ItemContainer
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Portrait
        alt={item[displayProp]}
        src={`${thumbnail.path}.${thumbnail.extension}`}
      />
      <CardInfo isHovering={isHovering}>
        <>
          <Span isHovering={isHovering}>{item[displayProp]}</Span>
          {isHovering && <ShowDetails>Click to see details</ShowDetails>}
        </>
      </CardInfo>
      <FavoriteSection item={item} isHovering={isHovering} />
    </ItemContainer>
  );
}

export default ListItem;
