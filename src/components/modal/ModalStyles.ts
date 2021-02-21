import styled from 'styled-components';

const fadeIn = `
  @keyframes fadeIn {
    0% {
      background: rgba(0, 0, 0, 0);
    }
    100% {
      background: rgba(0, 0, 0, 0.7);
    }
  }
`;

const fadeOut = `
  @keyframes fadeOut {
    0% {
      background: rgba(0, 0, 0, 0.7);
    }
    100% {
      background: rgba(0, 0, 0, 0);
    }
  }
`;

const roadRunnerIn = `
  @keyframes roadRunnerIn {
    0% {
      transform: translateX(-1500px);
      opacity: 0;
    }
    70% {
      transform: translateX(30px);
      opacity: 1;
    }
    100% {
      transform: translateX(0px);
    }
  }
`;

const roadRunnerOut = `
  @keyframes roadRunnerOut {
    0% {
      transform: translateX(0px);
    }
    30% {
      transform: translateX(-30px);
      opacity: 1;
    }
    100% {
      transform: translateX(1500px);
      opacity: 0;
    }
  }
`;

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

    return 'transform: scale(1);';
  }}
`;

interface BackgroundProps {
  isOpen: boolean;
  animateOut: boolean;
}

const Background = styled.div<BackgroundProps>`
  display: table-cell;
  vertical-align: middle;
  backdrop-filter: blur(0px);

  ${(props) => {
    if (!props.isOpen) {
      return null;
    }

    return `
        animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        backdrop-filter: blur(45px);

        ${
          props.animateOut &&
          `animation: fadeOut 0.5s ease-in forwards;
          backdrop-filter: blur(0px);
          `
        }
    `;
  }}

  ${fadeIn}

  ${fadeOut}
`;

interface BodyProps {
  isOpen: boolean;
  animateOut: boolean;
}

const Body = styled.div<BodyProps>`
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.primary};
  margin: 0 auto;
  width: 50%;
  border-radius: 3px;
  font-weight: 300;
  position: relative;

  ${(props) => {
    if (!props.isOpen) {
      return null;
    }

    return `
          transform: translateX(-1500px);
          animation: roadRunnerIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  
          ${
            props.animateOut &&
            `animation: roadRunnerOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; `
          }
      `;
  }}

  ${roadRunnerIn}

  ${roadRunnerOut}
`;

const CloseButton = styled.div`
  position: absolute;
  top: 2px;
  right: 8px;
  color: ${(props) => props.theme.primary};
  font-size: 2.4rem;
  cursor: pointer;
`;

export { Container, Background, Body, CloseButton };
