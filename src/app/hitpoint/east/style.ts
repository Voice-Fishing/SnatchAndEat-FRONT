import styled from "@emotion/styled";
import font from "../../../packages/design-system/font";
import color from "../../../packages/design-system/color";

export const Background = styled.div`
    width: 100%;
    height: 100vh;
    overflow : hidden;
    background-image: url("/assets/east.png");
    background-size: cover;
    background-position: center;
    
    display: flex;
    justify-content: left;

`;

export const Main = styled.div`
    width:854px;
    height:80%;
    display:flex;
    flex-direction:column;

    margin-left:100px;

    margin-top:auto;

    gap:190px;

`;

export const Back = styled.p`
    ${font.H2}
    color:white;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${color.primary};
    }
`;


export const InfoBox = styled.div`
    width:100%;
    height:510px;
`;

export const Info = styled.div`
    width:100%;
    height:191px;

    display:flex;
    flex-direction:column;
    gap:18px;
`;


export const MainInfo = styled.div`
    width:100%;
    height:96px;

    display:flex;
    align-items: flex-end;
    gap:9px;
`;

export const Sea = styled.p`
    ${font.D1}
    color : ${color.primary}
`;

export const SubSea = styled.p`
    ${font.D2}
    font-size:40px;
    color:white;
`;

export const Enter = styled.button`
    width:230px;
    height:50px;
    background-color:${color.primary};
    border-radius:16px;
    border: none;
    cursor: pointer;
    margin-left: auto;
`;

export const EnterText = styled.p`
    ${font.H2}
    color:white;    
`;


export const SubInfo = styled.div`
    width:100%;
    height:77px;
    ${font.P1}
    color:white;
`;

export const InfoCard = styled.div`
    width:100%;
    height:100%;
    border-radius: 24px 24px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${color.black};
    border : 1px solid ${color.primary};
    border-bottom:none;
`;

export const InfoCardBox = styled.div`
    width:95%;
    margin-top : -20%;
`;

export const InfoCardText = styled.p`
    ${font.D3}
    color:white;
`;

export const FishBox = styled.div`
    width:100%;
    height:90px;

    margin-top:28px;
    overflow: hidden;
    position: relative;
`;

export const MarqueeWrapper = styled.div`
    display: flex;
    width: max-content;
    flex-wrap: nowrap;
    animation: marquee 10s linear infinite; /* 3세트이므로 시간을 약간 늘림 */

    @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.333%); } /* 3세트 중 1세트만큼 이동 */
    }
`;

export const FishItem = styled.img`
    height: 90px;
    width: auto;
    margin-right: 23px;
    object-fit: contain;
    flex-shrink: 0; /* 이미지 크기 보존 */
`;
