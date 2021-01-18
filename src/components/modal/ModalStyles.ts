import styled from 'styled-components';

const quickScaleDown = `
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
      transform: translateX(-1500px) skewX(30deg) scaleX(1.3);
    }
    70% {
      transform: translateX(30px) skewX(0deg) scaleX(0.9);
    }
    100% {
      transform: translateX(0px) skewX(0deg) scaleX(1);
    }
  }
`;

const roadRunnerOut = `
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

  ${quickScaleDown}
`;

interface BackgroundProps {
  isOpen: boolean;
  animateOut: boolean;
}

const Background = styled.div<BackgroundProps>`
  display: table-cell;
  vertical-align: middle;
  background: rgba(0, 0, 0, 0.8);

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

  ${fadeIn}

  ${fadeOut}
`;

interface BodyProps {
  isOpen: boolean;
  animateOut: boolean;
}

const Body = styled.div<BodyProps>`
  background: white;
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
          animation: roadRunnerIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  
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
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

export { Container, Background, Body, CloseButton };
