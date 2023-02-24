import React, {FormEvent, useState} from "react";
import styles from './string.module.css';
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../services/hooks/useForm";
import {nanoid} from "nanoid";
import {makeDelay} from "../../services/utils/makeDelay";
import {defineCircleState} from "./utils/defineCircleState";
import {swap} from "../../services/utils/swap";

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
