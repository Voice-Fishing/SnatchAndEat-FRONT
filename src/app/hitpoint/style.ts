import styled from "@emotion/styled";
import font from "../../packages/design-system/font";
import color from "@/packages/design-system/color";

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

export const Background = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
`;


export const BackPoint = styled.p`
    position : fixed;
    top : 10%;
    left : 10%;

    ${font.H1}
    color: ${color.white};
    z-index : 100;

    cursor : pointer;
`


const BaseMark = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    width: 145px;
    height: 125px;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: center;
    
    ${font.H2}
    color: black;
    padding-bottom: 57px;

    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: translate(-50%, -60%) scale(1.1);
        filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
    }
`;

export const Mark = styled(BaseMark)`
    top:65%;
    left: 30.3%;
`;

export const Mark2 = styled(BaseMark)`
    top: 93%;
    left: 55%;
`;

export const Mark3 = styled(BaseMark)`
    top: 52%;
    left: 74%;
`;


export const MarkImage = styled.img`
    position: absolute;
    top: 0;
    left: -5%;
    width: 110%;
    height: 110%;
    z-index: -1; /* 텍스트 뒤로 보냄 */

    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
`;

