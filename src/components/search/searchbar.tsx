'use client';

import SearchButton from "./searchbarbutton"
import SearchInput from "./searchinput"
import styled from "@emotion/styled";

type SearchBarProps = {
    isopen: boolean;
    setisopen: (isopen: boolean) => void;
}

const SearchBar = ({ isopen, setisopen }: SearchBarProps) => {
    return (
        <SearchBarContainer>
            <SearchInput />
            <SearchButton onClick={() => setisopen(!isopen)} />
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