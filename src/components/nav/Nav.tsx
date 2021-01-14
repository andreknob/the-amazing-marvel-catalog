import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 10vh;
`;

function Nav(): ReactElement {
  return (
    <nav>
      <StyledUl>
        <Link to="/">
          <li>Home Page</li>
        </Link>
        <Link to="/comics">
          <li>Comics</li>
        </Link>
        <Link to="/characters">
          <li>Characters</li>
        </Link>
      </StyledUl>
    </nav>
  );
}

export default Nav;
