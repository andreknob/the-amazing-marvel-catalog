import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin: 0 0 32px 16px;
  padding: 8px 16px;
  border: 2px solid ${(props) => props.theme.secondary};
  border-radius: 4px;
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.backgroundPrimary};
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  text-decoration: none;
  transition: all 0.2s linear;

  &:hover {
    background-color: ${(props) => props.theme.hover};
    border: 2px solid ${(props) => props.theme.hover};
  }
`;

type Props = {
  onClick?: () => void;
  children: JSX.Element | string;
};

function Button({ onClick, children }: Props) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
