import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css'
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {randomArr} from "./utils/randomArr";

export const SortingPage: React.FC = () => {
    const [arr, setArr] = useState<Array<number>>([]);

    const createArrOnClick = () => {
        const arr = randomArr();
        setArr([...arr])
    }
    console.log(arr);


    return (
        <SolutionLayout title="Сортировка массива">
            <div className={styles.manageBar}>
                <div className={styles.radioInputsWrapper}>
                    <RadioInput label={'Выбор'}/>
                    <RadioInput label={'Пузырёк'}/>
                </div>
                <div className={styles.sortingButtonsWrapper}>
                    <div className={`${styles.buttonWrapper} ${styles.buttonWrapper_big}`}>
                        <Button text={'По возрастанию'}
                                sorting={Direction.Ascending}
                        />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Button text={'По убыванию'}
                                sorting={Direction.Descending}
                        />
                    </div>
                </div>
                <div className={styles.createArrayButtonWrapper}>
                    <div className={styles.buttonWrapper}>
                        <Button onClick={createArrOnClick} text={'Новый массив'}/>
                    </div>
                </div>
            </div>
        </SolutionLayout>
    );
};
