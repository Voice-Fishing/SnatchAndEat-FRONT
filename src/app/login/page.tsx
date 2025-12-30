'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import color from '@/packages/design-system/color';
import font from '@/packages/design-system/font';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, ${color.black} 70%, ${color.primary} 250%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 120px;
  padding: 40px;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const Logo = styled.div`
  color: ${color.white};
  font-family: "JR";
  font-size: 128px;
  font-weight: 400;
  line-height: normal;
  
  .korean {
    color: ${color.white};
  }
  
  .chinese {
    color: ${color.primary};
  }

  @media (max-width: 1200px) {
    font-size: 96px;
  }

  @media (max-width: 992px) {
    font-size: 64px;
    text-align: center;
  }
`;

const LoginCard = styled.div`
  background: ${color.black};
  border: 1px solid ${color.primary};
  border-radius: 16px;
  padding: 56px 16px;
  width: 456px;
  height: 510px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 54px;

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
    max-width: 400px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid ${color.white};
  color: ${color.white};
  cursor: pointer;
  ${font.H3}
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${color.secondary};
    border-color: ${color.secondary};
  }
`;

const Title = styled.h1`
  ${font.D3}
  color: ${color.white};
  text-align: center;
  font-weight: 600;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 54px;
`;

const SignupLink = styled.div`
  ${font.H3}
  text-align: center;
  margin-top: 0;
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

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: false }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 간단한 유효성 검사
        const newErrors = {
            email: !formData.email || !formData.email.includes('@'),
            password: !formData.password || formData.password.length < 6,
        };

        setErrors(newErrors);

        if (newErrors.email || newErrors.password) {
            setModal({
                isOpen: true,
                title: '로그인 실패',
                message: '이메일 또는 비밀번호를 확인해주세요.',
            });
            return;
        }

        // 성공 모달 (실제로는 API 호출)
        setModal({
            isOpen: true,
            title: '로그인 성공!',
            message: '환영합니다!',
        });
    };

    const handleClose = () => {
        router.push('/');
    };

    return (
        <PageContainer>
            <Logo>
                <span className="korean">낚어먹</span>
                <span className="chinese">魚</span>
            </Logo>

            <LoginCard>
                <CloseButton onClick={handleClose}>✕</CloseButton>
                <Title>로그인</Title>

                <Form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="이메일을 입력해주세요"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />

                    <Input
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />

                    <Button type="submit" variant="primary">
                        로그인
                    </Button>
                </Form>

                <SignupLink>
                    회원이 아니라면?
                    <Link href="/signup">회원가입하기</Link>
                </SignupLink>
            </LoginCard>

            <Modal
                isOpen={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
                title={modal.title}
                message={modal.message}
            />
        </PageContainer>
    );
}
