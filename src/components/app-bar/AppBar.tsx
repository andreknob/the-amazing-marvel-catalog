import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Nav from '../nav/Nav';
import Button from '../button/Button';

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundPrimary};
  height: 20%;
  border-bottom: 2px solid ${(props) => props.theme.secondary};
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

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.primary};
  text-decoration: none;
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
          <Button>
            <StyledLink to={`/comics?search=${searchTerm}`}>
              Search Comics
            </StyledLink>
          </Button>
          <Button>
            <StyledLink to={`/characters?search=${searchTerm}`}>
              Search Characters
            </StyledLink>
          </Button>
        </ButtonContainer>
        <Nav />
      </CenteredContent>
    </Container>
  );
};

export default AppBar;
