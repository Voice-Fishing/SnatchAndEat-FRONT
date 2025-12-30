'use client';

import styled from "@emotion/styled";
import Image from "next/image";
import color from "@/packages/design-system/color";
import font from "@/packages/design-system/font";
import { SearchResultItemType } from "@/components/search/searchresult";

interface SearchDescriptionModalProps {
    shop: SearchResultItemType | null;
    onClose: () => void;
}

const SearchDescriptionModal = ({ shop, onClose }: SearchDescriptionModalProps) => {
    if (!shop) return null;

    return (
        <Backdrop onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <Image src="/assets/close.svg" alt="닫기" width={24} height={24} />
                </CloseButton>

                <ContentWrapper>
                    <ShopImageWrapper>
                        <Image
                            src={shop.thumbnailUrl}
                            alt={shop.name}
                            fill
                            style={{ objectFit: 'cover', borderRadius: '24px' }}
                        />
                    </ShopImageWrapper>

                    <InfoSection>
                        <TitleRow>
                            <ShopName>{shop.name}</ShopName>
                            <ShopCategory>{shop.description}</ShopCategory>
                            <ShopAddress>{shop.address}</ShopAddress>
                        </TitleRow>
                        <RatingRow>
                            <RatingStars>
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} style={{ color: i < 4 ? color.primary : color.white }}>★</span>
                                ))}
                            </RatingStars>
                            <ReviewCount>(125)</ReviewCount>
                        </RatingRow>
                    </InfoSection>
                </ContentWrapper>
            </ModalContainer>
        </Backdrop>
    );
};

export default SearchDescriptionModal;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(21, 21, 21, 0.38);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    position: relative;
    width: 882px;
    height: 505px;
    background: #151515;
    border: 2px solid ${color.primary};
    border-radius: 24px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
    position: absolute;
    top: 24px;
    right: 24px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 10;
    
    img {
        filter: invert(1);
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    gap: 40px;
    height: 100%;
    align-items: center;
`;

const ShopImageWrapper = styled.div`
    position: relative;
    width: 409px;
    height: 276px;
    border: 2px solid ${color.primary};
    border-radius: 24px;
    overflow: hidden;
    flex-shrink: 0;
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
`;

const TitleRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ShopName = styled.h1`
    ${font.H1};
    font-size: 48px;
    color: ${color.white};
    margin: 0;
`;

const ShopCategory = styled.span`
    ${font.H4};
    font-size: 24px;
    color: ${color.white};
    opacity: 0.8;
`;

const ShopAddress = styled.p`
    ${font.H4};
    font-size: 32px;
    color: ${color.primary};
    margin: 0;
`;

const RatingRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const RatingStars = styled.div`
    font-size: 24px;
    display: flex;
    gap: 4px;
`;

const ReviewCount = styled.span`
    ${font.H4};
    font-size: 24px;
    color: ${color.white};
`;
