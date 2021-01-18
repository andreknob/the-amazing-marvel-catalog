import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Container, Background, Body, CloseButton } from './ModalStyles';

interface ModalProps {
  isOpen: boolean;
  setIsModalOpen: Function;
  children: JSX.Element | null;
}

function Modal({ isOpen, setIsModalOpen, children }: ModalProps) {
  const [animateOut, setAnimateOut] = useState(false);

  useLayoutEffect(() => {
    if (isOpen && animateOut) {
      setTimeout(() => {
        setIsModalOpen(false);
        setAnimateOut(false);
      }, 300);
    }
  }, [isOpen, setIsModalOpen, animateOut, setAnimateOut]);

  const handleClickOut = useCallback(() => setAnimateOut(true), [
    setAnimateOut,
  ]);
  const handleClickBody = useCallback((e) => e.stopPropagation(), []);

  return (
    <Container isOpen={isOpen} animateOut={animateOut}>
      <Background
        onClick={handleClickOut}
        isOpen={isOpen}
        animateOut={animateOut}
      >
        <Body onClick={handleClickBody} isOpen={isOpen} animateOut={animateOut}>
          <>
            {children}
            <CloseButton onClick={handleClickOut}>x</CloseButton>
          </>
        </Body>
      </Background>
    </Container>
  );
}

export default Modal;
