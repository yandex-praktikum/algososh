import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay } from "../../utils/utils";

const sortAndWait = async (arr: stringCharsProps[], setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>) => {
  setArrayCircles([...arr]);
  await delay(SHORT_DELAY_IN_MS);
};

export const addToHead = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setAddingToHead: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  value: string,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  setInProgress(true);
  setAddingToHead(true);
  // Подсвечиваем голову
  copyArr[0] = {
    ...copyArr[0],
    adding: true,
    extraCircle: {
      char: value,
    },
  };
  await sortAndWait([...copyArr], setArrayCircles);
  // Убираем подсветку и добавляем новую голову
  copyArr[0] = {
    ...copyArr[0],
    adding: false,
    extraCircle: undefined,
  };
  copyArr.unshift({
    char: value,
    state: ElementStates.Modified,
  });
  await sortAndWait([...copyArr], setArrayCircles);
  // Меняем стейт головы
  copyArr[0].state = ElementStates.Default;
  setInProgress(false);
  setAddingToHead(false);
  setValue("");
};

export const deleteFromHead = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setDeletingFromHead: React.Dispatch<React.SetStateAction<boolean>>,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  const deletingValue = copyArr[0].char;
  setInProgress(true);
  setDeletingFromHead(true);
  // Смещаем голову в нижний кружок
  copyArr[0] = {
    ...copyArr[0],
    char: "",
    deleting: true,
    extraCircle: {
      char: deletingValue ? deletingValue : "",
    },
  };
  await sortAndWait([...copyArr], setArrayCircles);
  // Удаляем элемент и подсвечиваем новую голову
  copyArr.shift();
  copyArr[0].state = ElementStates.Modified;
  await sortAndWait([...copyArr], setArrayCircles);
  // Убираем подсветку с новой головы
  copyArr[0].state = ElementStates.Default;
  setInProgress(false);
  setDeletingFromHead(false);
};

export const addToTail = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setAddingToTail: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  value: string,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  const { length } = copyArr;
  setInProgress(true);
  setAddingToTail(true);
  // Подсвечиваем хвост
  copyArr[length - 1] = {
    ...copyArr[length - 1],
    adding: true,
    extraCircle: {
      char: value,
    },
  };
  await sortAndWait([...copyArr], setArrayCircles);
  // Убираем подсветку и добавляем новый хвост
  copyArr[length - 1] = {
    ...copyArr[length - 1],
    adding: false,
    extraCircle: undefined,
  };
  copyArr.push({
    char: value,
    state: ElementStates.Modified,
  });
  await sortAndWait([...copyArr], setArrayCircles);
  // Меняем стейт головы
  copyArr[length].state = ElementStates.Default;
  setInProgress(false);
  setAddingToTail(false);
  setValue("");
};

export const deleteFromTail = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setDeletingFromTail: React.Dispatch<React.SetStateAction<boolean>>,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  const { length } = copyArr;
  const deletingValue = copyArr[length - 1].char;

  setInProgress(true);
  setDeletingFromTail(true);
  // Смещаем хвост в нижний кружок
  copyArr[length - 1] = {
    ...copyArr[length - 1],
    char: "",
    deleting: true,
    extraCircle: {
      char: deletingValue ? deletingValue : "",
    },
  };
  await sortAndWait([...copyArr], setArrayCircles);
  // Удаляем элемент и подсвечиваем новый хвост
  copyArr.pop();
  copyArr[length - 2].state = ElementStates.Modified;
  await sortAndWait([...copyArr], setArrayCircles);
  // Убираем подсветку с нового хвоста
  copyArr[length - 2].state = ElementStates.Default;
  setInProgress(false);
  setDeletingFromTail(false);
};

export const addByIdx = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setAddingByIdx: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setIdx: React.Dispatch<React.SetStateAction<number | undefined>>,
  idx: number | undefined,
  value: string,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  setInProgress(true);
  setAddingByIdx(true);
  // Запускаем перебор по элементам массива
  for (let i = 0; i <= idx!; i++) {
    copyArr[i] = {
      ...copyArr[i],
      adding: true,
      extraCircle: {
        char: value,
      },
    };
    if (i > 0)
      copyArr[i - 1] = {
        ...copyArr[i - 1],
        adding: false,
        extraCircle: undefined,
        state: ElementStates.Changing,
      };
      await sortAndWait([...copyArr], setArrayCircles);
  }
  // Добавляем элемент по индексу
  copyArr[idx!] = {
    ...copyArr[idx!],
    adding: false,
    extraCircle: undefined,
  };
  copyArr.splice(idx!, 0, {
    char: value,
    state: ElementStates.Modified,
  });
  await sortAndWait([...copyArr], setArrayCircles);
  // Убираем подсветку
  copyArr.forEach((el) => (el.state = ElementStates.Default));
  setInProgress(false);
  setAddingByIdx(false);
  setValue("");
  setIdx(undefined);
};



export const deleteByIdx = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setDeletingByIdx: React.Dispatch<React.SetStateAction<boolean>>,
  setIdx: React.Dispatch<React.SetStateAction<number | undefined>>,
  idx: number | undefined,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  const deletingValue = copyArr[idx!].char;
  setInProgress(true);
  setDeletingByIdx(true);
  // Запускаем перебор по элементам массива
  for (let i = 0; i <= idx!; i++) {
    copyArr[i].state = ElementStates.Changing;
    if (i === idx) copyArr[i].noArrow = true;
    await sortAndWait([...copyArr], setArrayCircles);
  }
  // Показываем удаляемый элемент
  copyArr[idx!] = {
    ...copyArr[idx!],
    char: "",
    deleting: true,
    extraCircle: {
      char: deletingValue ? deletingValue : "",
    },
  };
  await sortAndWait([...copyArr], setArrayCircles);
  // Удаляем элемент
  copyArr.splice(idx!, 1);
  // Убираем подсветку
  copyArr.forEach((el) => (el.state = ElementStates.Default));
  setInProgress(false);
  setDeletingByIdx(false);
  setIdx(undefined);
  await sortAndWait([...copyArr], setArrayCircles);
};
