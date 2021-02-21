import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

type LinkProps = {
  isActive: boolean;
};

const StyledLink = styled(Link)<LinkProps>`
  text-decoration: none;
  font-size: 2.2rem;
  font-weight: bold;
  letter-spacing: 0.4rem;
  color: ${(props) =>
    props.isActive ? props.theme.secondary : props.theme.primary};
  padding: 0.8rem;
  border-bottom: 2px solid
    ${(props) =>
      props.isActive ? props.theme.backgroundPrimary : props.theme.secondary};

  transition: all 0.2s linear;

  position: relative;
  top: 2px;

  &:hover {
    color: ${(props) => props.theme.secondary};
    border-bottom: 2px solid ${(props) => props.theme.backgroundPrimary};
  }
`;

function Nav(): ReactElement {
  const location = useLocation();

  return (
    <nav>
      <Ul>
        <StyledLink to="/comics" isActive={location.pathname === '/comics'}>
          <li>Comics</li>
        </StyledLink>
        <StyledLink
          to="/characters"
          isActive={location.pathname === '/characters'}
        >
          <li>Characters</li>
        </StyledLink>
      </Ul>
    </nav>
  );
}

export default Nav;
