'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import color from '@/packages/design-system/color';
import font from '@/packages/design-system/font';
import Button from '@/components/common/Button';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, ${color.black} 70%, ${color.primary} 250%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.div`
  color: ${color.white};
  font-family: "JR";
  font-size: 128px;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 60px;
  text-align: center;
  
  .korean {
    color: ${color.white};
  }
  
  .chinese {
    color: ${color.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  align-items: center;
`;

const SignupText = styled.div`
  ${font.H2}
  text-align: center;
  margin-top: 24px;
  color: ${color.white};

  a {
    color: ${color.primary};
    text-decoration: none;
    margin-left: 8px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Home() {
  return (
    <PageContainer>
      <Logo>
        <span className="korean">낚어먹</span>
        <span className="chinese">魚</span>
      </Logo>

      <ButtonContainer>
        <Link href="/login">
          <Button variant="secondary">로그인</Button>
        </Link>
      </ButtonContainer>

      <SignupText>
        회원이 아니라면?
        <Link href="/signup">회원가입하러가기</Link>
      </SignupText>
    </PageContainer>
  );
}
