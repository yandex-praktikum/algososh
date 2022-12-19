import { ElementStates } from "../../types/element-states";

export class StringReverse<T> {
  lettersInArray: T[] | any = [];
  counter: number = 0;

  public stringIsReversed(counter: number): boolean {
    return (
      this.lettersInArray.length === 1 ||
      counter === this.lettersInArray.length - counter ||
      counter === this.lettersInArray.length - counter - 1
    );
  }

  public changeLetters(counter: number): void {
    let temp: string = this.lettersInArray[counter].letter;
    this.lettersInArray[counter].letter =
      this.lettersInArray[this.lettersInArray.length - 1 - counter].letter;

    //текущая итерация - фиолетовый кружочек в начале
    this.lettersInArray[counter].state = ElementStates.Changing;

    //элементы после перестановки в начале массива зеленые
    if (this.lettersInArray[counter - 1]?.state) {
      this.lettersInArray[counter - 1].state = ElementStates.Modified;
    }

    this.lettersInArray[this.lettersInArray.length - 1 - counter].letter = temp;

    //фиолетовые в конце
    this.lettersInArray[this.lettersInArray.length - 1 - counter].state =
      ElementStates.Changing;

    //элементы после перестановки в конце массива зеленые
    if (
      this.lettersInArray[this.lettersInArray.length - 1 - counter + 1]?.state
    ) {
      this.lettersInArray[this.lettersInArray.length - 1 - counter + 1].state =
        ElementStates.Modified;
    }
  }

  public setAllCirlesModified(): void {
    this.lettersInArray = this.lettersInArray.map((el: T) => {
      return {
        ...el,
        state: ElementStates.Modified,
      };
    });
  }

  public setActualArr(circleLetters: string[]): void {
    this.lettersInArray = circleLetters.map(
      (element: string, i: number, arr) => {
        return {
          letter: element,
          state:
            i === 0 || i === arr.length - 1
              ? ElementStates.Changing
              : ElementStates.Default,
        };
      }
    );
  }
}
