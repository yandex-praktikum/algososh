import React, {ChangeEvent, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css'
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {randomArr} from "./utils/randomArr";
import {nanoid} from "nanoid";
import {Column} from "../ui/column/column";
import {swap} from "../../services/utils/swap";
import {makeDelay} from "../../services/utils/makeDelay";
import {defineColumnStateBubble} from "./utils/defineColumnStateBubble";
import {defineColumnStateSelection} from "./utils/defineColumnStateSelection";

interface Iindexes {
    first: number,
    counter: number,
    second?: number,
}

export const SortingPage: React.FC = () => {
    const [arr, setArr] = useState<Array<number>>([]);
    const [kindOfSorting, setKindOfSorting] = useState<string>('selection');
    const [isChecked, setIsChecked] = useState<boolean | undefined>(true);
    const [indexes, setIndexes] = useState<Iindexes>({first: -Infinity, second: -Infinity, counter: -1});
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    const [isAscending, setIsAscending] = useState<boolean | undefined>(false);
    const [isDescending, setIsDescending] = useState<boolean | undefined>(false);

    const createArrOnClick = () => {
        const arr = randomArr();
        setArr([...arr])
    }

    const bubbleSort = async (arr: number[], state: string): Promise<number[]> => {
        setIsLoading(true);
        state === 'Descending' ? setIsDescending(true) : setIsAscending(true);
        await makeDelay(500);
        for (let i = 1; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i; j++) {
                if (state === 'Ascending') {
                    if (arr[j] > arr[j + 1]) {
                        setIndexes(prev => {
                            return {...prev, first: j}
                        })
                        await makeDelay(500)
                        swap(arr, j, j + 1);
                        setArr([...arr]);
                    }
                } else {
                    if (arr[j] < arr[j + 1]) {
                        setIndexes(prev => {
                            return {...prev, first: j}
                        })
                        swap(arr, j, j + 1);
                        setArr([...arr]);
                        await makeDelay(500);
                    }
                }
                if (j === arr.length - i - 1) {
                    setIndexes({first: j, counter: i})
                }
            }
        }
        setIndexes(prev => {
            return {first: -Infinity, counter: 100}
        })
        await makeDelay(3000);
        setArr([]);
        setIndexes({first: -Infinity, counter: -1});
        state === 'Descending' ? setIsDescending(false) : setIsAscending(false);
        setIsLoading(false);
        return arr;
    }

    const selectionSort = async (arr: number[], state: string): Promise<number[]> => {
        setIsLoading(true);
        state === 'Descending' ? setIsDescending(true) : setIsAscending(true);
        await makeDelay(500);
        for (let i = 0; i < arr.length - 1; i++) {
            setIndexes({...indexes, first: i, second: -Infinity})
            for (let j = i + 1; j < arr.length; j++) {
                setIndexes(prev => {
                    return {...prev, second: j}
                })
                if (state === 'Ascending') {
                    if (arr[i] > arr[j]) {
                        swap(arr, i, j);
                        setArr([...arr]);
                        await makeDelay(500);
                    }
                } else {
                    if (arr[i] < arr[j]) {
                        swap(arr, i, j);
                        setArr([...arr]);
                        await makeDelay(500);
                    }
                }
                if (j === arr.length - 1) {
                    setIndexes({first: i, second: j, counter: i})
                }
            }
        }
        setIndexes({first: +Infinity, second: -Infinity, counter: -1})
        await makeDelay(3000);
        setArr([]);
        setIndexes({first: -Infinity, second: -Infinity, counter: -1})
        state === 'Descending' ? setIsDescending(false) : setIsAscending(false);
        setIsLoading(false);
        return arr;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const target = e.currentTarget as HTMLButtonElement;
        if (arr) {
            kindOfSorting === 'selection'
                ? selectionSort(arr, target.name)
                : bubbleSort(arr, target.name);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        setKindOfSorting(target.value);
        setIsChecked(prev => !prev)
    }

    return (
        <SolutionLayout title="Сортировка массива">
            <div className={styles.manageBar}>
                <div className={styles.radioInputsWrapper}>
                    <RadioInput label={'Выбор'}
                                name={'sortKind'}
                                value={'selection'}
                                onChange={handleChange}
                                checked={isChecked}
                                disabled={isLoading}
                    />
                    <RadioInput label={'Пузырёк'}
                                name={'sortKind'}
                                value={'bubble'}
                                onChange={handleChange}
                                checked={!isChecked}
                                disabled={isLoading}

                    />
                </div>
                <div className={styles.sortingButtonsWrapper}>
                    <div className={`${styles.buttonWrapper} ${styles.buttonWrapper_big}`}>
                        <Button text={'По возрастанию'}
                                sorting={Direction.Ascending}
                                type={'submit'}
                                name={'Ascending'}
                                onClick={handleSubmit}
                                isLoader={isAscending}
                                disabled={isLoading}
                        />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Button text={'По убыванию'}
                                sorting={Direction.Descending}
                                type={'submit'}
                                name={'Descending'}
                                onClick={handleSubmit}
                                isLoader={isDescending}
                                disabled={isLoading}
                        />
                    </div>
                </div>
                <div className={styles.createArrayButtonWrapper}>
                    <div className={styles.buttonWrapper}>
                        <Button onClick={createArrOnClick}
                                text={'Новый массив'}
                                disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
            <ul className={styles.sortingList}>
                {arr?.map((char, idx) => {
                    return (
                        <li key={nanoid()} className={styles.listItem}>
                            <Column index={char}
                                    state={kindOfSorting === 'bubble'
                                        ? defineColumnStateBubble(
                                            arr,
                                            indexes.first,
                                            indexes.counter,
                                            idx)
                                        : defineColumnStateSelection(
                                            arr,
                                            indexes.first,
                                            indexes.second as number,
                                            indexes.counter,
                                            idx)}/>
                        </li>
                    )
                })}
            </ul>
        </SolutionLayout>
    );
};
