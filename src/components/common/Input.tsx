'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/color';
import font from '@/packages/design-system/font';

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  name?: string;
}

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 0;
`;

const StyledInput = styled.input<{ error?: boolean }>`
  ${font.H2}
  font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  width: 100%;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ error }) => (error ? color.secondary : color.primary)};
  color: ${color.white};
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${color.secondary};
    font-family: 'JR';
  }

  &:focus {
    border-bottom-color: ${({ error }) => (error ? color.secondary : color.white)};
  }
`;

export default function Input({
  placeholder,
  type = 'text',
  value,
  onChange,
  error = false,
  name
}: InputProps) {
  return (
    <InputWrapper>
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        name={name}
      />
    </InputWrapper>
  );
}
