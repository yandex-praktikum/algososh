import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from './list-page.module.css'
import { List } from "../../class/list";
import { ElementStates } from "../../types/element-states";

type TNode = {
  value: string,
  color: ElementStates,
  isHead: boolean,
  isTail: boolean
}

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>();
  const [typeAdd, setTypeAdd] = useState<string>('');
  const [typeDel, setTypeDel] = useState<string>('');
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isDel, setIsDel] = useState<boolean>(false);
  const [isDelTail, setIsDelTail] = useState<boolean>(false);
  const [isDelHead, setIsDelHead] = useState<boolean>(false);
  const [element, setElement] = useState<string>();

  const listRef = useRef(new List<string>())
  const [arrNode, setArrNode] = useState<TNode[]>([...listRef.current.createArr()])
  // нужно создать случайный массиа
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    (e.currentTarget.name === 'value') ?
      setInputValue(e.currentTarget.value) :
      setInputIndex(+e.currentTarget.value)
  }

  const handleClickButtonAddTail = async (element: string) => {
    setIsAdd(true)
    setTypeAdd('tail');
    setElement(`${element}`)
    setInputValue('');
    await new Promise(resolve => setTimeout(resolve, 500));
    listRef.current.push(element);
    setTypeAdd('');
    setIsAdd(false)
    setElement('')
    setArrNode([...listRef.current.createArr()])
  }

  const handleClickButtonDelTail = async () => {
    setIsDel(true);
    setIsDelTail(true);
    setElement(`${listRef.current.getTail()}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    listRef.current.pop();
    setIsDel(false);
    setIsDelTail(false);
    setArrNode([...listRef.current.createArr()]);
  }

  const handleClickButtonAddHead = async (element: string) => {
    setTypeAdd('head');
    setIsAdd(true)
    setElement(`${element}`);
    setInputValue('');
    await new Promise(resolve => setTimeout(resolve, 500));
    listRef.current.unshift(element);
    setArrNode([...listRef.current.createArr()]);
    setTypeAdd('');
    setIsAdd(false);
  }

  const handleClickButtonDelHead = async () => {
    setTypeDel('head');
    setIsDel(true);
    setIsDelHead(true);
    setElement(`${listRef.current.getHead()}`)
    await new Promise(resolve => setTimeout(resolve, 500));
    listRef.current.shift();
    setArrNode([...listRef.current.createArr()])
    setTypeDel('')
    setIsDel(false);
    setIsDelHead(false);
    setElement('')
  }


  useEffect(() => { }, [isAdd, element, arrNode])


  console.log('arrNode', arrNode);

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.container}`} >
        <form className={`${styles.formValue}`}       >
          <Input type="number" maxLength={4} id='input' placeholder="Введите значение" onChange={(e) => onChange(e)} name="value" value={inputValue} />

          <div className={`${styles.buttonsBlock}`}>
            <Button text="Добавить в head" extraClass={`${styles.buttonSize}`} onClick={() => handleClickButtonAddHead(inputValue)} />
            <Button text="Добавить в tail" extraClass={`${styles.buttonSize}`} onClick={() => handleClickButtonAddTail(inputValue)} />
            <Button text="Удалить из head" extraClass={`${styles.buttonSize}`} onClick={()=> handleClickButtonDelHead()}/>
            <Button text="Удалить из tail" extraClass={`${styles.buttonSize}`} onClick={() => handleClickButtonDelTail()} />
          </div>

        </form>
        <form className={`${styles.formIndex}`}>
          <Input maxLength={4} id='input' placeholder="Введите индекс" onChange={(e) => onChange(e)} name="index" />

          <div className={`${styles.buttonsBlock}`}>
            <Button text="Добавить по индексу" linkedList="big" />
            <Button text="Удалить по индексу" linkedList="big" />
          </div>
        </form>

        <div className={`${styles.visualContainer}`}>
          {arrNode.map((elem, i) =>
            <div key={i} className={`${styles.elementContainer}`}>
              <div className={`${styles.element}`}>
                {(typeAdd === 'tail' && elem.isTail || typeAdd === 'head' && elem.isHead) ? <Circle isSmall extraClass={`${styles.elementFirst}`} letter={`${element}`} /> : null}
                <Circle letter={(isDelTail && elem.isTail) ? '' : `${elem.value}`} state={elem.color} index={i} head={(elem.isHead && !isAdd) ? 'head' : ''} tail={(elem.isTail && !isDelTail) ? 'tail' : ''} />
                {(typeDel === 'head' && elem.isHead || typeDel === 'tail' && elem.isTail) ? <Circle isSmall extraClass={`${styles.elementLast}`} letter={`${element}`} /> : null}
              </div>
              {(arrNode.length - 1 === i) ? null : <div className='text_type_h3 text_color_link p-9'>&#62;</div>}
            </div>
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
