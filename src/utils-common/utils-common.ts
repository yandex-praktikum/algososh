interface IgenerateInitialArray {
  minLength: number;
  maxLength: number;
  minVal: number;
  maxVal: number;
}

export const generateInitialArray = ({
  minLength,
  maxLength,
  minVal,
  maxVal,
}: IgenerateInitialArray): number[] => {
  const initialArrayLength =
    Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  const initialArray: number[] = new Array(initialArrayLength)
    .fill(0)
    .map(
      (item) => item + Math.floor(Math.random() * (maxVal - minVal)) + minVal
    );

  return initialArray;
};

export const setDelay = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};
