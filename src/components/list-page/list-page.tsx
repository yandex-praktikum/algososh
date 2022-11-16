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
}
export const ListPage: React.FC = () => {
    //Формирования небольшого связного списка
    const initialArray = ["85", "13", "34", "1"];
    const defaultArr: IListArr[] = initialArray.map((item) => ({
        element: item,
        state: ElementStates.Default
    }))
    const [input, setInput] = useState<string>('');
    const [inputIndex, setInputIndex] = useState<string>('');
    const [listArr, setListArr] = useState<IListArr[]>(defaultArr);
    const [isLoading, setIsLoading] =  useState(false);

    const list = new List<string>(initialArray);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputIndex(e.target.value);
    };
    //Добавить в начало связного-списка head
    const addHead = async () => {
        setIsLoading(true);
        //Добавляем в начало списка новое значение
        list.prepend(input);
        listArr[0] = {
            ...listArr[0], add:true
        }
        //Прорисовка
        setListArr([...listArr])
        await delay(500);
        //Убираем малый Circle
        listArr[0] = {
            ...listArr[0], add: false
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
        setIsLoading(false);
        //Очищаем поле
        setInput('')
    }


    //Добавить в конец связного-списка tail
    const addTail = async () => {
        setIsLoading(true);
        //Добавляем в конец списка новое значение
        list.append(input);
        //Длина списка
        const { length } = listArr;
        listArr[length - 1] = {
            ...listArr[length - 1], add:true
        }
        //Прорисовка
        setListArr([...listArr])
        await delay(500);
        //Убираем малый Circle
        listArr[length - 1] = {
            ...listArr[length - 1], add: false
        }
        //Изменяем цвет
        listArr.push({
            element: input,
            state: ElementStates.Modified,
        });
        //Прорисовка
        setListArr([...listArr])
        await delay(500);
        //Изменяем цвет
        listArr.map((item) => item.state= ElementStates.Default)
        setIsLoading(false);
        //Очищаем поле
        setInput('')
    }

    //Удалить из начала связного-списка head
    const deleteHead = async () => {
        setIsLoading(true);
        //
        listArr[0] = {
            ...listArr[0],
            element: "",
            state: ElementStates.Modified,
            delete: true,
        };
        //Прорисовка
        setListArr([...listArr]);
        await delay(1000);
        //Удалим первый элемент в массиве
        listArr.shift();

        setListArr([...listArr]);
        setIsLoading(false);
    }

    //Удалить из конца связного-списка tail
    const deleteTail = async () => {
        setIsLoading(true);
        //Длина списка
        const { length } = listArr;
        listArr[length - 1] = {
            ...listArr[length - 1], delete: true
        }
        //Прорисовка
        setListArr([...listArr]);
        await delay(1000);
        //Удалим первый элемент в массиве
        listArr.pop();
        setListArr([...listArr]);
        setIsLoading(false);
    }

    //Добавить по индексу
    const addIndex = async (inputIndex: number) => {
        setIsLoading(true);
        //Добавление нового элемента в список по заданному индексу
        list.addByIndex(input, inputIndex);
        //Передвижение малого Circle
        for (let i = 0; i <= inputIndex; i++) {
            listArr[i] = {
                ...listArr[i],
                add: true
            };

            //изменения состояния в связном-списке
            if (i > 0) {
                listArr[i - 1] = {
                    ...listArr[i - 1],
                    add: false,
                    state: ElementStates.Changing,
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
            setIsLoading(false);
            //Очищаем поле
            setInputIndex('');
    }


    //Удалить по индексу
    const deleteIndex = async (index: number) => {
        setIsLoading(true);
        list.deleteByIndex(index);
        for (let i = 0; i <= index; i++) {
            listArr[i] = {
                ...listArr[i],
                state: ElementStates.Changing,
            }
            await delay(1000);
            setListArr([...listArr]);
        }
        listArr[index] = {
            ...listArr[index],
            element: '',
            state: ElementStates.Changing,
        }
        await delay(1000);
        setListArr([...listArr]);
        listArr.splice(index, 1)
        listArr[index - 1] = {
            ...listArr[index - 1],
            element: listArr[index - 1].element,
            state: ElementStates.Modified,

        }
        await delay(1000);
        setListArr([...listArr]);
        listArr.forEach((elem) => {
            elem.state = ElementStates.Default;
        })
        await delay(1000);
        setListArr([...listArr]);
        setIsLoading(false);
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

          />
          <Button
              text="Добавить в tail"
              type="button"
              onClick={addTail}
          />
          <Button
              text="Удалить из head"
              type="button"
              onClick={deleteHead}
          />
          <Button
              text="Удалить из tail"
              type="button"
              onClick={deleteTail}
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
              onClick={(index) => addIndex(Number(index))}
                  />
          <Button
              text="Удалить по индексу"
              type="button"
              onClick={(index) =>  deleteIndex(Number(index))}
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
                      letter={item.element}
                  />
                      )}
                  <Circle
                      index={index}
                      state={item.state}
                      letter={item.element}
                  />
                  <ArrowIcon />
                      {item.delete && (
                  <Circle
                      isSmall={true}
                      extraClass={listStyle.downCircle}
                      state={ElementStates.Changing}
                      letter={item.element}
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
