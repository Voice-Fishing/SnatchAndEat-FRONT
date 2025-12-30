"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import color from "@/packages/design-system/color";
import font from "@/packages/design-system/font";


const Dict = () => {

    const GetFish = async () => {


        try {

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}fish`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                    }
                }
            )

            console.log("API 응답 성공:", response.data);
            const responseData = response.data;
            setFishData(responseData);

        } catch (error) {
            console.error("API 호출 중 에러 발생:", error);
        }
    }

    const GetUserFish = async () => {


        try {

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}catch-records`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                    }
                }
            )

            console.log("API 응답 성공:", response.data);
            const responseData = response.data;
            setUserFishData(responseData);

        } catch (error) {
            console.error("API 호출 중 에러 발생:", error);
        }
    }
    const [userFishData, setUserFishData] = useState([]);
    const [fishData, setFishData] = useState([{
        id: 1,
        name: "",
        seaAreaName: "",
        imageUrl: "",
        features: []
    },
    {
        id: 2,
        name: "",
        seaAreaName: "",
        imageUrl: "",
        features: []
    },
    {
        id: 3,
        name: "",
        seaAreaName: "",
        imageUrl: "",
        features: []
    },
    {
        id: 4,
        name: "",
        seaAreaName: "",
        imageUrl: "",
        features: []
    },
    {
        id: 5,
        name: "",
        seaAreaName: "",
        imageUrl: "",
        features: []
    },
    {
        id: 6,
        name: "",
        seaAreaName: "",
        imageUrl: "",
        features: []
    },
    ]);

    useEffect(() => {
        GetFish();
        GetUserFish();
        console.log(userFishData);
    }, []);


    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFish, setSelectedFish] = useState<any>(null);

    const filteredFish = fishData.filter(fish =>
        fish.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Background>
            <HeaderPlaceholder />

            <TopSection>
                <SearchBarContainer>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0080FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}>
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <SearchInput
                        placeholder="search for fish name"
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                </SearchBarContainer>

                <FilterButton>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    도감 필터
                </FilterButton>
            </TopSection>

            <ContentBox>
                <FishList>
                    {filteredFish.map((fish) => (
                        <FishCard key={fish.id} onClick={() => setSelectedFish(fish)}>
                            <ImageFrame>
                                <img src={fish.imageUrl} alt={fish.name} />
                            </ImageFrame>
                            <FishInfo>
                                <InfoRow>
                                    <InfoLabel>이름:</InfoLabel>
                                    <InfoValue>{fish.name}</InfoValue>
                                </InfoRow>
                                <InfoRow>
                                    <InfoLabel>서식지:</InfoLabel>
                                    <InfoValue>{fish.seaAreaName}</InfoValue>
                                </InfoRow>
                                <Divider />
                            </FishInfo>
                        </FishCard>
                    ))}
                </FishList>
            </ContentBox>

            {selectedFish && (
                <ModalOverlay onClick={() => setSelectedFish(null)}>
                    <ModalBox onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        <CloseButton onClick={() => setSelectedFish(null)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </CloseButton>
                        <ModalTop>
                            <ModalImageFrame>
                                <img src={selectedFish.imageUrl} alt={selectedFish.name} />
                            </ModalImageFrame>
                            <ModalFishInfo>
                                <ModalInfoRow>
                                    <ModalInfoLabel>이름:</ModalInfoLabel>
                                    <ModalInfoValue>{selectedFish.name}</ModalInfoValue>
                                </ModalInfoRow>
                                <ModalInfoRow>
                                    <ModalInfoLabel>서식지:</ModalInfoLabel>
                                    <ModalInfoValue>{selectedFish.seaAreaName}</ModalInfoValue>
                                </ModalInfoRow>
                                <ModalDivider />
                            </ModalFishInfo>
                        </ModalTop>
                        <ModalFeatures>
                            {selectedFish.features && selectedFish.features.length > 0 ? (
                                <>
                                    <FeatureTitle>특징: {selectedFish.features[0]}</FeatureTitle>
                                    <FeatureList>
                                        {selectedFish.features.slice(1).map((feature: string, idx: number) => (
                                            <FeatureItem key={idx}>• {feature}</FeatureItem>
                                        ))}
                                    </FeatureList>
                                </>
                            ) : (
                                <FeatureTitle>특징 정보가 없습니다.</FeatureTitle>
                            )}
                        </ModalFeatures>
                    </ModalBox>
                </ModalOverlay>
            )}
        </Background>
    );
};

