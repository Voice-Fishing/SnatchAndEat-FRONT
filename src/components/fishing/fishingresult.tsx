'use client';

import styled from "@emotion/styled";
import Image from "next/image";
import color from "@/packages/design-system/color";
import font from "@/packages/design-system/font";

export interface FishingResultData {
    name: string;
    grade: string;
    size: number;
    seaArea: string;
    description: string;
    imageUrl?: string;
    closedSeason: string;
    isProtected: boolean;
    seaAreaName: string;
    maxSizeCm: string;
    minSizeCm: string;
}

interface FishingResultProps {
    result: FishingResultData | null;
    onClose: () => void;
}

const FishingResult = ({ result, onClose }: FishingResultProps) => {
    if (!result) return null;

    const getGradeColor = (grade: string) => {
        switch (grade.toUpperCase()) {
            case 'LEGENDARY': return '#ffaa00';
            case 'EPIC': return '#8324ff';
            case 'RARE': return '#0080ff';
            default: return '#fafafa';
        }
    };

    return (
        <Backdrop onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <Image src="/assets/close.svg" alt="닫기" width={24} height={24} />
                </CloseButton>

                <TopContent>
                    <ImageWrapper>
                        <Image
                            src={result.imageUrl || "/assets/db46ed7efe1062b5b241be95828282dcd319a79d.png"}
                            alt={result.name}
                            fill
                            style={{ objectFit: 'cover', borderRadius: '16px' }}
                        />
                    </ImageWrapper>

                    <MainInfo>
                        <NameRow>
                            <FishName>이름: {result.name} {result.isProtected && <p>보호종</p>}</FishName>
                            <GradeBadge bgColor={getGradeColor(result.grade)}>
                                {result.grade}
                            </GradeBadge>
                        </NameRow>
                        <DetailText>서식지 : {result.seaAreaName}</DetailText>
                        <DetailText>크기 : {result.minSizeCm} ~ {result.maxSizeCm}cm</DetailText>
                        {result.closedSeason && <DetailText>금채기 : {result.closedSeason}</DetailText>}
                    </MainInfo>
                </TopContent>

                <DescriptionSection>
                    <HighlightText>특징</HighlightText>: {result.description || "이 물고기에 대한 상세 설명이 없습니다."}
                </DescriptionSection>
            </ModalContainer>
        </Backdrop>
    );
};

export default FishingResult;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(21, 21, 21, 0.6);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    position: relative;
    width: 800px;
    background: #151515;
    border: 2px solid ${color.primary};
    border-radius: 16px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 10;
`;

const TopContent = styled.div`
    display: flex;
    gap: 30px;
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 260px;
    height: 172px;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    flex-shrink: 0;
`;

const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
`;

const NameRow = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const FishName = styled.h2`
    ${font.H2};
    font-size: 32px;
    color: ${color.white};
    margin: 0;
`;

const GradeBadge = styled.div<{ bgColor: string }>`
    border: 2px solid ${(props) => props.bgColor};
    padding: 4px 16px;
    ${font.H2};
    font-weight: bold;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DetailText = styled.p`
    ${font.H4};
    font-size: 24px;
    color: ${color.white};
    margin: 0;
`;

const DescriptionSection = styled.div`
    ${font.H4};
    font-size: 18px;
    line-height: 1.6;
    color: ${color.white};
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
`;

const HighlightText = styled.span`
    color: ${color.primary};
    font-weight: bold;
`;
