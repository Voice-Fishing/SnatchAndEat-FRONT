'use client'

import styled from "@emotion/styled";
import Image from "next/image";
import font from "@/packages/design-system/font";
import color from "@/packages/design-system/color";

import { useState } from "react";

type FishingButtonProps = {
    onClick?: () => void;
    onCatch?: () => void;
};


const FishingButton = ({ onClick, onCatch }: FishingButtonProps) => {

    const [isThrow, setIsThrow] = useState("THROW");

    const throwHandle = () => {
        if (isThrow === "CATCH") {
            onCatch?.();
            setIsThrow("THROW");
        }
        else {
            onClick?.();
            setIsThrow("CATCH");
        }
    }

    return (
        <FishingButtonLayout onClick={throwHandle}>
            <Image
                src="/assets/button.svg"
                alt="낚시 버튼"
                width={300}
                height={300}

            />
            <Text>{isThrow}</Text>
        </FishingButtonLayout>
    )
}

export default FishingButton;

const FishingButtonLayout = styled.div`
    position: relative;
    cursor: pointer;
    width : auto;
    height : auto;
    display : flex;
    align-items : center;
    justify-content : center;

    :hover{
        p{
        font-size : 100px;
        text-shadow: 0px 0px 10px ${color.primary}, 0px 0px 10px ${color.primary}, 0px 0px 10px ${color.primary};

        }
    }
`;

const AlertOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;
const Text = styled.p`
    ${font.D1};
    color : ${color.white};
    text-shadow: 0px 0px 10px ${color.primary};
    position : absolute;
    bottom : 30%;
    z-index : 101;

    transition : all 0.3s ease-in-out;

`

