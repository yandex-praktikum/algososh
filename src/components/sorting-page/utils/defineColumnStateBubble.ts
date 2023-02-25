import {ElementStates} from "../../../types/element-states";

export const defineColumnStateBubble = (arr: number[], first: number, counter: number, index: number): ElementStates => {
    if (index === first || index === first + 1) {
        return ElementStates.Changing
    }
    if (index >= arr.length - counter) {
        return ElementStates.Modified
    }
    return ElementStates.Default;
}