import {ElementStates} from "../../../types/element-states";

export const defineColumnStateSelection = (arr: number[], first: number, second: number, counter: number, index: number): ElementStates => {
    if (index === first || index === second) {
        return ElementStates.Changing
    }
    if (index < first) {
        return ElementStates.Modified
    }
    return ElementStates.Default;
}