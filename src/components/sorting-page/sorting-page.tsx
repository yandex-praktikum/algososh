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
import {resolveSrv} from "dns";

export const SortingPage: React.FC = () => {
    const [arr, setArr] = useState<Array<number>>([]);
    const [upDown, setUpDown] = useState<string>('Ascending');

    const createArrOnClick = () => {
        const arr = randomArr();
        setArr([...arr])
    }

    const bubbleSort = async (arr: number[], state: string): Promise<number[]> => {
        await makeDelay(500);
        for (let i = 1; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i; j++) {
                if (state === 'Ascending') {
                    if (arr[j] > arr[j + 1]) {
                        swap(arr, j, j + 1);
                        setArr([...arr]);
                        await makeDelay(500)
                    }
                } else {
                    if (arr[j] < arr[j + 1]) {
                        swap(arr, j, j + 1);
                        setArr([...arr]);
                        await makeDelay(500)
                    }
                }
            }
        }
        return arr;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;
        if (target) {
            setUpDown(target.name)
        }
        if (arr) {
            bubbleSort(arr, upDown);
        }
    }

    //const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //const {value, name} = event.target;
    //setValues({...values, [name]: value});
    //}


    return (
        <SolutionLayout title="Сортировка массива">
            <div className={styles.manageBar}>
                <div className={styles.radioInputsWrapper}>
                    <RadioInput label={'Выбор'} checked={true} name={'sortKind'}/>
                    <RadioInput label={'Пузырёк'} name={'sortKind'}/>
                </div>
                <div className={styles.sortingButtonsWrapper}>
                    <div className={`${styles.buttonWrapper} ${styles.buttonWrapper_big}`}>
                        <Button text={'По возрастанию'}
                                sorting={Direction.Ascending}
                                type={'submit'}
                                name={'Ascending'}
                                onClick={handleSubmit}
                        />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Button text={'По убыванию'}
                                sorting={Direction.Descending}
                                type={'submit'}
                                name={'Descending'}
                                onClick={handleSubmit}
                        />
                    </div>
                </div>
                <div className={styles.createArrayButtonWrapper}>
                    <div className={styles.buttonWrapper}>
                        <Button onClick={createArrOnClick} text={'Новый массив'}/>
                    </div>
                </div>
            </div>
            <ul className={styles.sortingList}>
                {arr?.map((char, idx) => {
                    return (
                        <li key={nanoid()} className={styles.listItem}>
                            <Column index={char}/>
                        </li>
                    )
                })}
            </ul>
        </SolutionLayout>
    );
};
