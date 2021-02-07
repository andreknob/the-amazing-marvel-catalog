import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import BarButton from '../bar-button/BarButton';
import { ALPHABET } from './constants';

const Container = styled.div`
  width: fit-content;
  margin: 48px auto;
`;

type Props = {
  query: URLSearchParams;
};

const LetterFilterBar = ({ query }: Props) => {
  const currentLetter = useMemo(() => query.get('search'), [query]);
  const location = useLocation();

  return (
    <Container>
      {ALPHABET.map((letter) => {
        return (
          <BarButton
            key={letter}
            to={`${location.pathname}?search=${letter}`}
            selected={letter === currentLetter}
          >
            {letter}
          </BarButton>
        );
      })}
    </Container>
  );
};

export default LetterFilterBar;
