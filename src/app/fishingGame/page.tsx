"use client"

import * as _ from "./style";


const ChoiceMap = () => {
    return (
        <_.Container>
            <_.Background src="/assets/map.png" />
            <_.Mark>
                서해
                <_.MarkImage src="/assets/mark.svg" />

            </_.Mark>
            <_.Mark2>
                남해
                <_.MarkImage src="/assets/mark.svg" />

            </_.Mark2>
            <_.Mark3>
                동해
                <_.MarkImage src="/assets/mark.svg" />

            </_.Mark3>

        </_.Container>
    )
}

export default ChoiceMap;