'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/color';
import font from '@/packages/design-system/font';
import Link from 'next/link';

const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background: ${color.black};
  border-bottom: 1px solid ${color.primary};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoText = styled.span`
  font-family: 'JR';
  font-size: 24px;
  color: ${color.white};
  
  & span {
    color: ${color.primary};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 40px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const NavItem = styled(Link)`
  ${font.H2}
  color: ${color.white};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${color.primary};
  }
`;

const UserSection = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const UserText = styled.span`
  ${font.H3}
  color: ${color.white};
`;

const LogoutBtn = styled(Link)`
  ${font.H3}
  color: ${color.white};
  text-decoration: none;
  
  &:hover {
    color: ${color.primary};
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Link href="/home" style={{ textDecoration: 'none' }}>
        <LogoSection>
          <LogoText>낚아먹<span>魚</span></LogoText>
        </LogoSection>
      </Link>

      <NavLinks>
        <NavItem href="/hitpoint">낚시하기</NavItem>
        <NavItem href="/book">도감</NavItem>
        <NavItem href="/search">식당 찾기</NavItem>
      </NavLinks>

      <UserSection>
        <UserText>아이디</UserText>
        <LogoutBtn href="/">로그아웃</LogoutBtn>
      </UserSection>
    </HeaderContainer>
  );
}
