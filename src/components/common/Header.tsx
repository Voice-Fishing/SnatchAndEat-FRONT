'use client';

import font from "@/packages/design-system/font";
import color from "@/packages/design-system/color";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname.includes(path);
    };

    return (
        <HeaderLayout>
            <Image src="/assets/logo.svg" alt="logo" width={72} height={27} />
            <MenuLayout>
                <Menu
                    onClick={() => router.push("/fishing")}
                    isActive={isActive("/fishing")}
                >낚시하기</Menu>
                <Menu
                    onClick={() => router.push("/book")}
                    isActive={isActive("/book")}
                >도감</Menu>
                <Menu
                    onClick={() => router.push("/search")}
                    isActive={isActive("/search")}
                >식당 찾기</Menu>
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

const Menu = styled.p<{ isActive: boolean }>`
    ${font.H2};
    color : ${props => props.isActive ? color.primary : color.white};
    cursor : pointer;
`

const User = styled.p`
    ${font.H2};
    cursor : pointer;
`