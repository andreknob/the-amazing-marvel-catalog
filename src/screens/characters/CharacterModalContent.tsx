import React, {
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Character } from '../../types/CharacterTypes';
import useWindowResizeEventListener from '../../hooks/useWindowResizeEventListener';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 3px;

  &:before {
    content: 'character';
    position: absolute;
    top: 20px;
    padding: 8px 48px 8px 40px;
    color: ${(props) => props.theme.primary};
    background: rgba(175, 0, 0, 0.9);
    transform: translateX(-30px) rotate(-35deg);
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

const Anchor = styled.a`
  color: ${(props) => props.theme.primary};
`;

type InfoProps = {
  character: Character;
};

const Info: React.FC<InfoProps> = ({ character }: InfoProps) => {
  const { name, description, series, stories } = character;
  const informations = `
    ${name} appears in ${series.available} series and ${stories.available} stories.  
  `;

  return (
    <>
      {description != null && description.length > 0 && <br />}
      {informations}
    </>
  );
};

type WikiLinkProps = {
  character: Character;
};

const WikiLink: React.FC<WikiLinkProps> = ({ character }: WikiLinkProps) => {
  const { name, urls } = character;

  const link = urls.find((item) => item.type === 'wiki');

  return (
    <>
      Click <Anchor href={link?.url}>here</Anchor> to check {`${name}'s`} wiki
      page.
    </>
  );
};

interface Props {
  character: Character;
  dataProvider: string | undefined;
}

const CharacterModalContent: React.FC<Props> = ({
  character,
  dataProvider,
}: Props) => {
  const { name, description, thumbnail } = character;
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
      <Header>{name}</Header>
      <Body bodyMaxHeight={bodyMaxHeight}>
        <Portrait alt={name} src={`${thumbnail.path}.${thumbnail.extension}`} />
        <Description>
          {description}
          <Info character={character} />
          <WikiLink character={character} />
        </Description>
      </Body>
      <Footer>{dataProvider}</Footer>
    </Container>
  );
};

export default CharacterModalContent;
