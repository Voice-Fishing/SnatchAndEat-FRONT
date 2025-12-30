'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/color';
import font from '@/packages/design-system/font';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  ${font.H2}
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  ${({ variant }) =>
    variant === 'primary'
      ? `
    background: ${color.primary};
    color: ${color.white};
    
    &:hover {
      opacity: 0.9;
    }
  `
      : `
    background: transparent;
    color: ${color.white};
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.5);
    }
  `}

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function Button({
  variant = 'primary',
  children,
  onClick,
  type = 'button'
}: ButtonProps) {
  return (
    <StyledButton variant={variant} onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
}
