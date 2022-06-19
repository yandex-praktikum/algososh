import { ElementStates } from "../../types/element-states";
import { bubbleSortAlgo, selectionSortAlgo } from "./utils";

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

  it("верно возвращает конечный результат (descending)", () => {
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
    expect(
      selectionSortAlgo("descending", testArray).resultArray
    ).toStrictEqual(resultArr);
  });
  it("верно возвращает конечный результат (ascending)", () => {
    const resultArr = [
      {
        num: 1,
        state: ElementStates.Modified,
      },
      {
        num: 3,
        state: ElementStates.Modified,
      },
      {
        num: 5,
        state: ElementStates.Modified,
      },
      {
        num: 8,
        state: ElementStates.Modified,
      },
      {
        num: 9,
        state: ElementStates.Modified,
      },
    ];
    expect(selectionSortAlgo("ascending", testArray).resultArray).toStrictEqual(
      resultArr
    );
  });
  it("верно меняет стейты кружков и работает с шагом", () => {
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
    expect(
      selectionSortAlgo("descending", testArray, 2).resultArray
    ).toStrictEqual(resultArr);
  });
  it("верно работает с пустым массивом", () => {
    const resultArr = [];
    expect(selectionSortAlgo("descending", []).resultArray).toStrictEqual(
      resultArr
    );
  });
  it("верно работает с массивом из одного элемента", () => {
    const resultArr = [
      {
        num: 9,
        state: ElementStates.Modified,
      },
    ];
    expect(
      selectionSortAlgo("descending", [
        {
          num: 9,
          state: ElementStates.Default,
        },
      ]).resultArray
    ).toStrictEqual(resultArr);
  });
});

describe("Проверка алгоритма сортировки пузырьком", () => {
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

  it("верно возвращает конечный результат (descending)", () => {
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
    expect(bubbleSortAlgo("descending", testArray).resultArray).toStrictEqual(
      resultArr
    );
  });
  it("верно возвращает конечный результат (ascending)", () => {
    const resultArr = [
      {
        num: 1,
        state: ElementStates.Modified,
      },
      {
        num: 3,
        state: ElementStates.Modified,
      },
      {
        num: 5,
        state: ElementStates.Modified,
      },
      {
        num: 8,
        state: ElementStates.Modified,
      },
      {
        num: 9,
        state: ElementStates.Modified,
      },
    ];
    expect(bubbleSortAlgo("ascending", testArray).resultArray).toStrictEqual(
      resultArr
    );
  });
  it("верно меняет стейты кружков и работает с шагом", () => {
    const resultArr = [
      {
        num: 5,
        state: ElementStates.Default,
      },
      {
        num: 3,
        state: ElementStates.Changing,
      },
      {
        num: 1,
        state: ElementStates.Changing,
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
    expect(
      bubbleSortAlgo("descending", testArray, 2).resultArray
    ).toStrictEqual(resultArr);
  });
  it("верно работает с пустым массивом", () => {
    const resultArr = [];
    expect(bubbleSortAlgo("descending", []).resultArray).toStrictEqual(
      resultArr
    );
  });
  it("верно работает с массивом из одного элемента", () => {
    const resultArr = [
      {
        num: 9,
        state: ElementStates.Modified,
      },
    ];
    expect(
      bubbleSortAlgo("descending", [
        {
          num: 9,
          state: ElementStates.Default,
        },
      ]).resultArray
    ).toStrictEqual(resultArr);
  });
});
