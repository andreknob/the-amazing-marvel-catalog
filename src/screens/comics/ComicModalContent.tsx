import React, {
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import { Comic } from '../../types/ComicTypes';
import useWindowResizeEventListener from '../../hooks/useWindowResizeEventListener';

const Container = styled.div`
  position: relative;
  border-radius: 3px;
  overflow: hidden;

  &:before {
    content: 'comic';
    position: absolute;
    top: 20px;
    padding: 8px 72px 8px 64px;
    color: ${(props) => props.theme.primary};
    background: rgba(175, 0, 0, 0.9);
    transform: translateX(-40px) rotate(-40deg);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;

  color: ${(props) => props.theme.primary};
  font-size: 3rem;
  font-weight: bold;
  line-height: 65px;
  margin-bottom: 15px;
  border-bottom: 2px solid ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

type BodyProps = {
  bodyMaxHeight: number;
};

const Body = styled.div<BodyProps>`
  padding: 16px 24px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: ${(props) => props.bodyMaxHeight}px;
  overflow-y: auto;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  color: ${(props) => props.theme.primary};
  padding: 16px 24px;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const Description = styled.div`
  font-size: 2rem;
  line-height: 2.4rem;
  margin-left: 3.2rem;
  background-color: ${(props) => props.theme.backgroundPrimary};
  padding: 1.6rem;
  border-radius: 3px;
  max-height: 655px;
  overflow-y: auto;

  flex: 1 1 250px;

  @media (max-width: 599px) {
    margin-top: 1.6rem;
  }
`;

const Portrait = styled.img`
  width: 50%;
  border-radius: 3px;

  object-fit: cover;

  @media (max-width: 599px) {
    width: 75%;
  }
`;

const Li = styled.li`
  list-style: initial;
  margin-left: 32px;
`;

const Anchor = styled.a`
  color: ${(props) => props.theme.primary};
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
  dataProvider?: string | undefined;
}

const ComicModalContent: React.FC<Props> = ({ comic, dataProvider }: Props) => {
  const { title, description, thumbnail } = comic;
  const [height, setHeight] = useState(0);

  const headerRef: RefObject<HTMLDivElement> = useRef(null);
  const footerRef: RefObject<HTMLDivElement> = useRef(null);

  const handleWindowResize = useCallback(
    (innerWidth, innerHeight: number) => {
      setHeight(innerHeight);
    },
    [setHeight],
  );

  useWindowResizeEventListener(handleWindowResize);

  const bodyMaxHeight = useMemo(() => {
    const headerHeight = headerRef.current?.clientHeight ?? 0;
    const footerHeight = footerRef.current?.clientHeight ?? 0;

    return height - headerHeight - footerHeight - 16;
  }, [height]);

  return (
    <Container>
      <Header ref={headerRef}>{title}</Header>
      <Body bodyMaxHeight={bodyMaxHeight}>
        <Portrait
          alt={title}
          src={`${thumbnail.path}.${thumbnail.extension}`}
        />
        <Description>
          <div>{ReactHtmlParser(description)}</div>
          <Info comic={comic} />
          <DetailLink comic={comic} />
        </Description>
      </Body>
      <Footer ref={footerRef}>{dataProvider}</Footer>
    </Container>
  );
};

export default ComicModalContent;
