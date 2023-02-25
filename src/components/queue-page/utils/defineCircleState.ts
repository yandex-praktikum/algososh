import {ElementStates} from "../../../types/element-states";

export const defineCircleState = (start: number, index: number): ElementStates => {
    if (index === start) {
        return ElementStates.Changing
    }
    return ElementStates.Default;
}