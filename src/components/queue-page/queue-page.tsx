import React, {useState, ChangeEvent} from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css';
import { queue } from './class-queue'; 
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { delay, DELAY_MILLISECONDS_700 } from '../../utils/delay';

interface IQueueLoader {
  isEnqueueValue: boolean; 
  isDequeueValue: boolean;
  isClearQueue: boolean;
  disabled: boolean;
}

export const QueuePage: React.FC = () => {
  const [array, setQueueArray] = useState<Array<string | null>>(queue.printQueue());
  const [inputValue, setInputValue] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  
  const [isloader, setIsLoader] = useState<IQueueLoader>({
    isEnqueueValue: false,
    isDequeueValue: false,
    isClearQueue: false,
    disabled: false,
  });
   
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleEnqueue = async () => {
      setIsLoader({
        ...isloader,
        isEnqueueValue: true,
        disabled: true
      });
      queue.enqueue(inputValue);
      setInputValue('');
      setQueueArray(queue.printQueue());
      setCurrentIndex(queue.getCurrentTail());
      await delay(DELAY_MILLISECONDS_700);
      setCurrentIndex(-1);
      setIsLoader({
        ...isloader,
        isEnqueueValue: false,
        disabled: false
      });
  }

  const handleDequeue = async () => {
    setIsLoader({
        ...isloader,
        isDequeueValue: true,
        disabled: true
      });
      queue.dequeue();
      setQueueArray(queue.printQueue());
      setCurrentIndex(queue.getHead());
      await delay(DELAY_MILLISECONDS_700)
      setCurrentIndex(-1);
      setIsLoader({
        ...isloader,
        isDequeueValue: false,
        disabled: false
      });
  }

  const handleClearQueue = async () => {
    setIsLoader({
      ...isloader,
      isClearQueue: true,
      disabled: true
    });
    queue.clearQueue();
    setQueueArray(queue.printQueue());
    await delay(DELAY_MILLISECONDS_700); 
    setIsLoader({
      ...isloader,
      isClearQueue: false,
      disabled: false
    });
  }

  return (
    <SolutionLayout title='Очередь'>
       <form className={styles.container}> 
        <div className={styles.wrapper}>
          <Input 
            placeholder = 'Введите текст'
            onChange={onChange}
            value={inputValue}
            maxLength={4}
            isLimitText={true}
            extraClass='mr-6'
            autoFocus
          />
          <Button text = {'Добавить'}
            type = 'button'
            onClick ={handleEnqueue}
            isLoader={isloader.isEnqueueValue}
            disabled ={inputValue ==='' || queue.isFull() || isloader.disabled}
          />
          <Button text = {'Удалить'}
            type = 'button'
            onClick={handleDequeue}
            isLoader={isloader.isDequeueValue}
            disabled={isloader.disabled || queue.isEmpty()}
          />
        </div>
          <Button text = {'Очистить'}
            type='button'
            onClick={handleClearQueue}
            isLoader={isloader.isClearQueue}
            disabled={isloader.disabled || queue.isEmpty()}
          />
      </form>
      <ul className={styles.showqueue}>
        {array.map((item: string | null, index: number) => 
          <Circle key={index}
                  letter={(item === null)? '': item}
                  index={index}
                  head={(index === queue.getHead() && !queue.isEmpty())? 'head' : ''}
                  tail={(index === queue.getCurrentTail() && !queue.isEmpty())? 'tail' : ''}
                  state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}/>)}
      </ul>
    </SolutionLayout>
  );
};
