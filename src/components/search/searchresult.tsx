
import font from "@/packages/design-system/font";
import color from "@/packages/design-system/color";
import styled from "@emotion/styled";
import Image from "next/image";
import { useSearchStore } from "@/store/useSearchStroe";

export interface SearchResultItemType {
    address: string;
    description: string;
    latitude: number;
    longitude: number;
    name: string;
    phoneNumber: string;
}

interface SearchResultProps {
    data: SearchResultItemType[];
    isopen: boolean,
    setisopen: (isopen: boolean) => void
}

const SearchResult = ({ data, isopen, setisopen }: SearchResultProps) => {
    const { setSearchKeyword } = useSearchStore();
    const resetKeyword = () => {
        setSearchKeyword("");
        setisopen(!isopen)
    }

    return (
        <SearchResultContainer>
            <CloseResult>
                <Image src="/assets/close.svg" alt="닫기" width={20} height={20} onClick={() => { resetKeyword() }} />
            </CloseResult>
            <SearchResultList>
                {data.map((item, index) => (
                    <SearchResultItem key={index}>
                        <InfoSection>
                            <RestaurantName>{item.name}</RestaurantName>
                            <MetaRow>
                                <RestaurantCategory>{item.description}</RestaurantCategory>
                                <RestaurantAddress>{item.address}</RestaurantAddress>
                            </MetaRow>
                        </InfoSection>
                        <MarkerIndex>
                            <MarkerText>{String.fromCharCode(65 + index)}</MarkerText>
                        </MarkerIndex>
                    </SearchResultItem>
                ))}
            </SearchResultList>
        </SearchResultContainer>
    );
};

export default SearchResult;

const SearchResultContainer = styled.div`
    margin-top:24px;
    width: 100%;
    max-width: 30vw;
    height: 50vh ;
    overflow : scroll;
    background-color: ${color.black};
    border: 2px solid ${color.primary};
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const SearchResultList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    width: 100%;
    height: 100%;


`;

const SearchResultItem = styled.li`
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${color.primary};
    
    &:last-of-type {
        border-bottom: none;
    }
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const RestaurantName = styled.h2`
    ${font.H2};
    color: ${color.white};
    margin: 0;
`;

const MetaRow = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
`;

const RestaurantCategory = styled.span`
    ${font.H4};
    color: ${color.white};
`;

const RestaurantAddress = styled.span`
    ${font.H4};
    color: ${color.primary};
`;

const MarkerIndex = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${color.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

const MarkerText = styled.span`
    font-size: 12px;
    font-weight: 700;
    color: ${color.white};
`;

const CloseResult = styled.div`
    width : 100%;
    background-color: rgba(0,0,0,0.5);
    height : 30px;
    z-index : 100;
    display : flex;
    justify-content : end;
    align-items : center;
    padding : 12px;
    
`
