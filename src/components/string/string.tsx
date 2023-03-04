import React, { ChangeEvent, FormEvent, useState } from 'react';
import  styles from './string.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { stateCircle } from './secondary-func';
import { delay, DELAY_MILLISECONDS } from '../../utils/delay';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [array, setReversArray] = useState<Array<string>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isloader, setIsLoader] = useState<boolean>(false); 

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  
  const onSubmitReverse = async (e:FormEvent<HTMLFormElement>): Promise<string[]> => {
    e.preventDefault();

    const lettersArr = inputValue.split('');
    let end = lettersArr.length - 1;
    let mid = Math.floor(lettersArr.length/2);

    setCurrentIndex(0);
    setIsLoader(true);
    setReversArray([...lettersArr]);
    await delay(DELAY_MILLISECONDS);

    for (let i = 0; i < mid; i++) {
      [lettersArr[i], lettersArr[end - i]] = [lettersArr[end - i], lettersArr[i]]; 
      setCurrentIndex(i => i + 1); 
      setReversArray([...lettersArr]);
      await delay(DELAY_MILLISECONDS);
    }

    setCurrentIndex(i => i + 1);
    setIsLoader(false);
    setInputValue('');

    return lettersArr;
         
  }

  return (
    <SolutionLayout title='Строка'>
      <form className={styles.container} onSubmit={onSubmitReverse}>
          <Input 
           placeholder = 'Введите текст'
           onChange = {onChange}
           value = {inputValue}
           maxLength = {11}
           isLimitText={true}
           extraClass = 'mr-6'
      />
      <Button type={'submit'} 
              text={'Развернуть'}
              isLoader={isloader}
              disabled={inputValue === ''}/>
      
      </form>
      <ul className={styles.showmap}>
       {array.map((item: string, index: number) => 
          <Circle key={index}
                  letter={item}
                  index={index + 1}
                  state={stateCircle(currentIndex, index, array)}
          />)}
      </ul>
    </SolutionLayout>
  );
};
