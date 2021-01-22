import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 10vh;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 4px;
  color: white;
`;

function Nav(): ReactElement {
  return (
    <nav>
      <Ul>
        <StyledLink to="/comics">
          <li>Comics</li>
        </StyledLink>
        <StyledLink to="/characters">
          <li>Characters</li>
        </StyledLink>
      </Ul>
    </nav>
  );
}

export default Nav;
