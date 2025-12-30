'use client'

import styled from "@emotion/styled";
import FishingButton from "@/components/fishing/fishingbutton";
import Image from "next/image";

const Fishing = () => {
    return (
        <FishingLayout>
            <VideoLayout autoPlay loop muted playsInline>
                <source src="/assets/sea.mp4" type="video/mp4" />
                Your browser is not supported!
            </VideoLayout>

            <GameLayout>
                <Image src="/assets/fishing.png" alt="낚시대" width={700} height={700} />
                <FishingButtonWrapper>
                    <FishingButton />
                </FishingButtonWrapper>
            </GameLayout>
        </FishingLayout>
    )
}

export default Fishing;

const FishingLayout = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
`;

const VideoLayout = styled.video`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; 
    z-index: -1;
`;

const GameLayout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

`;

const FishingButtonWrapper = styled.div`
    transform: translate(30%, 30%); 
`;
