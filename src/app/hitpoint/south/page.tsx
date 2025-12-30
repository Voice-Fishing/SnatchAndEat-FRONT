"use client";

import React, { useState, useEffect } from "react";
import * as _ from "./style";
import { useRouter } from "next/navigation";
import axios from "axios";

const South = () => {
    const [fishImages, setFishImages] = useState<string[]>([]);
    const router = useRouter();

    const GetFish = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}fish`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                    }
                }
            );

            const southFish = response.data
                .filter((fish: any) => fish.seaAreaName === "남해")
                .map((fish: any) => fish.imageUrl);

            setFishImages(southFish);
        } catch (error) {
            console.error("API 호출 중 에러 발생:", error);
        }
    };

    useEffect(() => {
        GetFish();
    }, []);

    return (
        <_.Background>
            <_.Main>
                <_.Back onClick={() => { router.push("/hitpoint") }} >뒤로가기</_.Back>
                <_.InfoBox>
                    <_.Info>
                        <_.MainInfo>
                            <_.Sea>남해</_.Sea>
                            <_.SubSea>南海 | South Sea</_.SubSea>
                            <_.Enter>
                                <_.EnterText onClick={() => {
                                    localStorage.setItem("sea", "3")
                                    router.push("/fishing")
                                }}>입장하기</_.EnterText>
                            </_.Enter>
                        </_.MainInfo>
                        <_.SubInfo>
                            남해는 한반도의 남쪽 연안을 따라 펼쳐진 바다로, 수천 개의 크고 작은 섬들이 보석처럼 점점히 박혀 있는 다도해의 절경을 자랑합니다. 리아스식 해안이 발달하여 해안선이 복잡하고 아름다우며, 난류의 영향으로 연중 온화한 기후와 풍부한 수온을 유지합니다. 맑은 물과 잔잔한 물결 덕분에 양식업이 크게 발달하였으며, 한려해상 국립공원과 같은 수려한 자연경관을 간직한 우리 민족의 소중한 휴식처이자 자원의 보고입니다.
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

export default South;