'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/color';
import font from '@/packages/design-system/font';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${color.black};
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${color.black};
  border: 2px solid ${color.primary};
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ModalTitle = styled.h2`
  ${font.H1}
  color: ${color.white};
  margin-bottom: 16px;
`;

const ModalMessage = styled.p`
  ${font.H3}
  color: ${color.primary};
  margin-bottom: 24px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${color.white};
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
  display: block;
  ${font.H3}
  
  &:hover {
    color: ${color.primary};
  }
`;

export default function Modal({ isOpen, onClose, title, message }: ModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}
