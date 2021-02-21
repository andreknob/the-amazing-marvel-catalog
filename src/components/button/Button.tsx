import React from 'react';
import styled from 'styled-components';

type StyledButtonProps = {
  secondaryborder: boolean;
  usePadding: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  margin: 0 0 32px 16px;
  padding: 0;
  padding: ${(props) => (props.usePadding ? '8px 16px' : '0')};
  border: 2px solid
    ${(props) =>
      props.secondaryborder
        ? props.theme.backgroundSecondary
        : props.theme.backgroundPrimary};
  border-radius: 4px;
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.backgroundPrimary};
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-decoration: none;
  transition: all 0.2s linear;

  &:hover {
    background-color: ${(props) => props.theme.hover};
    border: 2px solid ${(props) => props.theme.hover};
  }
`;

export const ButtonChildrenContainer = styled.span`
  display: flex;
  align-items: center;
`;

type Props = {
  onClick?: () => void;
  secondaryborder?: boolean;
  children: JSX.Element | string;
  usePadding?: boolean;
};

function Button({
  onClick,
  secondaryborder = true,
  children,
  usePadding = true,
}: Props) {
  return (
    <StyledButton
      onClick={onClick}
      secondaryborder={secondaryborder}
      usePadding={usePadding}
    >
      <ButtonChildrenContainer>{children}</ButtonChildrenContainer>
    </StyledButton>
  );
}

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonChildLabel = styled.span`
  margin-left: 8px;
`;

export default Button;
