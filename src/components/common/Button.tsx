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
  width: 100%;
  padding: 16px 32px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  ${({ variant }) =>
    variant === 'primary'
      ? `
    background: ${color.primary};
    color: ${color.white};
    
    &:hover {
      background: ${color.secondary};
      transform: translateY(-2px);
      box-shadow: 0 8px 16px ${color.black};
    }
  `
      : `
    background: transparent;
    color: ${color.white};
    border: 1px solid ${color.white};
    padding: 12px 48px;
    width: auto;
    min-width: 160px;
    margin: 0 auto;
    display: block;
    
    &:hover {
      background: ${color.white};
      color: ${color.black};
    }
  `}

  &:active {
    transform: translateY(0);
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
