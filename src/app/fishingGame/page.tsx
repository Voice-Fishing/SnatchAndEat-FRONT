"use client"

import * as _ from "./style";
import { useRouter } from "next/navigation";


const ChoiceMap = () => {
    const router = useRouter();
    return (
        <_.Container>
            <_.Background src="/assets/map.png" />
            <_.Mark onClick={() => router.push("/fishingGame/west")}>
                서해
                <_.MarkImage src="/assets/mark.svg" />

            </_.Mark>
            <_.Mark2 onClick={() => router.push("/fishingGame/south")}>
                남해
                <_.MarkImage src="/assets/mark.svg" />

            </_.Mark2>
            <_.Mark3 onClick={() => router.push("/fishingGame/east")}>
                동해
                <_.MarkImage src="/assets/mark.svg" />

            </_.Mark3>

        </_.Container>
    )
}

export default ChoiceMap;