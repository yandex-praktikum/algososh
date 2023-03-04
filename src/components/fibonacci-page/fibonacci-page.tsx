import React, {useState, ChangeEvent, FormEvent} from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './fibonacci-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { delay, DELAY_MILLISECONDS_700 } from '../../utils/delay';

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [array, setFibonacciArray] = useState<Array<number>>([]);
  const [isloader, setIsLoader] = useState<boolean>(false);
  

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const fibonacci = async() => {
    setIsLoader(true);

    function fib(n:number) {
      const arr = [1, 1];
      for (let i = 2; i <= n; i++) {
        arr[i] = arr[i-2] + arr[i-1]
      }
      return arr;
    }

    const arrFib = fib(Number(inputValue));
    for(let i=1; i < arrFib.length; i++){
      await delay(DELAY_MILLISECONDS_700);
      setFibonacciArray(arrFib.slice(0, i+1))
    }
    await delay(DELAY_MILLISECONDS_700);
    setInputValue('');
    setIsLoader(false);
  }

  const onSubmitFibonacci = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fibonacci();
  }

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <form className={styles.container} onSubmit={onSubmitFibonacci}>
        <Input placeholder='Введите число'
           type='number'
           onChange = {onChange}
           isLimitText={true}
           maxLength={2}
           max={19}
           min={1}
           value={inputValue}
           extraClass='mr-6'
           autoFocus
        />
        <Button type={'submit'}
          text={'Рассчитать'}
          isLoader={isloader}
          disabled={inputValue === '' || Number(inputValue) > 19 }
        />
      </form>
      <ul className={styles.showfibonacci}
      style={(array.length < 10)? { justifyContent: 'center' } 
      : { justifyContent: 'flex-start' }}>
        {array.map((item: number, index: number) => 
            <Circle key={index}
                    letter={`${item}`}
                    index={index}
          />)}
      </ul>
      </SolutionLayout>
  );
};
