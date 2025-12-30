'use client'

import styled from "@emotion/styled";
import FishingButton from "@/components/fishing/fishingbutton";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import FishingResult, { FishingResultData } from "@/components/fishing/fishingresult";


const Fishing = () => {
    const [vibrate, setVibrate] = useState(false);
    const [catchs, setcatch] = useState(false);
    const [isGaming, setIsGaming] = useState(false);
    const [gradeing, setgradeing] = useState("");
    const [gauge, setGauge] = useState(50);
    const sea = localStorage.getItem("sea");
    const [arrowQueue, setArrowQueue] = useState<{ id: number; key: string; display: string }[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [catchResult, setCatchResult] = useState<FishingResultData | null>(null);
    const catchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isProcessing = useRef(false);
    const router = useRouter();

    if (!sea) {
        alert("잘못된 접근입니다!");
        router.back();
    }

    function getRandomArbitrary(min: number, max: number) {
        return (Math.random() * (max - min) + min)
    }

    const handleThrow = () => {
        setVibrate(true);
        if (catchTimeoutRef.current) clearTimeout(catchTimeoutRef.current);
        catchTimeoutRef.current = setTimeout(() => {
            setcatch(true);
            setVibrate(true);
        }, getRandomArbitrary(1500, 4000));
    };

    useEffect(() => {
        if (vibrate) {
            const timer = setTimeout(() => setVibrate(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [vibrate]);

    const handleCatch = () => {
        if (catchTimeoutRef.current) {
            if (catchs) {
                isProcessing.current = false;
                setGauge(50);
                setIsGaming(true);
            } else {
                clearTimeout(catchTimeoutRef.current);
                catchTimeoutRef.current = null;
                setcatch(false);
            }
        }
    }

    const handleSuccess = async () => {
        if (isProcessing.current) return;
        isProcessing.current = true;

        setIsGaming(false);
        setcatch(false);
        setGauge(50);
        setArrowQueue([]);


        const size = Number((Math.random() * (200 - 1) + 1).toFixed(1));


        const grades = ["COMMON", "RARE", "EPIC", "LEGENDARY"];
        const gradeIndex = Math.floor(Math.random() * 4);
        const currentGrade = grades[gradeIndex];



        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}fish/catch`,
                {
                    "seaAreaId": sea,
                    "size": size,
                    "grade": currentGrade
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            );

            console.log("물고기 저장 성공:", response.data);
            setShowResult(true);
            setCatchResult(response.data);

        } catch (error: any) {

            if (error.response && error.response.status === 404) {
                console.warn("서버 메시지:", error.response.data.message);

                alert("앗... 물고기 대신 쓰레기를 낚았습니다! 캔을 수거했습니다. 🗑️🥫");
            } else {
                console.error("기타 에러 발생:", error);
                alert("통신 중 오류가 발생했습니다.");
            }
        }
    };


    const handleFailure = () => {
        if (isProcessing.current) return;
        isProcessing.current = true;

        setIsGaming(false);
        setcatch(false);
        setGauge(50);
        setArrowQueue([]);
        alert("물고기를 놓쳤습니다... 🌊");
    };

    useEffect(() => {
        let drainInterval: NodeJS.Timeout;
        if (isGaming) {
            drainInterval = setInterval(() => {
                setGauge(prev => {
                    const next = prev - 7;
                    if (next <= 0) {
                        setTimeout(handleFailure, 0);
                    }
                    return next;
                });
            }, 300);
        }
        return () => clearInterval(drainInterval);
    }, [isGaming]);

    const generateRandomArrow = () => {
        const keyPairs = [
            { display: '←', key: 'd' }, { display: '→', key: 'j' },
            { display: '↑', key: 'f' }, { display: '↓', key: 'k' },
        ];
        return { id: Math.random(), ...keyPairs[Math.floor(Math.random() * 4)] };
    };

    useEffect(() => {
        if (isGaming) {
            const initialQueue = Array.from({ length: 6 }, () => generateRandomArrow());
            setArrowQueue(initialQueue);
        }
    }, [isGaming]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isGaming || arrowQueue.length === 0) return;
            const keyMap: { [key: string]: string } = {
                'd': 'd', 'f': 'f', 'j': 'j', 'k': 'k',
                'arrowleft': 'd', 'arrowright': 'j', 'arrowup': 'f', 'arrowdown': 'k'
            };
            const pressedKey = e.key.toLowerCase();
            const mappedKey = keyMap[pressedKey];

            if (!mappedKey) return;

            if (mappedKey === arrowQueue[0].key) {
                const nextGauge = gauge + 12;
                if (nextGauge >= 100) {
                    handleSuccess();
                } else {
                    setGauge(nextGauge);
                    setArrowQueue(prev => [...prev.slice(1), generateRandomArrow()]);
                }
            } else {
                const nextGauge = gauge - 10;
                if (nextGauge <= 0) {
                    handleFailure();
                } else {
                    setGauge(nextGauge);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGaming, arrowQueue, gauge]);

    return (
        <FishingLayout>
            <VideoLayout autoPlay loop muted playsInline className={vibrate ? "vibration" : ""}>
                <source src="/assets/sea.mp4" type="video/mp4" />
            </VideoLayout>

            <GameLayout >
                <Image src="/assets/fishingbar.png" alt="낚시대" width={700} height={700} />
                {catchs && !isGaming && (
                    <Image src="/assets/alert.svg" alt="HIT!" width={100} height={100} style={{ position: 'absolute', bottom: '20%' }} />
                )}
                {isGaming && (
                    <MiniGameContainer>
                        <GaugeBackground />
                        <GaugeProgress gauge={gauge} />
                        <TargetZone>
                            <ArrowQueueWrapper>
                                {arrowQueue.map((arrow, index) => (
                                    <QueueArrow key={arrow.id} active={index === 0}>
                                        {arrow.display}
                                    </QueueArrow>
                                ))}
                            </ArrowQueueWrapper>
                        </TargetZone>
                    </MiniGameContainer>
                )}
                <ButtonLayout>
                    <FishingButton onClick={handleThrow} onCatch={handleCatch} />
                </ButtonLayout>
            </GameLayout>

            {showResult && (
                <FishingResult
                    result={catchResult}
                    onClose={() => setShowResult(false)}
                />
            )}
        </FishingLayout>
    );
};

export default Fishing;



const FishingLayout = styled.div`
    width: 120vw; height: 120vh;
    overflow: hidden; position: relative;
`;

const VideoLayout = styled.video`
    position: fixed; top: -5%; left: -5%;
    width: 120%; height: 120%;
    object-fit: cover; z-index: -1;
`;

const GameLayout = styled.div`
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh;
    display: flex; align-items: flex-end; justify-content: center;
    z-index : 20;
`;

const MiniGameContainer = styled.div`
    position: absolute; bottom: -800px;
    left: 50%; transform: translateX(-50%);
    width: 1600px; height: 1600px;
    display: flex; justify-content: center; align-items: center;
    z-index: 30;
`;

const GaugeBackground = styled.div`
    position: absolute; width: 1600px; height: 1600px;
    border: 300px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%; clip-path: inset(0 0 50% 0);
    box-sizing: border-box;
`;

const GaugeProgress = styled.div<{ gauge: number }>`
    position: absolute; width: 1600px; height: 1600px;
    border: 300px solid #4ade80; /* 생명력 색상 */
    border-radius: 50%; clip-path: inset(0 0 50% 0);
    box-sizing: border-box;
    transform: rotate(${(props) => -180 + (props.gauge * 1.8)}deg);
    transition: transform 0.2s linear;
    z-index: 31;
`;

const TargetZone = styled.div`
    position: absolute; width: 800px; height: 150px;
    top: 50px; z-index: 35;
    background: rgba(0, 128, 255, 0.1);
    border: 2px solid #0080FF;
    border-radius: 20px;
    box-shadow: 0 0 30px #0080FF;
    display: flex; justify-content: center; align-items: center;
`;

const ArrowQueueWrapper = styled.div`
    display: flex;
    gap: 20px;
    padding: 0 40px;
`;

const QueueArrow = styled.div<{ active: boolean }>`
    width: 100px; height: 100px;
    border-radius: 16px;
    background: ${(props) => props.active ? '#0080FF' : 'rgba(255, 255, 255, 0.2)'};
    color: ${(props) => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
    font-size: 64px; font-weight: bold;
    display: flex; justify-content: center; align-items: center;
    transition: all 0.2s ease;
    transform: ${(props) => props.active ? 'scale(1.1)' : 'scale(1)'};
    box-shadow: ${(props) => props.active ? '0 0 20px #0080FF' : 'none'};
`;

const ButtonLayout = styled.div`
    position : absolute; bottom : -80px;
`
