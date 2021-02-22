import React, { ReactText } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

type BarButtonProps = {
  selected?: boolean;
};

const StyledBarButton = styled(Link)<BarButtonProps>`
  border: none;
  cursor: pointer;
  text-decoration: none;
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.primary};
  padding: 0.4rem;
  font-size: 1.8rem;
  transition: background-color 0.2s;
  margin: 0 2px;

  ${(props) => props.selected && `color: ${props.theme.secondary};`}

  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.hover};
  }
`;

const ChildrenContainer = styled.span`
  height: 2.4rem;
  min-width: 2.4rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props extends LinkProps {
  children: JSX.Element | ReactText | string | number;
  selected?: boolean;
}

const BarButton = ({ to, children, selected }: Props) => {
  return (
    <StyledBarButton to={to} selected={selected}>
      <ChildrenContainer>{children}</ChildrenContainer>
    </StyledBarButton>
  );
};

export default BarButton;
