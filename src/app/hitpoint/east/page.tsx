"use client";

import React from "react";
import * as _ from "./style";
import { useRouter } from "next/navigation";

const East = () => {
    // 물고기 이미지 배열
    const fishImages = [
        "/assets/fish1.png",
        "/assets/fish2.png",
        "/assets/fish3.png",
    ];

    const router = useRouter();

    return (
        <_.Background>
            <_.Main>
                <_.Back onClick={() => { router.push("/hitpoint") }} >뒤로가기</_.Back>
                <_.InfoBox>
                    <_.Info>
                        <_.MainInfo>
                            <_.Sea>동해</_.Sea>
                            <_.SubSea>東海 | East Sea</_.SubSea>
                            <_.Enter>
                                <_.EnterText>입장하기</_.EnterText>
                            </_.Enter>
                        </_.MainInfo>
                        <_.SubInfo>
                            동해는 대한민국을 비롯해 북한, 러시아, 일본 등 여러 나라에 둘러싸인 아름다운 바다입니다.
                            한반도의 동쪽부터 러시아 프리모리예 지방의 남쪽까지 넓게 펼쳐져 있으며,
                            지리적으로는 서태평양의 연안해에 해당합니다. 깊은 수심과 맑은 물을 자랑하는 동해는
                            우리에게 풍성한 수산 자원을 선물해 주는 소중한 터전입니다.
                        </_.SubInfo>
                    </_.Info>

                    <_.InfoCard>
                        <_.InfoCardBox>
                            <_.InfoCardText>포획 가능 어종</_.InfoCardText>
                            <_.FishBox>
                                <_.MarqueeWrapper>
                                    {/* 첫 번째 세트 */}
                                    {fishImages.map((src, idx) => (
                                        <_.FishItem key={`set1-${idx}`} src={src} alt="fish" />
                                    ))}

                                    {/* 두 번째 세트 (무한 루프용) */}
                                    {fishImages.map((src, idx) => (
                                        <_.FishItem key={`set2-${idx}`} src={src} alt="fish" />
                                    ))}

                                    {/* 세 번째 세트 (무한 루프용) */}
                                    {fishImages.map((src, idx) => (
                                        <_.FishItem key={`set3-${idx}`} src={src} alt="fish" />
                                    ))}
                                </_.MarqueeWrapper>
                            </_.FishBox>
                        </_.InfoCardBox>
                    </_.InfoCard>
                </_.InfoBox>
            </_.Main>
        </_.Background>
    );
};

export default East;