import { Circle } from "../components/ui/circle/circle";
import { ElementStates } from "../types/element-states";
import { Node } from "../components/list-page/list";
export function headPositionGetter(
  sorted: number,
  index: number,
  inputValue: string
): string | React.ReactElement | null {
  return sorted === index ? (
    <Circle state={ElementStates.Changing} letter={inputValue} isSmall={true} />
  ) : index === 0 ? (
    "head"
  ) : (
    ""
  );
}

export function tailPositionGetter(
  sorted: number,
  index: number,
  inputValue: string,
  arr: Node<string>[]
): string | React.ReactElement | null {
  return sorted === index ? (
    <Circle state={ElementStates.Changing} letter={inputValue} isSmall={true} />
  ) : index === arr.length - 1 ? (
    "tail"
  ) : (
    ""
  );
}

