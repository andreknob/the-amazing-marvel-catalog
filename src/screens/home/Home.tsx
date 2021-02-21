import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Label = styled.span`
  display: block;
  font-size: 3.2rem;
  padding: 48px 0 0 48px;
`;

function Home(): ReactElement {
  return <Label>Search a comic or character above...</Label>;
}

export default Home;
