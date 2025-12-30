'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import color from '@/packages/design-system/color';
import font from '@/packages/design-system/font';
import Header from '@/components/common/Header';
import Button from '@/components/common/Button';

const HomeContainer = styled.main`
  min-height: 100vh;
  background-color: ${color.black};
  display: flex;
  position: relative;
  overflow: hidden;
`;

const ContentSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
  z-index: 2;
  max-width: 700px;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;
  z-index: 1;
`;

const ImageSection = styled.div<{ active: boolean; src: string }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url('${({ src }) => src}');
  background-size: cover;
  background-position: center;
  opacity: ${({ active }) => (active ? 0.7 : 0)};
  transition: opacity 1s ease-in-out;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background: linear-gradient(90deg, ${color.black} 0%, transparent 100%);
  }
`;

const Title = styled.h1`
  ${font.D1}
  color: ${color.primary};
  margin-bottom: 12px;
  line-height: 1.2;
  letter-spacing: -0.01em;
  
  & span {
    color: ${color.white};
    display: block;
  }
`;

const Subtitle = styled.p`
  ${font.H3}
  color: ${color.white};
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 480px;
  line-height: 1.6;
  white-space: pre-line;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const IMAGES = [
  '/images/home_bg_1.png',
  '/images/home_bg_2.png',
  '/images/home_bg_3.png',
];

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <HomeContainer>
        <ImageContainer>
          {IMAGES.map((src, index) => (
            <ImageSection
              key={src}
              active={index === currentImage}
              src={src}
            />
          ))}
        </ImageContainer>
        <ContentSection>
          <Title>
            오늘의 짜릿한 손맛,
            <span>내일의 푸른 바다를 위해</span>
          </Title>
          <Subtitle>
            제철 물고기 포인트에서 가상 낚시부터{'\n'}실제 물고기를 다루는 로컬 맛집까지 연결해요
          </Subtitle>
          <ButtonGroup>
            <Button variant="primary">낚시하러가기</Button>
            <Button variant="secondary">도감 구경하기</Button>
          </ButtonGroup>
        </ContentSection>
      </HomeContainer>
    </>
  );
}
