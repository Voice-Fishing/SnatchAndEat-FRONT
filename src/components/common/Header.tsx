'use client';

import font from "@/packages/design-system/font";
import color from "@/packages/design-system/color";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {

      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        setUserName(response.data.name);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserName(null);
    router.push('/');
  };

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <HeaderLayout>
      <Image src="/assets/logo.svg" alt="logo" width={72} height={27} onClick={() => router.push("/home")} />
      <MenuLayout>
        <Menu
          onClick={() => router.push("/hitpoint")}
          isActive={isActive("/hitpoint")}
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
        {isLoggedIn ? (
          <>
            <User>{userName}님</User>
            <User onClick={handleLogout}>로그아웃</User>
          </>
        ) : (
          <>
            <User onClick={() => router.push('/login')}>로그인</User>
            <User onClick={() => router.push('/signup')}>회원가입</User>
          </>
        )}
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
