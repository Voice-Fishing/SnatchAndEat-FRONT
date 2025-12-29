"use client";

import color from "@/packages/design-system/color";
import styled from "@emotion/styled";
import font from "@/packages/design-system/font";

const SearchButton = () => {
    return (
        <StyledButton type="button" value="검색하기" />
    )
}

export default SearchButton;

const StyledButton = styled.input`
  
  width: 100%;
  max-width: 192px; 
  height: 43px; 
  
  background-color: ${color.primary};
  color: ${color.white};
  border: none;
  border-radius: 24px;
  cursor: pointer;
  
  
  ${font.H2};
  
  
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 60px; 
  
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;


