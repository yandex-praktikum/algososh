import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list.module.css'
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { IListArr, LinkedList } from "./list";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";


const baseArr = ['5', '10', '15', '20'];
const maxLength = 9
const maxIndex = 9
const list = new LinkedList<string>(baseArr)

export const listArr: IListArr[] = baseArr.map((item) => ({
  value: item,
  state: ElementStates.Default,
  shiftElement: null
}))


type PropsType = {
  listArray: IListArr[]
}

type listType = {
  input: boolean,
  addToHeadBtn: boolean,
  addToTailBtn: boolean,
  delFromHeadBtn: boolean,
  delFromTailBtn: boolean,
  index: boolean,
  addByIndexBtn: boolean,
  delByIndexBtn: boolean,
  removeBtn: boolean,
  clearBtn: boolean,
}


export const ListPage: React.FC = () => {

  const [input, setValue] = useState('')
  const [index, setIndex] = useState<number>(1)
  //const [listContent, setListContent] = useState([...list.printList()]);
  const [current, setCurrent] = useState<number | null>(null);
  const [listArray, setListArray] = useState<IListArr[]>(listArr);
  //const [head, setHead] = useState<number>(list.listHead());
  //const [tail, setTail] = useState<number>(list.listTail());
  const [disable, setDisable] = useState<listType>({
    input: false,
    addToHeadBtn: false,
    addToTailBtn: false,
    delFromHeadBtn: false,
    delFromTailBtn: false,
    index: false,
    addByIndexBtn: false,
    delByIndexBtn: false,
    removeBtn: false,
    clearBtn: false,
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setValue(value.trim());
  }

  const onIndexChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setIndex(+value.trim());
  }

  const timeOut = () => new Promise<void>(
    resolve => setTimeout(resolve, 500)
  );

  async function addToHead() {
    setDisable({ ...disable, addToHeadBtn: true, input: true })
    list.prepend(input);
    if (listArray.length > 0) {
      listArray[0].shiftElement = {
        value: input,
        state: ElementStates.Changing,
        position: 'add',
      }
    }
    setListArray([...listArray]);
    await timeOut();
    listArray[0].shiftElement = null;
    listArray.unshift({
      ...listArray[0],
      value: input,
      state: ElementStates.Modified
    });
    setListArray([...listArray]);
    await timeOut();
    listArray[0].state = ElementStates.Default;
    setListArray([...listArray]);
    setDisable({ ...disable, addToHeadBtn: false, input: false })
    setValue('');
  }

  async function addToTail() {
    setDisable({ ...disable, addToTailBtn: true, input: true })
    setValue('');
    list.append(input);
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      shiftElement: {
        value: input,
        state: ElementStates.Changing,
        position: 'add',
      }
    }
    setListArray([...listArray]);
    await timeOut();
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      shiftElement: null
    }

    listArray.push({
      value: input,
      state: ElementStates.Modified,
      shiftElement: null,
    })
    setListArray([...listArray]);
    await timeOut();
    listArray[listArray.length - 1].state = ElementStates.Default;
    setListArray([...listArray]);
    setDisable({ ...disable, addToTailBtn: false, input: false })
  }

  async function removeFromHead() {
    setDisable({ ...disable, delFromHeadBtn: true, input: true })

    listArray[0] = {
      ...listArray[0],
      value: '',
      shiftElement: {
        value: listArray[0].value,
        state: ElementStates.Changing,
        position: "remove"
      }
    }
    list.delHead();
    setListArray([...listArray]);
    await timeOut();
    listArray.shift();
    setListArray([...listArray]);
    setDisable({ ...disable, delFromHeadBtn: false, input: false })
  }

  async function removeFromTail() {
    setDisable({ ...disable, delFromTailBtn: true, input: true })

    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      value: '',
      shiftElement: {
        value: listArray[listArray.length - 1].value,
        state: ElementStates.Changing,
        position: "remove"
      }
    }
    list.delTail();
    setListArray([...listArray]);
    await timeOut();
    listArray.pop();
    setListArray([...listArray]);
    setDisable({ ...disable, delFromTailBtn: false, input: false })
  }

  async function addByIndex() {
    setDisable({ ...disable, addByIndexBtn: true, input: true, index: true })

    list.addByIndex(input, index);
    for (let i = 0; i <= index; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing,
        shiftElement: {
          value: input,
          state: ElementStates.Changing,
          position: "add"
        }
      }
      await timeOut();
      setListArray([...listArray]);
      if (i > 0) {
        listArray[i - 1] = {
          ...listArray[i - 1],
          shiftElement: null
        }
      }
      setListArray([...listArray]);
    }
    await timeOut();
    listArray[index] = {
      ...listArray[index],
      state: ElementStates.Default,
      shiftElement: null
    }
    listArray.splice(index, 0, {
      value: input,
      state: ElementStates.Modified,
      shiftElement: null
    })
    setListArray([...listArray]);
    listArray[index].state = ElementStates.Default;
    listArray.forEach((elem: IListArr) => {
      elem.state = ElementStates.Default;
    })
    await timeOut();
    setListArray([...listArray]);
    setValue('');
    setIndex(1);
    setDisable({ ...disable, addByIndexBtn: false, input: false, index: false })
  }

  async function removeByIndex() {
    setDisable({ ...disable, delByIndexBtn: true, input: true, index: true })

    list.delByIndex(index);
    for (let i = 0; i <= index; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing
      }
      await timeOut();
      setListArray([...listArray]);
    }
    listArray[index] = {
      ...listArray[index],
      value: '',
      shiftElement: {
        value: listArray[index].value,
        state: ElementStates.Changing,
        position: "remove"
      }
    }
    await timeOut();
    setListArray([...listArray]);
    listArray.splice(index, 1)
    listArray[index - 1] = {
      ...listArray[index - 1],
      value: listArray[index - 1].value,
      state: ElementStates.Modified,
      shiftElement: null
    }
    await timeOut();
    setListArray([...listArray]);
    listArray.forEach((elem) => {
      elem.state = ElementStates.Default;
    })
    await timeOut();
    setListArray([...listArray]);
    setDisable({ ...disable, delByIndexBtn: false, input: false, index: false })
    setIndex(1);
  }

  function List({ listArray }: PropsType): any {
    return listArray.map((item, index) => {
      return (
        <li className={styles.item} key={index}>
          <div className={'mr-12'}>
            {item.shiftElement && (
              <Circle
                extraClass={`${styles.circle_small} ${styles[`${item.shiftElement.position}`]}`}
                letter={item.shiftElement.value}
                state={item.shiftElement.state}
                isSmall={true} />
            )}
            <Circle
              letter={item.value}
              index={index}
              head={index === 0 && !item.shiftElement ? "head" : ""}
              tail={index === listArray.length - 1 && !item.shiftElement ? "tail" : ""}
              state={item.state}
            />
          </div>

          {index < listArray.length - 1 &&
            <ArrowIcon fill={item.state !== ElementStates.Changing ? "#0032FF" : "#d252e1"} />}
        </li>)
    })
  }




  return (
    <SolutionLayout title="Связный список">
      <div className={styles.context}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.conditions}>
            <Input name={'list'} type="text" maxLength={4}
              isLimitText={true}
              placeholder="Введите значение"
              onChange={onInputChange}
              value={input}
              disabled={disable.input}
              extraClass={`${styles.input} mr-6`}
            />
            <div className={styles.buttons}>
              <Button text="Добавить в head" linkedList="small"
                onClick={addToHead} extraClass={styles.button_small}
                disabled={!input || disable.input || listArray.length >= maxLength}
                isLoader={disable.addToHeadBtn} />

              <Button text="Добавить в tail"
                onClick={addToTail} extraClass={styles.button_small}
                disabled={!input || disable.input || listArray.length >= maxLength}
                isLoader={disable.addToTailBtn} linkedList="small"/>

              <Button text="Удалить из head"
                onClick={removeFromHead} extraClass={styles.button_small}
                isLoader={disable.delFromHeadBtn} linkedList="small"
                disabled={listArray.length <= 1 || disable.input} />

              <Button text="Удалить из tail" extraClass={styles.button_small}
                onClick={removeFromTail}
                isLoader={disable.delFromTailBtn} linkedList="small"
                disabled={listArray.length <= 1 || disable.input} />
            </div>
          </div>
        </form>
      </div>
      <div>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.conditions}>
            <Input name={'index'} type="number"
              onChange={onIndexChange}
              isLimitText={false}
              maxLength={1}
              max={maxIndex}
              disabled={disable.index}
              value={index}
              placeholder="Введите индекс"
              extraClass={`${styles.input} mr-6`}
            />
            <div className={styles.buttons}>

              <Button text="Добавить по индексу" linkedList="big"
                extraClass={`${styles.button_big} mr-6`}
                onClick={addByIndex}
                isLoader={disable.addByIndexBtn}
                disabled={!input || !index || disable.index || disable.input
                  || index > listArray.length - 1
                  || listArray.length - 1 >= maxIndex || index < 0} />

              <Button text="Удалить по индексу" linkedList="big"
                extraClass={`${styles.button_big}`}
                onClick={removeByIndex}
                isLoader={disable.delByIndexBtn}
                disabled={listArray.length === 0
                  || disable.input || disable.index
                  || index > listArray.length - 1
                  || index < 1 || !input} />
            </div>
          </div>
        </form>
      </div>
      <ul className={styles.list}>
        <List listArray={listArray} />
      </ul>
    </SolutionLayout>
  );
};
