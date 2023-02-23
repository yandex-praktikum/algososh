import {ElementStates} from "../../../types/element-states";

export const defineCircleState = (start: number, end: number, index: number): ElementStates => {
    if (start === 0 && end === 0) {
        return ElementStates.Default
    }
    if (index === start || index === end) {
        return ElementStates.Changing
    }
    if (index < start || index > end) {
        return ElementStates.Modified
    }
    return ElementStates.Default;
}