import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 4px;
  color: white;
  padding: 8px;
  border-bottom: 2px solid #af0000;

  transition: all 0.2s linear;

  position: relative;
  top: 2px;

  &:hover {
    color: #af0000;
    border-bottom: 2px solid #202024;
  }
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
