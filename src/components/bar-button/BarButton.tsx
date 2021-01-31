import { Link } from 'react-router-dom';
import styled from 'styled-components';

type BarButtonProps = {
  selected?: boolean;
};

const BarButton = styled(Link)<BarButtonProps>`
  border: none;
  cursor: pointer;
  text-decoration: none;
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.primary};
  padding: 8px;
  font-size: 18px;
  transition: background-color 0.2s;
  margin: 0 2px;

  ${(props) => props.selected && `color: ${props.theme.secondary};`}

  &:hover {
    background-color: ${(props) => props.theme.hover};
  }
`;

export default BarButton;
