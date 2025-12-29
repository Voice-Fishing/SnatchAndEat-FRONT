"use client";

import font from "@/packages/design-system/font";
import color from "@/packages/design-system/color";
import styled from "@emotion/styled";
import Image from "next/image";

const SearchInput = () => {
    return (
        <InputContainer>
            <StyledInput type="text" placeholder="식당을 검색해주세요." />
            <Image
                src="/assets/search-icon.svg"
                alt="search"
                width={16}
                height={16}
            />
        </InputContainer>
    )
}

export default SearchInput;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  width: 100%;
  height: 43px;
  padding: 0 16px;
  background-color: ${color.black};
  border: 1px solid ${color.primary}; 
  border-radius: 24px;
  gap: 12px;
  border-width: 2px;
  flex : 1;
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${color.white};

  ${font.H3};
  &::placeholder {
    color: ${color.secondary};
    opacity: 1; 
  }
`;