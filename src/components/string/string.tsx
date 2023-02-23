import React, {FormEvent, useState} from "react";
import styles from './string.module.css';
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../services/hooks/useForm";
import {nanoid} from "nanoid";
import {ElementStates} from "../../types/element-states";
import {makeDelay} from "../../services/utils/makeDelay";

interface Iindexes {
    start: number,
    end: number
}

export const StringComponent: React.FC = () => {
    const {values, handleChange, setValues} = useForm({});
    const [circlesList, setList] = useState<Array<string>>([]);
    const [indexes, setIndexes] = useState<Iindexes>({start: 0, end: 0});
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    let data: string | '' = values?.data;

    const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {
        const temp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = temp;
    }

    const reverseString = async (str: string): Promise<string[]> => {
        const list = str.split('');
        setList([...list]);
        setIsLoading(true);
        setIndexes({start: 0, end: 0});
        let i = 0,
            j = list.length - 1;
        await makeDelay(1000);

        while (j >= i) {
            setIndexes({start: i, end: j});
            await makeDelay(500);
            swap(list, i, j);
            setList([...list]);
            j--;
            i++;
            await makeDelay(500);
        }

        setIndexes({start: Infinity, end: -Infinity});
        setIsLoading(false);
        return list;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (data) {
            reverseString(data);
        }
        setValues({...values, data: ''});
    }

    const defineCircleState = (start: number, end: number, index: number): ElementStates => {
        if (start === 0 && end === 0) {
            return ElementStates.Default
        }
        if (index === start || index === end) {
            return ElementStates.Changing
        }
        if (index < start || index > end) {
            return ElementStates.Modified
        }
        return ElementStates.Default;
    }

    return (
        <SolutionLayout title="Строка">
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input type={'text'}
                       maxLength={11}
                       isLimitText={true}
                       extraClass={`${styles.input}`}
                       onChange={handleChange}
                       name={'data'}
                       value={data || ""}
                       disabled={isLoading}/>
                <Button text={'Развернуть'}
                        type={'submit'}
                        isLoader={isLoading}
                        disabled={!data}/>
            </form>
            <ul className={styles.circleList}>
                {circlesList?.map((char, idx) => {
                    return (
                        <li key={nanoid()} className={styles.listItem}>
                            <Circle state={defineCircleState(indexes.start, indexes.end, idx)}
                                    letter={`${char}`}/>
                        </li>
                    )
                })}
            </ul>
        </SolutionLayout>
    );
};
