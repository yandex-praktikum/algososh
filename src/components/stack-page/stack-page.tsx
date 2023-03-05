import React, {useState, ChangeEvent} from 'react';
import styles  from './stack-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { stack } from './class-stack';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { ElementStates } from '../../types/element-states';
import { delay, DELAY_MILLISECONDS_500 } from '../../utils/delay';
import { Circle } from '../ui/circle/circle';


interface IStackLoader {
  isPushValue: boolean;
  isPopValue: boolean;
  isClearStack: boolean;
  disabled: boolean;
}

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [array, setStackArray] = useState<Array<string>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isloader, setIsLoader] = useState<IStackLoader>({
    isPushValue: false,
    isPopValue: false,
    isClearStack: false,
    disabled: false,
  }); 

  const onChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setInputValue(e.target.value);
  }

  const handlePushValue = async (item: string) => {
    setIsLoader({
      ...isloader,
      isPushValue: true,
      disabled: true
    });
    stack.push(item);
    setStackArray(stack.printStack());
    setInputValue('');
    await delay(DELAY_MILLISECONDS_500);
    setCurrentIndex(currentIndex + 1);
    setIsLoader({
      ...isloader,
      isPushValue: false,
      disabled: false
    });
  }

  const handlePopValue = async () => {
    setIsLoader({
      ...isloader,
      isPopValue: true,
      disabled: true
    });
    setCurrentIndex(stack.getSize() - 1);
    await delay(DELAY_MILLISECONDS_500);
    stack.pop()
    setStackArray(stack.printStack());
    setIsLoader({
      ...isloader,
      isPopValue: false,
      disabled: false
    });
  }

  const handleClearStack = async() => {
    setIsLoader({
      ...isloader,
      isClearStack: true,
      disabled: true
    });
    await delay(DELAY_MILLISECONDS_500);
    stack.clearStack();
    setStackArray(stack.printStack());
    setCurrentIndex(0);
    setInputValue('');
    setIsLoader({
      ...isloader,
      isClearStack: false,
      disabled: false
    });
  }

  return (
    <SolutionLayout title='Стек'>
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
            onClick ={() => handlePushValue(inputValue)}
            isLoader={isloader.isPushValue}
            disabled ={inputValue ==='' || isloader.disabled || stack.isFull()}
          />
          <Button text = {'Удалить'}
            type = 'button'
            onClick={handlePopValue}
            isLoader={isloader.isPopValue}
            disabled={array.length < 1 || isloader.disabled}
          />
        </div>
          <Button text = {'Очистить'}
            type='button'
            onClick={handleClearStack}
            isLoader={isloader.isClearStack}
            disabled={array.length < 1 || isloader.disabled}
          />
      </form>
      {stack.isFull()? <div className='text text_type_input-lim mb-20'>Достигнут максимум элементов</div>
      :<div className='mb-20'>&nbsp;</div>}
      <ul className={styles.showstack}>
        {array.map((item: string, index: number) => 
          <Circle key={index}
                  letter={item}
                  index={index}
                  head={((stack.getSize() - 1) === index)? 'top' : ''}
                  state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}/>)}
      </ul>  
    </SolutionLayout>
  );
};
