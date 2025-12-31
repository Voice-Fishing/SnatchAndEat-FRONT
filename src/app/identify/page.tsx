"use client";

import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import color from "@/packages/design-system/color";
import font from "@/packages/design-system/font";
import { useRouter } from "next/navigation";

interface IdentificationResult {
    response: string;
}

const Identify = () => {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [result, setResult] = useState<IdentificationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResult(null); // Reset result on new upload
            identifyFish(file);
        }
    };

    const identifyFish = async (file: File) => {
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}fish/identify`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                    }
                }
            );

            console.log("식별 성공:", response.data);
            setResult(response.data);
        } catch (error) {
            console.error("식별 실패:", error);
            if (axios.isAxiosError(error)) {
                alert(`물고기 식별 중 오류가 발생했습니다: ${error.message}`);
            } else {
                alert("물고기 식별 중 알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Background>
            <HeaderPlaceholder />
            <BackPoint onClick={() => router.push("/home")}>
                돌아가기
            </BackPoint>
            <MainContent>
                {!result ? (
                    <UploadCard>
                        <input
                            type="file"
                            accept="image/*"
                            id="imageInput"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <UploadLabel htmlFor="imageInput">
                            {isLoading ? (
                                <LoadingText>식별 중...</LoadingText>
                            ) : (
                                <>
                                    <UploadIcon>
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                    </UploadIcon>
                                    <UploadText>물고기 사진 업로드</UploadText>
                                </>
                            )}
                        </UploadLabel>
                    </UploadCard>
                ) : (
                    <ResultContainer>
                        <ImageSection>
                            <img src={previewUrl || ""} alt="Identified Fish" />
                        </ImageSection>

                        <InfoSection>
                            <InfoCard>
                                <InfoTitle>식별 결과</InfoTitle>
                                <InfoContent>
                                    <ResultText>{result.response}</ResultText>
                                </InfoContent>
                            </InfoCard>
                            <RetryButton onClick={() => {
                                setResult(null);
                                setPreviewUrl(null);
                                setSelectedImage(null);
                            }}>
                                다시 시도하기
                            </RetryButton>
                        </InfoSection>
                    </ResultContainer>
                )}
            </MainContent>
        </Background>
    );
};

export default Identify;

export const BackPoint = styled.p`
    position: fixed;
    top: 10%;
    left: 10%;
    ${font.H1}
    color: ${color.white};
    z-index: 100;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${color.primary};
    }
`;

const Background = styled.div`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(180deg, #000000 0%, #001530 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HeaderPlaceholder = styled.div`
    width: 100%;
    height: 180px;
    flex-shrink: 0;
`;

const MainContent = styled.div`
    width: 100%;
    max-width: 1200px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    box-sizing: border-box;
`;

const UploadCard = styled.div`
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid ${color.primary};
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-5px);
    }
`;

const UploadLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    width: 100%;
    height: 100%;
    justify-content: center;
`;

const UploadIcon = styled.div`
    opacity: 0.8;
`;

const UploadText = styled.div`
    ${font.H2}
    color: white;
    font-family: JR;
`;

const LoadingText = styled.div`
    ${font.H2}
    color: ${color.primary};
    font-family: JR;
`;

const ResultContainer = styled.div`
    display: flex;
    gap: 40px;
    width: 100%;
    max-width: 1000px;
    align-items: stretch;
`;

const ImageSection = styled.div`
    flex: 1;
    height: 400px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid ${color.primary};
    border-radius: 24px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const InfoSection = styled.div`
    flex: 1.2;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InfoCard = styled.div`
    flex: 1;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid ${color.primary}80;
    border-radius: 24px;
    padding: 32px;
    display: flex;
    flex-direction: column;
`;

const InfoTitle = styled.div`
    ${font.H2}
    color: white;
    font-family: JR;
    text-align: center;
    margin-bottom: 30px;
`;

const InfoContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const ResultText = styled.div`
    ${font.H3}
    color: white;
    font-family: JL;
    line-height: 1.6;
    word-break: keep-all;
    white-space: pre-wrap;
    line-height: 2.5;
    letter-spacing: 0.05em;
`;

const InfoDivider = styled.div`
    width: 100%;
    height: 1px;
    background: ${color.primary};
    opacity: 0.3;
`;

const RetryButton = styled.button`
    height: 56px;
    background: ${color.primary};
    border: none;
    border-radius: 12px;
    color: white;
    ${font.H3}
    font-family: JR;
    cursor: pointer;
    transition: opacity 0.2s;
    &:hover {
        opacity: 0.9;
    }
`;