import { ElementStates } from "../../types/element-states";
import { selectionSortAlgo } from "./utils";

describe("Проверка алгоритма сортировки выбором", () => {
  let testArray;

  beforeEach(() => {
    testArray = [
      {
        num: 5,
        state: ElementStates.Default,
      },
      {
        num: 3,
        state: ElementStates.Default,
      },
      {
        num: 1,
        state: ElementStates.Default,
      },
      {
        num: 9,
        state: ElementStates.Default,
      },
      {
        num: 8,
        state: ElementStates.Default,
      },
    ];
  });

  describe("сортировка по убыванию", () => {
    it("верно возвращает конечный результат", () => {
      const resultArr = [
        {
          num: 9,
          state: ElementStates.Modified,
        },
        {
          num: 8,
          state: ElementStates.Modified,
        },
        {
          num: 5,
          state: ElementStates.Modified,
        },
        {
          num: 3,
          state: ElementStates.Modified,
        },
        {
          num: 1,
          state: ElementStates.Modified,
        },
      ];
      expect(selectionSortAlgo("descending", testArray).resultArray).toStrictEqual(
        resultArr
      );
    });
    it("верно меняет стейты кружков ", () => {
      const resultArr = [
        {
          num: 5,
          state: ElementStates.Chosen,
        },
        {
          num: 3,
          state: ElementStates.Changing,
        },
        {
          num: 1,
          state: ElementStates.Default,
        },
        {
          num: 9,
          state: ElementStates.Default,
        },
        {
          num: 8,
          state: ElementStates.Default,
        },
      ];
      expect(selectionSortAlgo("descending", testArray, 2).resultArray).toStrictEqual(
        resultArr
      );
    });
  });
});
