'use client'
import color from "@/packages/design-system/color";
import styled from "@emotion/styled";
import Image from "next/image";
const FishingButton = () => {
    return (
        <FishingButtonLayout>
            <FishingInnerButtonLayout>
                <Image src="/assets/fishing.svg" alt="낚시 게임 로고" width={350} height={350} />
            </FishingInnerButtonLayout>
        </FishingButtonLayout>
    )
}

export default FishingButton;

const FishingButtonLayout = styled.div`
  aspect-ratio: 1;
  
  width: 30vw;
  
  border-radius: 50%;
  
  background-color: ${color.black};
  border: 2px solid ${color.primary};

  display: flex;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
  overflow: hidden;

`;



const FishingInnerButtonLayout = styled.div`
  aspect-ratio: 1;
  
  width: 20vw;
  
  border-radius: 50%;
  
  background-image: linear-gradient(to bottom, ${color.white}, ${color.secondary});
  border: 2px solid ${color.primary};

  display: flex;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
  overflow: hidden;
  padding-right : 70px;
`;

