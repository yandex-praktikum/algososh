import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import listStyle from './listStyle.module.css';
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {ElementStates} from "../../types/element-states";
import List from './utils';
import {delay} from "../../utils/constDelay";

export interface IListArr {
    element: string,
    state: ElementStates,
    add?: boolean;
    delete?: boolean;
    smallCircle?: {
        element?: string | null;
    };
}
export const ListPage: React.FC = () => {
    //Формирования небольшого связного списка
    const initialArray = ["85", "13", "34", "1"];
    const defaultArr: IListArr[] = initialArray.map((item) => ({
        element: item,
        state: ElementStates.Default,
    }))
    const [input, setInput] = useState<string>('');
    const [inputIndex, setInputIndex] = useState<number>(1);
    const [listArr, setListArr] = useState<IListArr[]>(defaultArr);
    const [loaderAddHead, setLoaderAddHead] = useState<boolean>(false);
    const [loaderAddTail, setLoaderAddTail] = useState<boolean>(false);
    const [loaderDeleteHead, setLoaderDeleteHead] = useState<boolean>(false);
    const [loaderDeleteTail, setLoaderDeleteTail] = useState<boolean>(false);
    const [loaderAddIndex, setLoaderAddIndex] = useState<boolean>(false);
    const [loaderDeleteIndex, setLoaderDeleteIndex] = useState<boolean>(false);

    const list = new List<string>(initialArray);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputIndex(Number(e.target.value));
    };
    //Добавить в начало связного-списка head
    const addHead = async () => {
        setLoaderAddHead(true);
        //Добавляем в начало списка новое значение
        list.prepend(input);
        listArr[0] = {
            ...listArr[0], add:true,
            smallCircle: {
                element: input,
            },
        }
        //Прорисовка
        setListArr([...listArr])
        await delay(500);
        //Убираем малый Circle
        listArr[0] = {
            ...listArr[0], add: false,
            smallCircle: {
                element: null,
            },
        }
        //Изменяем цвет
        listArr.unshift({
            element: input,
            state: ElementStates.Modified,
        });
        //Прорисовка
        setListArr([...listArr])
        await delay(500);
        //Изменяем цвет
        listArr[0].state= ElementStates.Default
        setLoaderAddHead(false);
        //Очищаем поле
        setInput('')
    }


    //Добавить в конец связного-списка tail
    const addTail = async () => {
        setLoaderAddTail(true);
        //Добавляем в конец списка новое значение
        list.append(input);
        //Длина списка
        const { length } = listArr;
        listArr[length - 1] = {
            ...listArr[length - 1], add:true,
            smallCircle: {
                element: input,
            },
        }
        //Прорисовка
        setListArr([...listArr])
        await delay(500);
        //Убираем малый Circle
        listArr[length - 1] = {
            ...listArr[length - 1], add: false,
            smallCircle: {
                element: null,
            },
        }
        //Изменяем цвет
        listArr.push({
            add: false,
            element: input,
            state: ElementStates.Modified,
        });
        //Прорисовка
        setListArr([...listArr])
        await delay(500);
        //Изменяем цвет
        listArr.map((item) => item.state= ElementStates.Default)
        setLoaderAddTail(false);
        //Очищаем поле
        setInput('')
    }

    //Удалить из начала связного-списка head
    const deleteHead = async () => {
        setLoaderDeleteHead(true);
        //
        listArr[0] = {
            ...listArr[0],
            element: "",
            state: ElementStates.Modified,
            delete: true,
            smallCircle: {
                element: listArr[0].element,
            }
        };
        //Прорисовка
        setListArr([...listArr]);
        await delay(1000);
        //Удалим первый элемент в массиве
        listArr.shift();

        setListArr([...listArr]);
        setLoaderDeleteHead(false);
    }

    //Удалить из конца связного-списка tail
    const deleteTail = async () => {
        setLoaderDeleteTail(true);
        //Длина списка
        const { length } = listArr;
        listArr[length - 1] = {
            ...listArr[length - 1],
            element: "",
            delete: true,
            smallCircle: {
                element: listArr[listArr.length - 1].element,
            },
        }
        //Прорисовка
        setListArr([...listArr]);
        await delay(1000);
        //Удалим первый элемент в массиве
        listArr.pop();
        setListArr([...listArr]);
        setLoaderDeleteTail(false);
    }

    //Добавить по индексу
    const addIndex = async () => {
        setLoaderAddIndex(true);
        //Добавление нового элемента в список по заданному индексу
        list.addByIndex(input, inputIndex);
        //Передвижение малого Circle
        for (let i = 0; i <= inputIndex; i++) {
            listArr[i] = {
                ...listArr[i],
                add: true,
                smallCircle: {
                    element: input,
                },
            };
            //Изменение состояния в связном-списке
            if (i > 0) {
                listArr[i - 1] = {
                    ...listArr[i - 1],
                    add: false,
                    state: ElementStates.Changing,
                    smallCircle: {
                        element: null,
                    },
                }
            }
                //Прорисовка
                setListArr([...listArr]);
                await delay(1000)
             }
            // Вставка в связный-список нового элемента
            listArr[inputIndex] = {
                ...listArr[inputIndex],
                add: false,
                smallCircle: {
                    element: null,
                },
            };
            listArr.splice(inputIndex, 0, {
                element: input,
                state: ElementStates.Modified,
            });

            //Изменение цвета всех Circle
            listArr.forEach((item) => (item.state = ElementStates.Default));
            //Прорисовка
            setListArr([...listArr]);
            await delay(1000);
            setLoaderAddIndex(false);
            //Очищаем поле
            setInputIndex(1);
    }


    //Удалить по индексу
    const deleteIndex = async (index: number) => {
        setLoaderDeleteIndex(true);
        list.deleteByIndex(index);
        for (let i = 0; i <= index; i++) {
            listArr[i].state = ElementStates.Changing;
            await delay(1000);
            setListArr([...listArr]);
        }
        listArr[index] = {
            ...listArr[index],
            element: '',
            delete: true,
            smallCircle: {
                element: input,
            },
        }
        setListArr([...listArr]);
        await delay(1000);
        //Прорисовка
        listArr.splice(index, 1)
        setListArr([...listArr]);
        await delay(1000);
        listArr.forEach((elem) => {
            elem.state = ElementStates.Default;
        })
        setLoaderDeleteIndex(false);
    }

  return (
    <SolutionLayout title="Связный список">
      <div className={listStyle.container}>
      <div className={listStyle.form}>
        <Input
            placeholder="Введите значение"
            isLimitText={true}
            maxLength={4}
            value={input}
            onChange={handleChangeInput}
        />
          <Button
              text="Добавить в head"
              type="button"
              onClick={addHead}
              disabled={!input.length}
              isLoader={loaderAddHead}
          />
          <Button
              text="Добавить в tail"
              type="button"
              onClick={addTail}
              disabled={!input.length}
              isLoader={loaderAddTail}
          />
          <Button
              text="Удалить из head"
              type="button"
              onClick={deleteHead}
              disabled={loaderAddTail || loaderAddHead}
              isLoader={loaderDeleteHead}
          />
          <Button
              text="Удалить из tail"
              type="button"
              onClick={deleteTail}
              disabled={loaderAddTail || loaderAddHead}
              isLoader={loaderDeleteTail}
          />
      </div>
      <div className={listStyle.form}>
        <Input
            type="number"
            placeholder="Введите индекс"
            value={inputIndex}
            onChange={handleChangeIndex}
        />
          <Button
              text="Добавить по индексу"
              type="button"
              onClick={addIndex}
              isLoader={loaderAddIndex}
              disabled={!input || !inputIndex}
                  />
          <Button
              text="Удалить по индексу"
              type="button"
              onClick={(index) =>  deleteIndex(Number(index))}
              isLoader={loaderDeleteIndex}
              disabled={!inputIndex}
          />

      </div>
      <ul className={listStyle.list}>
          {listArr.map((item, index) => {
              return (
                  <li className={listStyle.item} key={index}>
                      {item.add && (
                  <Circle
                      isSmall={true}
                      extraClass={listStyle.upCircle}
                      state={ElementStates.Changing}
                      letter={item.smallCircle?.element}
                  />
                      )}
                  <Circle
                      index={index}
                      state={item.state}
                      letter={item.element}
                      head={index === 0 && !item.add && !item.delete ? "head" : ""}
                      tail={index === listArr.length - 1 && !item.add && !item.delete ? "tail" : ""}
                  />
                  <ArrowIcon />
                      {item.delete && (
                  <Circle
                      isSmall={true}
                      extraClass={listStyle.downCircle}
                      state={ElementStates.Changing}
                      letter={item.smallCircle?.element}
                  />
                      )}
              </li>
              )
          })}
      </ul>
      </div>
    </SolutionLayout>
  );
};
