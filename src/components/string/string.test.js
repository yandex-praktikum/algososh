import { swapString } from "./utils";

describe("Проверка разворота строки с четным числом символов", () => {
  let testString = "ABCD";

  it("верно возвращает конечный результат", () => {
    expect(swapString(testString).resultArray.join("")).toBe("DCBA");
  });

  it("верно возвращает результат на 2 шаге", () => {
    expect(swapString(testString, 1).resultArray.join("")).toBe("DBCA");
  });

  it("верно возвращает результат на 3 шаге", () => {
    expect(swapString(testString, 2).resultArray.join("")).toBe("DCBA");
  });
});

describe("Проверка разворота строки с нечетным числом символов", () => {
  let testString = "ABCDEFG";

  it("верно возвращает конечный результат", () => {
    expect(swapString(testString).resultArray.join("")).toBe("GFEDCBA");
  });

  it("верно возвращает результат на 2 шаге", () => {
    expect(swapString(testString, 1).resultArray.join("")).toBe("GBCDEFA");
  });

  it("верно возвращает результат на 3 шаге", () => {
    expect(swapString(testString, 2).resultArray.join("")).toBe("GFCDEBA");
  });
});

describe("Проверка разворота строки с одним символом", () => {
  let testString = "A";

  it("верно возвращает конечный результат", () => {
    expect(swapString(testString).resultArray.join("")).toBe("A");
  });

  it("верно возвращает результат на 2 шаге", () => {
    expect(swapString(testString, 1).resultArray.join("")).toBe("A");
  });
});

describe("Проверка разворота пустой строки", () => {
  let testString = "";

  it("верно возвращает конечный результат", () => {
    expect(swapString(testString).resultArray.join("")).toBe("");
  });
});
