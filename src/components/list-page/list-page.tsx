import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from './list-page.module.css'
import { List } from "../../class/list";
import { ElementStates } from "../../types/element-states";
import { log } from "console";

type TNode = {
  value: string,
  color: ElementStates,
  isHead: boolean,
  isTail: boolean
}

export const ListPage: React.FC = () => {
  // тут нужны хуки, но ...
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [typeAdd, setTypeAdd] = useState<string>('');
  const [typeDel, setTypeDel] = useState<string>('');
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isDel, setIsDel] = useState<boolean>(false);
  const [isDelTail, setIsDelTail] = useState<boolean>(false);
  const [isDelHead, setIsDelHead] = useState<boolean>(false);
  const [element, setElement] = useState<string>();
  const [toggle, setToggle] = useState<boolean>(false)
  const [indexElement, setIndexElement] = useState<number>(0)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [isAddHeadButtonDisabled, setIsAddHeadButtonDisabled] = useState(false);
  const [isAddTailButtonDisabled, setIsAddTailButtonDisabled] = useState(false);
  const [isDelHeadButtonDisabled, setIsDelHeadButtonDisabled] = useState(false);
  const [isDelTailButtonDisabled, setIsDelTailButtonDisabled] = useState(false);
  const [isLoaderAddHead, setIsLoaderAddHead] = useState(false)
  const [isLoaderAddTail, setIsLoaderAddTail] = useState(false)
  const [isLoaderDelHead, setIsLoaderDelHead] = useState(false)
  const [isLoaderDelTail, setIsLoaderDelTail] = useState(false)
  const [isLoaderAddId, setIsLoaderAddId] = useState(false)
  const [isLoaderDelId, setIsLoaderDelId] = useState(false)


  const listRef = useRef(new List<string>())
  const [arrNode, setArrNode] = useState<TNode[]>([...listRef.current.createArr()])



  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    (e.currentTarget.name === 'value') ?
      setInputValue(e.currentTarget.value) :
      setInputIndex(e.currentTarget.value)
    if (e.currentTarget.name === 'index') {
      setIsAddHeadButtonDisabled(true)
      setIsAddTailButtonDisabled(true)
      setIsDelHeadButtonDisabled(true)
      setIsDelTailButtonDisabled(true)
    }
    if (e.currentTarget.name === 'value') {
      setIsAddHeadButtonDisabled(false)
      setIsAddTailButtonDisabled(false)
      setIsDelHeadButtonDisabled(false)
      setIsDelTailButtonDisabled(false)
    }

  }

  const handleClickButtonAddTail = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, element: string) => {
    setIsLoaderAddTail(true)
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
    setIsLoaderAddTail(false)
  }

  const handleClickButtonDelTail = async () => {
    setIsLoaderAddTail(true)
    setIsDel(true);
    setIsDelTail(true);
    setElement(`${listRef.current.getTail()}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    listRef.current.pop();
    setIsDel(false);
    setIsDelTail(false);
    setArrNode([...listRef.current.createArr()]);
    setIsLoaderAddTail(false)
  }

  const handleClickButtonAddHead = async (element: string) => {
    setIsLoaderAddHead(true)
    setTypeAdd('head');
    setIsAdd(true)
    setElement(`${element}`);
    setInputValue('');
    await new Promise(resolve => setTimeout(resolve, 500));
    listRef.current.unshift(element);
    setArrNode([...listRef.current.createArr()]);
    setTypeAdd('');
    setIsAdd(false);
    setIsLoaderAddHead(false)
  }

  const handleClickButtonDelHead = async () => {
    setIsLoaderDelHead(true)
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
    setIsLoaderDelHead(false)
  }

  const handleClickButtonAddId = async (element: string, id: string) => {
    if (+id < arrNode.length) {
      setIsLoaderAddId(true)
      setElement(element)
      setInputValue('')
      setInputIndex('')
      setTypeAdd('id');
      for (let i = 0; i <= +id; i++) {
        setToggle(true)
        setIndexElement(i)
        await new Promise(resolve => setTimeout(resolve, 500));
        setToggle(false)
      }
      listRef.current.insert(id, element);
      setArrNode([...listRef.current.createArr()]);
      setElement('');
      setTypeAdd('');
      setIsLoaderAddId(false)
    }
  }

  const handleClickButtonDelId = async (id: string) => {
    if (+id < arrNode.length) {
      setIsLoaderDelId(true)
      setInputIndex('');
      setTypeDel('id');
      let elem;
      for (let i = 0; i <= +id; i++) {
        elem = listRef.current.getElement(i);
        if (elem) { elem.color = ElementStates.Changing };
        if (elem && elem.isTail) { setIsDelTail(true) };
        setArrNode([...listRef.current.createArr()])
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      setToggle(true);
      setIndexElement(+id);
      setElement('');
      if (elem?.value) setElement(elem.value);
      if (elem) elem.value = '';
      setArrNode([...listRef.current.createArr()]);
      await new Promise(resolve => setTimeout(resolve, 500));
      listRef.current.delElementId(+id);
      setArrNode([...listRef.current.createArr()]);
      setIsDelTail(false)
      setTypeDel('');
      setToggle(false);
      setElement('');
      setIsLoaderDelId(false)
    }
  }


  useEffect(() => { }, [isAdd, element, arrNode, toggle])




  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.container}`} >
        <form className={`${styles.formValue}`}       >
          <Input type="number" maxLength={4} id='input' placeholder="Введите значение" onChange={(e) => onChange(e)} name="value" value={inputValue} />

          <div className={`${styles.buttonsBlock}`}>
            <Button
              text="Добавить в head"
              extraClass={`${styles.buttonSize}`}
              onClick={(e) => handleClickButtonAddHead(inputValue)}
              name="head"
              disabled={isAddHeadButtonDisabled}
              isLoader={isLoaderAddHead}
            />
            <Button
              text="Добавить в tail"
              extraClass={`${styles.buttonSize}`}
              onClick={(e) => handleClickButtonAddTail(e, inputValue)}
              disabled={isAddTailButtonDisabled}
              isLoader={isLoaderAddTail} />
            <Button
              text="Удалить из head"
              extraClass={`${styles.buttonSize}`}
              onClick={() => handleClickButtonDelHead()}
              disabled={isDelHeadButtonDisabled}
              isLoader={isLoaderDelHead} />
            <Button
              text="Удалить из tail"
              extraClass={`${styles.buttonSize}`}
              onClick={() => handleClickButtonDelTail()}
              disabled={isDelTailButtonDisabled}
              isLoader={isLoaderAddTail} />
          </div>

        </form>
        <form className={`${styles.formIndex}`}>
          <Input type="number" maxLength={4} id='input' placeholder="Введите индекс" onChange={(e) => onChange(e)} name="index" value={inputIndex} />

          <div className={`${styles.buttonsBlock}`}>
            <Button text="Добавить по индексу" linkedList="big" onClick={() => handleClickButtonAddId(inputValue, inputIndex)} />
            <Button text="Удалить по индексу" linkedList="big" onClick={() => handleClickButtonDelId(inputIndex)} />
          </div>
        </form>

        <div className={`${styles.visualContainer}`}>
          {arrNode.map((elem, i) =>
            <div key={i} className={`${styles.elementContainer}`}>
              <div className={`${styles.element}`}>
                {(typeAdd === 'tail' && elem.isTail
                  || typeAdd === 'head' && elem.isHead
                  || typeAdd === 'id' && toggle && i === indexElement)
                  ? <Circle isSmall extraClass={`${styles.elementFirst}`}
                    letter={`${element}`} /> : null}

                <Circle
                  letter={(isDelTail && elem.isTail) ? '' : `${elem.value}`}
                  state={elem.color}
                  index={i}
                  head={(elem.isHead && !isAdd) ? 'head' : ''}
                  tail={(elem.isTail && !isDelTail) ? 'tail' : ''} />

                {(typeDel === 'head' && elem.isHead
                  || typeDel === 'tail' && elem.isTail
                  || typeDel === 'id' && toggle && i === indexElement)
                  ? <Circle isSmall
                    extraClass={`${styles.elementLast}`}
                    letter={`${element}`} />
                  : null}
              </div>
              {(arrNode.length - 1 === i) ? null : <div className='text_type_h3 text_color_link p-9'>&#62;</div>}
            </div>
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