export default Dict;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalBox = styled.div`
    width: 800px;
    background: #151515;
    border: 2px solid ${color.primary};
    border-radius: 24px;
    padding: 40px;
    position: relative;
    box-shadow: 0 0 30px rgba(0, 128, 255, 0.2);
`;

export const CloseButton = styled.div`
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
    &:hover {
        opacity: 1;
    }
`;

export const ModalTop = styled.div`
    display: flex;
    gap: 40px;
    align-items: flex-start;
    margin-bottom: 32px;
`;

export const ModalImageFrame = styled.div`
    width: 260px;
    height: 180px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain; 
    }
`;

export const ModalFishInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 10px;
`;

export const ModalInfoRow = styled.div`
    display: flex;
    gap: 12px;
    font-size: 32px;
    font-family: JR;
    color: white;
`;

export const ModalInfoLabel = styled.span`
    opacity: 1;
`;

export const ModalInfoValue = styled.span`
    opacity: 1;
`;

export const ModalDivider = styled.div`
    width: 120px;
    height: 2px;
    background: white;
    opacity: 0.3;
`;

export const ModalFeatures = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const FeatureTitle = styled.div`
    ${font.H2}
    color: ${color.primary};
`;

export const FeatureList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const FeatureItem = styled.div`
    font-size: 16px;
    font-family: JL;
    color: white;
    opacity: 0.9;
    line-height: 1.5;
`;

export const Background = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, #000000 0%, #001530 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
    overflow: hidden;
`;

export const HeaderPlaceholder = styled.div`
    width: 100%;
    height: 180px;
    flex-shrink: 0;
`;

export const TopSection = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    flex-shrink: 0;
`;

export const SearchBarContainer = styled.div`
    flex: 1;
    height: 48px;
    border: 2px solid ${color.primary};
    border-radius: 24px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: rgba(0, 0, 0, 0.5);
`;

export const SearchInput = styled.input`
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: ${color.white};
    ${font.H3}
    &::placeholder {
        color: rgba(250, 250, 250, 0.5);
    }
`;

export const FilterButton = styled.button`
    height: 48px;
    padding: 0 24px;
    border: 2px solid ${color.primary};
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.5);
    color: ${color.white};
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    ${font.H3}
    transition: all 0.2s;

    &:hover {
        background: ${color.primary};
    }
`;

export const ContentBox = styled.div`
    width: 100%;
    max-width: 1200px;
    flex: 1;
    border: 2px solid ${color.primary};
    border-radius: 24px 24px 0 0;
    border-bottom: none;
    background: rgba(0, 0, 0, 0.3);
    padding: 32px;
    box-sizing: border-box;
    overflow-y: auto;

    /* Custom Scrollbar */
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
    }
    &::-webkit-scrollbar-thumb {
        background: ${color.primary};
        border-radius: 4px;
    }
`;

export const FishList = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 40px;
    row-gap: 48px;
    width: 100%;
`;

export const FishCard = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    width: calc(50% - 20px); /* 50% minus half of column-gap */
    box-sizing: border-box;
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
        transform: translateY(-4px);
    }
`;

export const ImageFrame = styled.div`
    width: 200px;
    height: 130px;
    background: ${color.white};
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const FishInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const InfoRow = styled.div`
    display: flex;
    gap: 8px;
    ${font.H2}
    color: ${color.white};
`;

export const InfoLabel = styled.span`
    color: ${color.white};
    opacity: 0.8;
`;

export const InfoValue = styled.span`
    color: ${color.white};
`;

export const Divider = styled.div`
    width: 60px;
    height: 2px;
    background: ${color.white};
    opacity: 0.3;
    margin-top: 4px;
`;