import {ElementStates} from "../../../types/element-states";

export const defineCircleState = (changingIndex: number, currIndex: number, isDone: boolean = false, value: number): ElementStates => {
    if (currIndex === changingIndex) {
        return ElementStates.Changing
    }
    if (isDone && currIndex === value) {
        return ElementStates.Modified
    }
    return ElementStates.Default;
}