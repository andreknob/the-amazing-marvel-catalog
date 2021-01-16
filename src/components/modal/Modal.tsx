import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  isOpen: boolean;
  animateOut: boolean;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  display: table;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  transform: scale(0);
  z-index: 1;

  ${(props) => {
    if (!props.isOpen) {
      return null;
    }

    return `
        transform: scale(1);
        ${
          props.animateOut &&
          `animation: quickScaleDown 0s 0.5s linear forwards;`
        }
    `;
  }}

  @keyframes quickScaleDown {
    0% {
      transform: scale(1);
    }
    99.9% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
`;

interface BackgroundProps {
  isOpen: boolean;
  animateOut: boolean;
}

const Background = styled.div<BackgroundProps>`
  display: table-cell;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  vertical-align: middle;

  ${(props) => {
    if (!props.isOpen) {
      return null;
    }

    return `
        background: rgba(0, 0, 0, 0);
        animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

        ${
          props.animateOut &&
          `animation: fadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;`
        }
    `;
  }}

  @keyframes fadeIn {
    0% {
      background: rgba(0, 0, 0, 0);
    }
    100% {
      background: rgba(0, 0, 0, 0.7);
    }
  }

  @keyframes fadeOut {
    0% {
      background: rgba(0, 0, 0, 0.7);
    }
    100% {
      background: rgba(0, 0, 0, 0);
    }
  }
`;

interface BodyProps {
  isOpen: boolean;
  animateOut: boolean;
}

const Body = styled.div<BodyProps>`
  background: white;
  padding: 50px;
  display: inline-block;
  border-radius: 3px;
  font-weight: 300;
  position: relative;
  z-index: 2;

  h2 {
    font-size: 25px;
    line-height: 25px;
    margin-bottom: 15px;
  }

  p {
    font-size: 18px;
    line-height: 22px;
  }

  ${(props) => {
    if (!props.isOpen) {
      return null;
    }

    return `
        transform: translateX(-1500px);
        animation: roadRunnerIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

        ${
          props.animateOut &&
          `animation: roadRunnerOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; `
        }
    `;
  }}

  @keyframes roadRunnerIn {
    0% {
      transform: translateX(-1500px) skewX(30deg) scaleX(1.3);
    }
    70% {
      transform: translateX(30px) skewX(0deg) scaleX(0.9);
    }
    100% {
      transform: translateX(0px) skewX(0deg) scaleX(1);
    }
  }

  @keyframes roadRunnerOut {
    0% {
      transform: translateX(0px) skewX(0deg) scaleX(1);
    }
    30% {
      transform: translateX(-30px) skewX(-5deg) scaleX(0.9);
    }
    100% {
      transform: translateX(1500px) skewX(30deg) scaleX(1.3);
    }
  }
`;

interface ModalProps {
  isOpen: boolean;
  setIsModalOpen: Function;
}

function Modal({ isOpen, setIsModalOpen }: ModalProps) {
  const [animateOut, setAnimateOut] = useState(false);

  useLayoutEffect(() => {
    if (isOpen && animateOut) {
      setTimeout(() => {
        setIsModalOpen(false);
        setAnimateOut(false);
      }, 300);
    }
  }, [isOpen, setIsModalOpen, animateOut, setAnimateOut]);

  return (
    <Container isOpen={isOpen} animateOut={animateOut}>
      <Background
        onClick={() => setAnimateOut(true)}
        isOpen={isOpen}
        animateOut={animateOut}
      >
        <Body isOpen={isOpen} animateOut={animateOut}>
          <h2>Modal</h2>
          <p>Hear me roar.</p>
        </Body>
      </Background>
    </Container>
  );
}

export default Modal;
