import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Nav from '../nav/Nav';

const Container = styled.div`
  background-color: #202024;
  height: 20%;
  border-bottom: 2px solid #af0000;
`;

const CenteredContent = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 16px;
  font-size: 22px;
  padding: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled(Link)`
  margin: 0 0 32px 16px;
  padding: 8px 16px;
  border: 2px solid #af0000;
  border-radius: 4px;
  color: white;
  background-color: #202024;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  text-decoration: none;
  transition: all 0.2s linear;

  &:hover {
    background-color: #444;
    border: 2px solid #444;
  }
`;

const Label = styled.span`
  display: block;
  font-size: 32px;
  padding: 72px 0 16px 0;
`;

type Props = {};

const AppBar: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = useCallback(
    ({ target }) => {
      setSearchTerm(target.value);
    },
    [setSearchTerm],
  );

  return (
    <Container>
      <CenteredContent>
        <Label>The Amazing Marvel Catalog Search</Label>
        <Input value={searchTerm} onChange={handleChange} />
        <ButtonContainer>
          <Button to={`/comics?search=${searchTerm}`}>Search Comics</Button>
          <Button to={`/characters?search=${searchTerm}`}>
            Search Characters
          </Button>
        </ButtonContainer>
        <Nav />
      </CenteredContent>
    </Container>
  );
};

export default AppBar;
