import { ElementStates } from "../../types/element-states";

export interface IQueue {
  item: string;
  state: ElementStates;
  head: string | null;
  tail: string | null;
}
