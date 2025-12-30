'use client';

import styled from "@emotion/styled";
import { useState } from "react";
import Image from "next/image";
import color from "@/packages/design-system/color";
import font from "@/packages/design-system/font";

interface FishingHelpModalProps {
    onClose: () => void;
}



const HighlightText = styled.span`
    color: ${color.primary};
    font-weight: bold;
`;

const slides = [
    {
        image: "/assets/1.svg",
        text: <>THROW 상태에서 <HighlightText>버튼</HighlightText>을 눌러요</>
    },
    {
        image: "/assets/2.svg",
        text: <>기다리다 보면 <HighlightText>느낌표</HighlightText>가 나타나요</>
    },
    {
        image: "/assets/3.svg",
        text: <><HighlightText>CATCH</HighlightText>를 눌러 게임을 시작해요</>
    },
    {
        image: "/assets/4.svg",
        text: <>주어진 키를 시간안에 입력하여 <HighlightText>물고기</HighlightText>를 낚아요</>
    }
];

const FishingHelpModal = ({ onClose }: FishingHelpModalProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    };

    return (
        <Backdrop onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Header>
                    <Title>도움말</Title>
                    <CloseButton onClick={onClose}>
                        <Image src="/assets/close.svg" alt="닫기" width={36} height={36} />
                    </CloseButton>
                </Header>

                <Content>
                    <NavButton onClick={handlePrev} side="left">
                        <Image src="/assets/slide.svg" alt="이전" width={24} height={24} />
                    </NavButton>

                    <MainSection>
                        <ImageWrapper>
                            <Image
                                src={slides[currentSlide].image}
                                alt={`도움말 ${currentSlide + 1}`}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </ImageWrapper>
                        <DescriptionText>{slides[currentSlide].text}</DescriptionText>
                    </MainSection>

                    <NavButton onClick={handleNext} side="right">
                        <Image
                            src="/assets/slide.svg"
                            alt="다음"
                            width={24}
                            height={24}
                            style={{ transform: 'rotate(180deg)' }}
                        />
                    </NavButton>
                </Content>

                <IndicatorWrapper>
                    {slides.map((_, index) => (
                        <Indicator key={index} active={index === currentSlide} />
                    ))}
                </IndicatorWrapper>
            </ModalContainer>
        </Backdrop>
    );
};

export default FishingHelpModal;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 110vh;
    background: rgba(21, 21, 21, 0.8);
    backdrop-filter: blur(20px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3000;
`;

const ModalContainer = styled.div`
    width: 869px;
    height: 761px;
    background: #151515;
    border: 2px solid ${color.primary};
    border-radius: 16px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 0 50px rgba(0, 128, 255, 0.3);
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
`;

const Title = styled.h2`
    ${font.H2};
    font-size: 40px;
    color: ${color.white};
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const NavButton = styled.button<{ side: 'left' | 'right' }>`
    background: none;
    border: none;
    cursor: pointer;
    padding: 20px;
    opacity: 0.5;
    transition: opacity 0.2s;
    
    &:hover {
        opacity: 1;
    }
`;

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 439px;
    height: 249px;
    border-radius: 12px;
    overflow: hidden;
`;



const DescriptionText = styled.p`
    ${font.H2};
    font-size: 36px;
    color: ${color.white};
    text-align: center;
    width: 640px;
    word-break: keep-all;
`;

const IndicatorWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 40px;
`;

const Indicator = styled.div<{ active: boolean }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(props) => props.active ? color.primary : 'rgba(255, 255, 255, 0.2)'};
    transition: background 0.3s ease;
`;
