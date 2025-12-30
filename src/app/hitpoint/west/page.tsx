"use client";

import React from "react";
import * as _ from "./style";
import { useRouter } from "next/navigation";

const West = () => {
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
                            <_.Sea>서해</_.Sea>
                            <_.SubSea>西海 | West Sea</_.SubSea>
                            <_.Enter>
                                <_.EnterText onClick={() => {
                                    localStorage.setItem("sea", "2")
                                    router.push("/fishing")
                                }}>입장하기</_.EnterText>
                            </_.Enter>
                        </_.MainInfo>
                        <_.SubInfo>
                            서해는 한반도와 중국 대륙 사이에 위치한 드넓은 바다로, 흔히 '황해'라고도 불립니다. 수심이 얕고 조수 간만의 차가 매우 커서 세계적으로도 손꼽히는 광활한 갯벌이 발달해 있는 것이 특징입니다. 강물로부터 유입된 풍부한 영양염류 덕분에 수많은 어패류의 산란장이자 서식지가 되어주며, 예로부터 인근 주민들에게 풍요로운 삶의 터전을 제공해 온 생명의 바다입니다.
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

export default West;