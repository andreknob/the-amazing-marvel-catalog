import React from 'react';
import styled from 'styled-components';
import { Comic } from '../../types/ComicTypes';

const Container = styled.div`
  position: relative;
  border-radius: 3px;
  overflow: hidden;

  &:before {
    content: 'comic';
    position: absolute;
    top: 20px;
    padding: 8px 72px 8px 64px;
    color: white;
    background: rgba(175, 0, 0, 0.9);
    transform: translateX(-40px) rotate(-40deg);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;

  color: white;
  font-size: 30px;
  font-weight: bold;
  line-height: 65px;
  margin-bottom: 15px;
  border-bottom: 2px solid #af0000;
  background-color: #202024;
`;

const Body = styled.div`
  display: flex;
  padding: 16px 24px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  color: white;
  padding: 16px 24px;
  background-color: #202024;
`;

const Description = styled.div`
  font-size: 20px;
  line-height: 24px;
  margin-left: 32px;
  background-color: #202024;
  padding: 16px;
  border-radius: 3px;
  max-height: 655px;
  overflow-y: auto;
`;

const Portrait = styled.img`
  width: 425px;
  border-radius: 3px;
`;

const Li = styled.li`
  list-style: initial;
  margin-left: 32px;
`;

const Anchor = styled.a`
  color: white;
`;

type InfoProps = {
  comic: Comic;
};

const Info: React.FC<InfoProps> = ({ comic }: InfoProps) => {
  const { title, description, series, creators } = comic;

  const informations = `
    ${title} is a part of the ${series.name} series.  
  `;

  return (
    <>
      {description != null && description.length > 0 && <br />}
      {informations}
      <br />
      {creators.items?.length > 0 && (
        <>
          <br />
          <h1>Creators:</h1>
          <br />
          <ul>
            {creators.items.map((item) => (
              <Li key={item.name}>
                {item.name}, {item.role}
              </Li>
            ))}
          </ul>
        </>
      )}
      <br />
    </>
  );
};

type DetailLinkProps = {
  comic: Comic;
};

function DetailLink({ comic }: DetailLinkProps) {
  const { title, urls } = comic;

  const link = urls.find((item) => item.type === 'detail');

  return (
    <>
      Click <Anchor href={link?.url}>here</Anchor> to check more about {title}.
    </>
  );
}

interface Props {
  comic: Comic;
  dataProvider: string | undefined;
}

const ComicModalContent: React.FC<Props> = ({ comic, dataProvider }: Props) => {
  const { title, description, thumbnail } = comic;

  return (
    <Container>
      <Header>{title}</Header>
      <Body>
        <Portrait
          alt={title}
          src={`${thumbnail.path}.${thumbnail.extension}`}
        />
        <Description>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: description }} />
          <Info comic={comic} />
          <DetailLink comic={comic} />
        </Description>
      </Body>
      <Footer>{dataProvider}</Footer>
    </Container>
  );
};

export default ComicModalContent;
