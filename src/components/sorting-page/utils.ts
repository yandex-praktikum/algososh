import {
  SortingMethods,
  Direction,
  IRefStep,
  TSortingSteps,
} from "../../types";

interface ISortArray<T> {
  sortArray: () => void;

  steps: TSortingSteps<T>;
}

export class SortArray<T> implements ISortArray<T> {
  private _array: T[];
  private _method: SortingMethods;
  private _direction: Direction;
  private _steps: TSortingSteps<T> = [];

  constructor() {
    this._array = [];
    this._method = SortingMethods.Selection;
    this._direction = Direction.Ascending;
  }

  protected _clearSteps() {
    this._steps = [];
  }

  protected _compare(current: T, compared: T) {
    if (this._direction === Direction.Ascending) {
      return current > compared;
    } else {
      return current < compared;
    }
  }

  protected _swap(current: number, compared: number) {
    let temp = this._array[current];
    this._array[current] = this._array[compared];
    this._array[compared] = temp;
  }

  protected _refStep({ current, modified }: IRefStep) {
    if (this._steps.length > 0) {
      const prevStep = this._steps[this._steps.length - 1];

      this._steps.push({
        array: [...this._array],
        current: current !== undefined ? [...current] : [],
        modified: [
          ...(modified !== undefined
            ? [...prevStep.modified, modified]
            : [...prevStep.modified]),
        ],
      });
    } else {
      this._steps.push({
        array: [...this._array],
        current: current !== undefined ? [...current] : [],
        modified: modified !== undefined ? [modified] : [],
      });
    }
  }

  protected _selectionSorting() {
    for (let i = 0; i < this._array.length; i++) {
      let currIndex = i;

      for (let j = i + 1; j < this._array.length; j++) {
        this._refStep({ current: [i, j, currIndex] });

        if (!this._compare(this._array[j], this._array[currIndex])) {
          currIndex = j;
        }
      }
      this._swap(i, currIndex);
      this._refStep({ current: [i, currIndex] });
      this._refStep({ modified: i });
    }
  }

  protected _bubbleSorting() {
    for (let i = 0; i < this._array.length; i++) {
      for (let j = i + 1; j < this._array.length; j++) {
        this._refStep({ current: [i, j] });

        if (this._compare(this._array[i], this._array[j])) {
          this._swap(i, j);
          this._refStep({ current: [i, j] });
        }
      }

      this._refStep({ modified: i });
    }
  }

  sortArray() {
    this._clearSteps();
    if (this._method === SortingMethods.Selection) {
      this._selectionSorting();
    }
    if (this._method === SortingMethods.Bubble) {
      this._bubbleSorting();
    }
  }

  set data(data: T[]) {
    this._clearSteps();
    this._array = [...data];
  }

  set method(method: SortingMethods) {
    this._clearSteps();
    this._method = method;
  }

  set direction(direction: Direction) {
    this._clearSteps();
    this._direction = direction;
  }

  get steps() {
    return this._steps;
  }
}
