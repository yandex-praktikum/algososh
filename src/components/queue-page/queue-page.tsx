import React, { ChangeEvent, FC, useRef, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TArrQueue, TDisabled } from "../../types/types";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./class";
import style from './queue-page.module.css';

export const QueuePage: FC = () => {

  const queue = useRef(new Queue<string>(7));
  const initArr: Array<TArrQueue> = Array.from(Array(7), () => ({
    item: '',
    state: ElementStates.Default,
    head: '',
    tail: '',
  }));
  const [arrQueue, setArrQueue] = useState<Array<TArrQueue>>(initArr);
  const [valueInput, setValueInput] = useState<string>('');
  const [disabled, setDisabled] = useState<TDisabled>({
    push: false,
    pop: false
  });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  }

  const getEnqueue = async () => {
    setDisabled({
      push: true,
      pop: false
    });
 
    queue.current.enqueue(valueInput);
    setValueInput('');

    arrQueue[queue.current.getHead()].head = 'head';

    if (queue.current.getTail() > 0) {
      arrQueue[queue.current.getTail() - 1].tail = '';
    }
    
    arrQueue[queue.current.getTail()].state = ElementStates.Changing;
    arrQueue[queue.current.getTail()].item = valueInput;
    arrQueue[queue.current.getTail()].tail = 'tail';
    setArrQueue([...arrQueue]);

    await delay(SHORT_DELAY_IN_MS);

    arrQueue[queue.current.getTail()].state = ElementStates.Default;
    setArrQueue([...arrQueue]);
   
    setDisabled({
      push: false,
      pop: false
    });
  }

  const getDequeue = async () => {
    setDisabled({
      push: false,
      pop: true
    });

  
    if (queue.current.getTail() === queue.current.getHead() && queue.current.getTail() === 6) {
      arrQueue[queue.current.getHead()].tail = '';
      arrQueue[queue.current.getHead()].item = '';
      
    } else if (queue.current.getTail() === queue.current.getHead() && queue.current.getTail() !== 6) {
      getClear(); 
    } else {
      queue.current.dequeue();

      if (queue.current.getHead() > 0) {
        arrQueue[queue.current.getHead() - 1].head = '';
        arrQueue[queue.current.getHead() - 1].item = '';
      }

      if(queue.current.getTail() < 6) {
        arrQueue[queue.current.getHead() - 1].item = valueInput;
      }

      arrQueue[queue.current.getHead() - 1].item = '';
      arrQueue[queue.current.getHead() - 1].state = ElementStates.Changing;

      await delay(SHORT_DELAY_IN_MS);

      arrQueue[queue.current.getHead()].head = 'head';
      arrQueue[queue.current.getHead() - 1].state = ElementStates.Default;
      setArrQueue([...arrQueue]); 
    }

    setDisabled({
      push: false,
      pop: false
    });
  }

  const getClear = async () => {
    queue.current.clear();
    setArrQueue([...initArr]);
    setValueInput('');
  }


  return (
    <SolutionLayout title="Очередь">
      <div className={style.content}>
        <Input value={valueInput} isLimitText = {true} maxLength={4} onChange={handleChange} />
        <Button text={'Добавить'} extraClass="mr-4 ml-4" disabled={valueInput === '' || queue.current.getTail() === 6} isLoader={disabled.push} onClick={getEnqueue}/>
        <Button text={'Удалить'} extraClass="mr-40" disabled = {queue.current.isEmpty()} isLoader={disabled.pop} onClick={getDequeue} />
        <Button text={'Очистить'} disabled = {queue.current.isEmpty()} onClick={getClear} />
      </div>
      <ul className={style.list}>
        {arrQueue?.map((item, index) => {
          return (
            <li key={index}>
              <Circle
              letter={item.item}
              state={item.state}
              head={item.head}
              tail={item.tail}
              index={index}
              extraClass={'mt-15'}
            />
            </li>

          );
        })}
      </ul>
    </SolutionLayout>
  );
};
