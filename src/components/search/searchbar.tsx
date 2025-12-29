'use client';

import SearchButton from "./searchbarbutton"
import SearchInput from "./searchinput"
import styled from "@emotion/styled";

const SearchBar = () => {
    return (
        <SearchBarContainer>
            <SearchInput />
            <SearchButton />
        </SearchBarContainer>
    )
}

export default SearchBar;

const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    width : 30vw;
    gap : 24px;

`;