import { ElementStates } from "../../types/element-states";
import { Circle } from "../../components/ui/circle/circle";

type TNnode = {
    value: string,
    index: null | number,
    head: boolean
}

export const NodeHead = (index: number, node: TNnode) => {
    return node.head && node.value && index === node.index ?
        (
            <Circle
                letter={node.value}
                isSmall={true}
                state={ElementStates.Changing} />
        ) : index === 0 ? 'head' : null
}

export const NodeTail = (index: number, node: TNnode, item: string, arrLength: number) => {
    return !node.head && !node.value && index === node.index ?
        (
            <Circle
                letter={item}
                isSmall={true}
                state={ElementStates.Changing} />
        ) : index === arrLength - 1 ? 'tail' : null
} 