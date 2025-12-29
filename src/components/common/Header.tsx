'use client';

import font from "@/packages/design-system/font";
import styled from "@emotion/styled";
import Image from "next/image";

const Header = () => {
    return (
        <HeaderLayout>
            <Image src="/assets/logo.svg" alt="logo" width={72} height={27} />
            <MenuLayout>
                <Menu>낚시하기</Menu>
                <Menu>도감</Menu>
                <Menu>식당 찾기</Menu>
            </MenuLayout>
            <UserLayout>
                <User>로그인</User>
                <User>회원가입</User>
            </UserLayout>
        </HeaderLayout>
    )
}

export default Header;


const HeaderLayout = styled.div`
  width: 100%;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.5); 
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 124px;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;


const MenuLayout = styled.div`
  display : flex;
  flex-direction : row;
  justify-content : space-between;
  align-items : center;
  gap : 40px;
`

const UserLayout = styled.div`
  display : flex;
  flex-direction : row;
  justify-content : space-between;
  align-items : center;
  gap : 40px;
`

const Menu = styled.p`
    ${font.H2};
`

const User = styled.p`
    ${font.H2};
`