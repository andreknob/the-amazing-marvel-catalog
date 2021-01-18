import React from 'react';
import styled from 'styled-components';
import { Character } from '../../types/CharacterTypes';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  letter-spacing: 2px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;

  font-size: 25px;
  line-height: 65px;
  margin-bottom: 15px;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  padding: 16px 24px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  color: white;
  padding: 16px 24px;
  background: rgba(175, 0, 0, 0.6);
`;

const Description = styled.div`
  font-size: 18px;
  line-height: 22px;
  margin-left: 32px;
`;

const Portrait = styled.img`
  width: 425px;
`;

interface Props {
  character: Character;
  dataProvider: string | undefined;
}

const CharacterModalContent: React.FC<Props> = ({
  character,
  dataProvider,
}: Props) => {
  const { name, description, thumbnail } = character;

  return (
    <Container>
      <Header>{name}</Header>
      <Body>
        <Portrait alt={name} src={`${thumbnail.path}.${thumbnail.extension}`} />
        <Description>{description}</Description>
      </Body>
      <Footer>{dataProvider}</Footer>
    </Container>
  );
};

export default CharacterModalContent;
